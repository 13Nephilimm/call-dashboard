import "dotenv/config";
import bcrypt from "bcryptjs";

import { createUser, findUserByEmail, openDb } from "../src/db.js";

const DATABASE_PATH = process.env.DATABASE_PATH || "./data/db.json";

const admins = [
  { email: "jax@gmail.com", password: "password123", name: "Jax", role: "admin" }
  // Add the rest of your admins here (email/password/name).
];

const db = openDb({ databasePath: DATABASE_PATH });

let created = 0;
let skipped = 0;

for (const a of admins) {
  const found = findUserByEmail(db, a.email);
  if (found) {
    skipped += 1;
    continue;
  }

  const passwordHash = bcrypt.hashSync(a.password, 12);
  createUser(db, {
    email: a.email,
    passwordHash,
    role: "admin",
    name: a.name ?? null
  });
  created += 1;
}

// eslint-disable-next-line no-console
console.log(`Seed complete. created=${created} skipped=${skipped}`);

