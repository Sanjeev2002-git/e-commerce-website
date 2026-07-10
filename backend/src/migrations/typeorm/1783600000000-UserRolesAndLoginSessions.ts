import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRolesAndLoginSessions1783600000000 implements MigrationInterface {
    name = 'UserRolesAndLoginSessions1783600000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Role-based access for the merged customer / admin / seller / delivery app
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD COLUMN "role" text NOT NULL DEFAULT 'customer'
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "CHK_users_role" CHECK ("role" IN ('customer', 'admin', 'seller', 'delivery'))
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_users_role" ON "users" ("role")
        `);

        // Full login history / session log
        await queryRunner.query(`
            CREATE TABLE "login_sessions" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "user_id" uuid NOT NULL,
                "role" text NOT NULL,
                "ip_address" text,
                "user_agent" text,
                "login_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "logout_at" TIMESTAMP WITH TIME ZONE,
                CONSTRAINT "PK_login_sessions" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "login_sessions"
            ADD CONSTRAINT "FK_login_sessions_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_login_sessions_user_id" ON "login_sessions" ("user_id")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "login_sessions"`);
        await queryRunner.query(`DROP INDEX "IDX_users_role"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "CHK_users_role"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}
