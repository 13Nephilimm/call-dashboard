import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bcrypt from "bcryptjs";

import {
  createUser,
  findUserByEmail,
  findUserById,
  listRatingsForUser,
  listUsers,
  openDb
} from "./db.js";
import { authRequired, requireRole, signAccessToken } from "./auth.js";
import { schemas, validateBody } from "./validate.js";

const PORT = Number(process.env.PORT || 3001);
const DATABASE_PATH = process.env.DATABASE_PATH || "./data/db.json";
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

const db = openDb({ databasePath: DATABASE_PATH });

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true
  })
);
app.use(express.json({ limit: "256kb" }));
app.use(morgan("dev"));

app.get("/health", (req, res) => res.json({ ok: true }));

app.post("/auth/login", validateBody(schemas.login), (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(db, email);

  if (!user) return res.status(401).json({ error: "invalid_credentials" });
  const ok = bcrypt.compareSync(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: "invalid_credentials" });

  const token = signAccessToken({
    user,
    jwtSecret: JWT_SECRET,
    expiresIn: JWT_EXPIRES_IN
  });

  return res.json({
    token,
    user: { id: user.id, email: user.email, role: user.role, name: user.name ?? null }
  });
});

app.get("/auth/me", authRequired({ jwtSecret: JWT_SECRET }), (req, res) => {
  const user = findUserById(db, req.user.id);
  if (!user) return res.status(404).json({ error: "not_found" });
  const { password_hash, ...safe } = user;
  return res.json({ user: safe });
});

app.get("/users/me", authRequired({ jwtSecret: JWT_SECRET }), (req, res) => {
  const user = findUserById(db, req.user.id);
  if (!user) return res.status(404).json({ error: "not_found" });
  const { password_hash, ...safe } = user;
  return res.json({ user: safe });
});

app.get("/users/me/ratings", authRequired({ jwtSecret: JWT_SECRET }), (req, res) => {
  const ratings = listRatingsForUser(db, req.user.id);
  return res.json({ ratings });
});

app.post(
  "/admin/users",
  authRequired({ jwtSecret: JWT_SECRET }),
  requireRole("admin"),
  validateBody(schemas.adminCreateUser),
  (req, res) => {
    const { email, password, role, name } = req.body;

    const existing = findUserByEmail(db, email);
    if (existing) return res.status(409).json({ error: "email_already_exists" });

    const passwordHash = bcrypt.hashSync(password, 12);
    const created = createUser(db, { email, passwordHash, role, name });
    const { password_hash, ...safe } = created;
    return res.status(201).json({ user: safe });
  }
);

app.get(
  "/admin/users",
  authRequired({ jwtSecret: JWT_SECRET }),
  requireRole("admin"),
  (req, res) => {
    const users = listUsers(db).map(({ password_hash, ...safe }) => safe);
    return res.json({ users });
  }
);

app.get(
  "/admin/users/:id/ratings",
  authRequired({ jwtSecret: JWT_SECRET }),
  requireRole("admin"),
  (req, res) => {
    const userId = Number(req.params.id);
    if (!Number.isFinite(userId)) return res.status(400).json({ error: "invalid_user_id" });

    const ratings = listRatingsForUser(db, userId);
    return res.json({ ratings });
  }
);

app.use((req, res) => res.status(404).json({ error: "not_found" }));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Auth API listening on http://localhost:${PORT}`);
});

