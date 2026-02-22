import "dotenv/config";
import bcrypt from "bcryptjs";

import { createUser, findUserByEmail, initDb } from "../src/db.js";

const admins = [
  { email: "jax@gmail.com", password: "admin", name: "Jax", role: "admin", gender: "male" }
  // Add the rest of your admins here (email/password/name/gender).
];

await initDb();

let created = 0;
let skipped = 0;

for (const a of admins) {
  const found = await findUserByEmail(a.email);
  if (found) {
    skipped += 1;
    continue;
  }

  const passwordHash = bcrypt.hashSync(a.password, 12);
  // eslint-disable-next-line no-await-in-loop
  await createUser({
    email: a.email,
    passwordHash,
    role: "admin",
    name: a.name ?? null,
    gender: a.gender || "male"
  });
  created += 1;
}

// eslint-disable-next-line no-console
console.log(`Seed complete. created=${created} skipped=${skipped}`);

