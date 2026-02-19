import path from "node:path";
import fs from "node:fs";
import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";

const DEFAULT_DB_PATH = "./data/db.json";

export function openDb({ databasePath } = {}) {
  const resolvedPath = path.resolve(process.cwd(), databasePath || DEFAULT_DB_PATH);
  fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });

  const adapter = new JSONFileSync(resolvedPath);
  const db = new LowSync(adapter, {
    users: [],
    ratings: [],
    meta: { nextUserId: 1, nextRatingId: 1 }
  });
  db.read();
  db.data ||= { users: [], ratings: [], meta: { nextUserId: 1, nextRatingId: 1 } };
  db.data.users ||= [];
  db.data.ratings ||= [];
  db.data.meta ||= { nextUserId: 1, nextRatingId: 1 };
  db.data.meta.nextUserId ||= 1;
  db.data.meta.nextRatingId ||= 1;
  db.write();
  return db;
}

export function nowIso() {
  return new Date().toISOString();
}

export function findUserByEmail(db, email) {
  db.read();
  return db.data.users.find((u) => u.email.toLowerCase() === String(email).toLowerCase()) || null;
}

export function findUserById(db, id) {
  db.read();
  return db.data.users.find((u) => u.id === id) || null;
}

export function listUsers(db) {
  db.read();
  return [...db.data.users].sort((a, b) => a.id - b.id);
}

export function createUser(db, { email, passwordHash, role, name }) {
  db.read();
  const user = {
    id: db.data.meta.nextUserId++,
    email,
    password_hash: passwordHash,
    role,
    name: name ?? null,
    created_at: nowIso()
  };
  db.data.users.push(user);
  db.write();
  return user;
}

export function listRatingsForUser(db, userId) {
  db.read();
  return db.data.ratings
    .filter((r) => r.user_id === userId)
    .sort((a, b) => (a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : b.id - a.id))
    .map(({ id, score, note, created_at }) => ({ id, score, note, created_at }));
}

