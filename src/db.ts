import { Pool } from "pg";

const connectionString = process.env.URLDB;

const db = new Pool({ connectionString })

export default db;