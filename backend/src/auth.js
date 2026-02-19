import jwt from "jsonwebtoken";

export function signAccessToken({ user, jwtSecret, expiresIn }) {
  return jwt.sign(
    {
      sub: String(user.id),
      role: user.role,
      email: user.email
    },
    jwtSecret,
    { expiresIn }
  );
}

export function authRequired({ jwtSecret }) {
  return (req, res, next) => {
    const header = req.headers.authorization || "";
    const [, token] = header.split(" ");

    if (!token) {
      return res.status(401).json({ error: "missing_authorization" });
    }

    try {
      const payload = jwt.verify(token, jwtSecret);
      req.user = {
        id: Number(payload.sub),
        role: payload.role,
        email: payload.email
      };
      return next();
    } catch {
      return res.status(401).json({ error: "invalid_token" });
    }
  };
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "unauthorized" });
    if (req.user.role !== role) return res.status(403).json({ error: "forbidden" });
    return next();
  };
}

