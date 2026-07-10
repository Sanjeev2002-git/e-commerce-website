/*
  Seeds one login for each non-customer role: admin, seller, delivery.
  These are the accounts used to reach /admin, /seller, /delivery in the
  merged web-app after logging in on the regular login page.

  Run (from backend/):
    npx ts-node -r tsconfig-paths/register db-seeds/seed-staff-users.ts

  Requires the same DB_HOST / DB_PORT / DB_USERNAME / DB_PASSWORD / DB_NAME
  env vars used by the app (backend/.env), and that migrations have already
  been run (npm run typeorm migration:run) so the "role" column exists.
*/

import * as bcrypt from 'bcrypt';
import { AppDataSource } from '../src/typeorm/data-source';
import { User } from '../src/db/typeorm/entities/User.entity';

type StaffSeed = { name: string; email: string; password: string; role: 'admin' | 'seller' | 'delivery' };

// Change these passwords before using this anywhere but local dev.
const STAFF_ACCOUNTS: StaffSeed[] = [
  { name: 'Admin', role: 'admin', email: 'admin@marketplace.test', password: 'Admin@12345' },
  { name: 'Demo Seller', role: 'seller', email: 'seller@marketplace.test', password: 'Seller@12345' },
  { name: 'Demo Delivery Partner', role: 'delivery', email: 'delivery@marketplace.test', password: 'Delivery@12345' },
];

async function main() {
  await AppDataSource.initialize();
  const usersRepo = AppDataSource.getRepository(User);

  for (const staff of STAFF_ACCOUNTS) {
    const existing = await usersRepo.findOne({ where: { email: staff.email } });
    if (existing) {
      existing.role = staff.role;
      await usersRepo.save(existing);
      console.log(`Updated existing user -> role=${staff.role}: ${staff.email}`);
      continue;
    }

    const passwordHash = await bcrypt.hash(staff.password, 10);
    const user = usersRepo.create({
      name: staff.name,
      email: staff.email,
      passwordHash,
      role: staff.role,
    });
    await usersRepo.save(user);
    console.log(`Created ${staff.role}: ${staff.email} / ${staff.password}`);
  }

  await AppDataSource.destroy();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
