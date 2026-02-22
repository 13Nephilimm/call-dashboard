import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/call_dashboard";

export const pool = new Pool({ connectionString });

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('admin','user')),
      name TEXT,
      gender TEXT NOT NULL DEFAULT 'male' CHECK (gender IN ('male','female')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS ratings (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      score INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
      note TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE INDEX IF NOT EXISTS idx_ratings_user_id ON ratings(user_id);
  `);
}

export async function findUserByEmail(email) {
  const { rows } = await pool.query(
    "SELECT id, email, password_hash, role, name, gender, created_at FROM users WHERE LOWER(email) = LOWER($1)",
    [email]
  );
  return rows[0] || null;
}

export async function findUserById(id) {
  const { rows } = await pool.query(
    "SELECT id, email, password_hash, role, name, gender, created_at FROM users WHERE id = $1",
    [id]
  );
  return rows[0] || null;
}

export async function listUsers() {
  const { rows } = await pool.query(
    "SELECT id, email, role, name, gender, created_at FROM users ORDER BY id ASC"
  );
  return rows;
}

export async function createUser({ email, passwordHash, role, name, gender }) {
  const { rows } = await pool.query(
    `
      INSERT INTO users (email, password_hash, role, name, gender)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, email, role, name, gender, created_at
    `,
    [email, passwordHash, role, name ?? null, gender]
  );
  return rows[0];
}

export async function listRatingsForUser(userId) {
  const { rows } = await pool.query(
    `
      SELECT id, score, note, created_at
      FROM ratings
      WHERE user_id = $1
      ORDER BY created_at DESC, id DESC
    `,
    [userId]
  );
  return rows;
}

