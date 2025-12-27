import { drizzle } from 'drizzle-orm/node-postgres';
import { relations } from "./schema";

const db = drizzle(process.env.DATABASE_URL!, { relations });

export type Database = typeof db;

export default db;