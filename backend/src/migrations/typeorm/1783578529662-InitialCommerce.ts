import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialCommerce1783578529662 implements MigrationInterface {
    name = 'InitialCommerce1783578529662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "sellers" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "business_name" text NOT NULL,
                "gst_number" text,
                "pan" text,
                "bank_account_name" text,
                "bank_account_number" text,
                "bank_ifsc" text,
                "bank_name" text,
                "kyc_status" text NOT NULL DEFAULT 'pending',
                "commission_rate" numeric(6, 4) NOT NULL DEFAULT '0',
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_97337ccbf692c58e6c7682de8a2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_5de1d9e0aff402efece52cfed1" ON "sellers" ("gst_number")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_6f5f0e7d1dff68b60b95eb9a3e" ON "sellers" ("pan")
        `);
        await queryRunner.query(`
            CREATE TABLE "order_items" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "order_id" uuid NOT NULL,
                "product_id" text NOT NULL,
                "variant_id" text,
                "title" text NOT NULL,
                "variant_title" text,
                "qty" integer NOT NULL,
                "unit_price" numeric(12, 2) NOT NULL,
                "unit_discount_amount" numeric(12, 2) NOT NULL DEFAULT '0',
                "line_amount" numeric(12, 2) NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."payments_method_enum" AS ENUM('card', 'netbanking', 'upi', 'wallet', 'cod')
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."payments_status_enum" AS ENUM(
                'initiated',
                'pending',
                'requires_action',
                'succeeded',
                'failed',
                'cancelled',
                'refunded'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "payments" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "order_id" uuid NOT NULL,
                "method" "public"."payments_method_enum" NOT NULL,
                "status" "public"."payments_status_enum" NOT NULL DEFAULT 'initiated',
                "gateway_transaction_id" text,
                "amount" numeric(12, 2) NOT NULL,
                "currency" text NOT NULL DEFAULT 'INR',
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "succeeded_at" TIMESTAMP WITH TIME ZONE,
                "failed_at" TIMESTAMP WITH TIME ZONE,
                CONSTRAINT "UQ_b2f7b823a21562eeca20e72b006" UNIQUE ("order_id"),
                CONSTRAINT "REL_b2f7b823a21562eeca20e72b00" UNIQUE ("order_id"),
                CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_32b41cdb985a296213e9a928b5" ON "payments" ("status")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b2f7b823a21562eeca20e72b00" ON "payments" ("order_id")
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."orders_status_enum" AS ENUM(
                'pending',
                'confirmed',
                'packed',
                'shipped',
                'out_for_delivery',
                'delivered',
                'cancelled',
                'return_requested',
                'refunded'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "orders" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL,
                "seller_id" uuid NOT NULL,
                "status" "public"."orders_status_enum" NOT NULL DEFAULT 'pending',
                "shipping_line1" text NOT NULL,
                "shipping_line2" text,
                "shipping_city" text NOT NULL,
                "shipping_state" text,
                "shipping_postal_code" text NOT NULL,
                "shipping_country" text NOT NULL,
                "shipping_full_name" text NOT NULL,
                "shipping_phone" text,
                "payment_id" uuid,
                "coupon_code" text,
                "coupon_discount_amount" numeric(12, 2) NOT NULL DEFAULT '0',
                "subtotal_amount" numeric(12, 2) NOT NULL,
                "shipping_amount" numeric(12, 2) NOT NULL DEFAULT '0',
                "tax_amount" numeric(12, 2) NOT NULL DEFAULT '0',
                "total_amount" numeric(12, 2) NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "confirmed_at" TIMESTAMP WITH TIME ZONE,
                "packed_at" TIMESTAMP WITH TIME ZONE,
                "shipped_at" TIMESTAMP WITH TIME ZONE,
                "out_for_delivery_at" TIMESTAMP WITH TIME ZONE,
                "delivered_at" TIMESTAMP WITH TIME ZONE,
                "cancelled_at" TIMESTAMP WITH TIME ZONE,
                "return_requested_at" TIMESTAMP WITH TIME ZONE,
                "refunded_at" TIMESTAMP WITH TIME ZONE,
                CONSTRAINT "REL_5b3e94bd2aedc184f9ad8c1043" UNIQUE ("payment_id"),
                CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_cb77bc746d4e7b50c722fb2151" ON "orders" ("user_id", "status")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_479b50f97e91fc5795aeea3fd0" ON "orders" ("seller_id", "status")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_775c9f06fc27ae3ff8fb26f2c4" ON "orders" ("status")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_ef6710c78c6fbc26d1ba58268a" ON "orders" ("seller_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_a922b820eeef29ac1c6800e826" ON "orders" ("user_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" text NOT NULL,
                "email" text NOT NULL,
                "phone" text,
                "password_hash" text NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email")
        `);
        await queryRunner.query(`
            CREATE TABLE "user_addresses" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL,
                "label" text,
                "full_name" text NOT NULL,
                "phone" text,
                "line1" text NOT NULL,
                "line2" text,
                "city" text NOT NULL,
                "state" text,
                "postal_code" text NOT NULL,
                "country" text NOT NULL,
                "is_default" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_8abbeb5e3239ff7877088ffc25b" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."coupons_discount_type_enum" AS ENUM('percent', 'flat')
        `);
        await queryRunner.query(`
            CREATE TABLE "coupons" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "code" text NOT NULL,
                "discount_type" "public"."coupons_discount_type_enum" NOT NULL,
                "discount_value" numeric(12, 4) NOT NULL,
                "min_order_value" numeric(12, 2) NOT NULL DEFAULT '0',
                "expiry" TIMESTAMP WITH TIME ZONE,
                "usage_limit" integer NOT NULL,
                "usage_count" integer NOT NULL DEFAULT '0',
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_e025109230e82925843f2a14c48" UNIQUE ("code"),
                CONSTRAINT "PK_d7ea8864a0150183770f3e9a8cb" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_e025109230e82925843f2a14c4" ON "coupons" ("code")
        `);
        await queryRunner.query(`
            ALTER TABLE "order_items"
            ADD CONSTRAINT "FK_145532db85752b29c57d2b7b1f1" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "payments"
            ADD CONSTRAINT "FK_b2f7b823a21562eeca20e72b006" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD CONSTRAINT "FK_ef6710c78c6fbc26d1ba58268ab" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id") ON DELETE RESTRICT ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_addresses"
            ADD CONSTRAINT "FK_7a5100ce0548ef27a6f1533a5ce" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_addresses" DROP CONSTRAINT "FK_7a5100ce0548ef27a6f1533a5ce"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders" DROP CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders" DROP CONSTRAINT "FK_ef6710c78c6fbc26d1ba58268ab"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"
        `);
        await queryRunner.query(`
            ALTER TABLE "payments" DROP CONSTRAINT "FK_b2f7b823a21562eeca20e72b006"
        `);
        await queryRunner.query(`
            ALTER TABLE "order_items" DROP CONSTRAINT "FK_145532db85752b29c57d2b7b1f1"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_e025109230e82925843f2a14c4"
        `);
        await queryRunner.query(`
            DROP TABLE "coupons"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."coupons_discount_type_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "user_addresses"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"
        `);
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_a922b820eeef29ac1c6800e826"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_ef6710c78c6fbc26d1ba58268a"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_775c9f06fc27ae3ff8fb26f2c4"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_479b50f97e91fc5795aeea3fd0"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_cb77bc746d4e7b50c722fb2151"
        `);
        await queryRunner.query(`
            DROP TABLE "orders"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."orders_status_enum"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_b2f7b823a21562eeca20e72b00"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_32b41cdb985a296213e9a928b5"
        `);
        await queryRunner.query(`
            DROP TABLE "payments"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."payments_status_enum"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."payments_method_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "order_items"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_6f5f0e7d1dff68b60b95eb9a3e"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_5de1d9e0aff402efece52cfed1"
        `);
        await queryRunner.query(`
            DROP TABLE "sellers"
        `);
    }

}
