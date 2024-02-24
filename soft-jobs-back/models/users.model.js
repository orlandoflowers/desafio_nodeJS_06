import { pool } from '../database/config.js';

// Get user by email
const getUser = async (email) => {
  const query = 'SELECT * FROM usuarios WHERE email = $1;';
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

// Create user
const createUser = async ({ email, password, rol, lenguage }) => {
  const query = 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *;';
  const { rows } = await pool.query(query, [email, password, rol, lenguage]);
  return rows[0];
};

// Verify user email
const verifyUserEmail = async (email) => {
  const query = 'SELECT email FROM usuarios WHERE email = $1;';
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};


const usersModel = {
  getUser,
  createUser,
  verifyUserEmail,
};

export default usersModel;
