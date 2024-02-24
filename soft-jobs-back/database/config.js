import pkg from 'pg';
const { Pool } = pkg;
import { config } from 'dotenv';
config();

const { DB_USER, DB_HOST, DB_PASSWORD, DB_DATABASE } = process.env;

//database connection
export const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: 5432,
  allowExitOnIdle: true,
});

// const getData = async () => {
//     const res = await pool.query('SELECT NOW()');
//     console.log(res.rows[0]);
//     return res.rows[0];
// };

// getData();