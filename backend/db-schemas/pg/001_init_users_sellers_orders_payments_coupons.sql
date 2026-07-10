-- Entity-Relationship (ER) Notes (PostgreSQL, relational)
--
-- Core entities:
--  users       (customer accounts)
--  sellers     (seller accounts)
--  orders      (one order belongs to exactly one seller; can contain multiple items)
--  payments    (one payment per order attempt; an order may have multiple payment rows in future, but
--                we model a single current payment_id on orders; extend later if needed)
--  coupons     (discount codes)
--
-- Relationships:
--  users 1 --- * addresses
--  sellers 1 --- * products (catalog is in MongoDB; relational DB stores seller identity only)
--  users 1 --- * orders
--  sellers 1 --- * orders
--  orders 1 --- * order_items (stored in relational DB as sub-rows)
--  orders 1 --- 0/1 payments (linked via payments.order_id with unique constraint)
--  coupons apply at checkout (optional; stored as code+value on orders for audit; extend later)
--
-- Index strategy:
--  - users.email unique + index
--  - products are in MongoDB; relational indexes focus on orders & joins
--  - orders(user_id, seller_id, status)
--  - payments(order_id)

BEGIN;

-- 1) USERS
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  password_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- addresses: one-to-many from users
CREATE TABLE IF NOT EXISTS user_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  label text,
  full_name text NOT NULL,
  phone text,
  line1 text NOT NULL,
  line2 text,
  city text NOT NULL,
  state text,
  postal_code text,
  country text NOT NULL,
  is_default boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_addresses_user_id ON user_addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_addresses_default ON user_addresses(user_id, is_default) WHERE is_default;

-- 2) SELLERS
-- bank/KYC are often sensitive; keep as normalized fields.
-- (Catalog/products are in MongoDB; this table keeps seller identity + payout settings.)
CREATE TABLE IF NOT EXISTS sellers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name text NOT NULL,
  gst_number text,
  pan text,
  bank_account_name text,
  bank_account_number text,
  bank_ifsc text,
  bank_name text,
  kyc_status text NOT NULL DEFAULT 'pending',
  commission_rate numeric(6,4) NOT NULL DEFAULT 0.0000,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Seller identifying fields frequently used in admin workflows
CREATE INDEX IF NOT EXISTS idx_sellers_gst ON sellers(gst_number) WHERE gst_number IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_sellers_pan ON sellers(pan) WHERE pan IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_sellers_kyc_status ON sellers(kyc_status);

-- 3) ORDERS
-- For multi-vendor: each order is scoped to one seller.
CREATE TYPE IF NOT EXISTS order_status AS ENUM (
  'pending',
  'confirmed',
  'packed',
  'shipped',
  'out_for_delivery',
  'delivered',
  'cancelled',
  'return_requested',
  'refunded'
);

-- We store shipping address snapshot on the order for audit.
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  seller_id uuid NOT NULL REFERENCES sellers(id) ON DELETE RESTRICT,

  status order_status NOT NULL DEFAULT 'pending',

  -- Shipping address snapshot
  shipping_line1 text NOT NULL,
  shipping_line2 text,
  shipping_city text NOT NULL,
  shipping_state text,
  shipping_postal_code text,
  shipping_country text NOT NULL,
  shipping_full_name text NOT NULL,
  shipping_phone text,

  -- Payment linkage (current payment)
  payment_id uuid,

  -- Coupon audit (optional)
  coupon_code text,
  coupon_discount_amount numeric(12,2) NOT NULL DEFAULT 0,

  -- Monetary totals (audit)
  subtotal_amount numeric(12,2) NOT NULL,
  shipping_amount numeric(12,2) NOT NULL DEFAULT 0,
  tax_amount numeric(12,2) NOT NULL DEFAULT 0,
  total_amount numeric(12,2) NOT NULL,

  -- Status change timestamps (denormalized for fast reads)
  created_at timestamptz NOT NULL DEFAULT now(),
  confirmed_at timestamptz,
  packed_at timestamptz,
  shipped_at timestamptz,
  out_for_delivery_at timestamptz,
  delivered_at timestamptz,
  cancelled_at timestamptz,
  return_requested_at timestamptz,
  refunded_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_seller_id ON orders(seller_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_seller_status ON orders(seller_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_user_status ON orders(user_id, status);

-- 3a) Order items
-- Products and variants originate in MongoDB.
-- Store product_id/variant_id + snapshot fields for resiliency.
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id text NOT NULL,
  variant_id text,

  title text NOT NULL,
  variant_title text,

  qty integer NOT NULL CHECK (qty > 0),

  unit_price numeric(12,2) NOT NULL,
  unit_discount_amount numeric(12,2) NOT NULL DEFAULT 0,
  line_amount numeric(12,2) NOT NULL,

  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- 4) PAYMENTS
CREATE TYPE IF NOT EXISTS payment_status AS ENUM (
  'initiated',
  'pending',
  'requires_action',
  'succeeded',
  'failed',
  'cancelled',
  'refunded'
);

CREATE TYPE IF NOT EXISTS payment_method AS ENUM (
  'card',
  'netbanking',
  'upi',
  'wallet',
  'cod'
);

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,

  method payment_method NOT NULL,
  status payment_status NOT NULL DEFAULT 'initiated',

  gateway_transaction_id text,

  -- Amount snapshot
  amount numeric(12,2) NOT NULL,
  currency text NOT NULL DEFAULT 'INR',

  -- timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  succeeded_at timestamptz,
  failed_at timestamptz
);

-- Link orders.payment_id <-> payments.id via unique constraint at payments.order_id
CREATE UNIQUE INDEX IF NOT EXISTS uq_payments_order_id ON payments(order_id);

-- Add FK after creation
ALTER TABLE orders
  ADD CONSTRAINT fk_orders_payment_id
  FOREIGN KEY (payment_id) REFERENCES payments(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

-- 5) COUPONS
CREATE TYPE IF NOT EXISTS coupon_discount_type AS ENUM (
  'percent',
  'flat'
);

CREATE TABLE IF NOT EXISTS coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,

  discount_type coupon_discount_type NOT NULL,
  discount_value numeric(12,4) NOT NULL,

  min_order_value numeric(12,2) NOT NULL DEFAULT 0,
  expiry timestamptz,
  usage_limit integer NOT NULL,
  usage_count integer NOT NULL DEFAULT 0,

  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_coupons_expiry ON coupons(expiry);

COMMIT;

