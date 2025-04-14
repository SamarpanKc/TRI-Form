import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT || '5432'),
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: { rejectUnauthorized: false }, // Needed for Supabase
});

export const createConnection = async () => pool;

export const fetchUpdatedRows = async () => {
  try {
    const client = await pool.connect();
    const res = await client.query(
      `SELECT * FROM test_workshop WHERE status = 'Pending' AND registrationDate IS NOT NULL`
    );
    client.release();
    return res.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error("Failed to fetch data from the database");
  }
};
