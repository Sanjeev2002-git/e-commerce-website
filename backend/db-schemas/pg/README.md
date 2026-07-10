See `001_init_users_sellers_orders_payments_coupons.sql` for the normalized PostgreSQL schema.

Includes:
- users + user_addresses
- sellers
- orders + order_items
- payments
- coupons

Notes:
- Products & categories live in MongoDB.
- Cart entity and Notifications are intentionally omitted for this migration because you requested only Users, Sellers, Orders, Payments, Coupons in this step.

