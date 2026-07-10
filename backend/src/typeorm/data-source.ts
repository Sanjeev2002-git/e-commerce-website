import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [process.env.TYPEORM_ENTITIES_SRC ?? 'src/**/*.entity{.ts,.js}'],
  migrations: [process.env.TYPEORM_MIGRATIONS_SRC ?? 'src/migrations/**/*{.ts,.js}'],
});


