import { z } from "zod";

export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "validation_error",
        issues: result.error.issues
      });
    }
    req.body = result.data;
    return next();
  };
}

export const schemas = {
  login: z.object({
    email: z.string().email().max(320),
    password: z.string().min(1).max(200)
  }),
  adminCreateUser: z.object({
    email: z.string().email().max(320),
    password: z.string().min(8).max(200),
    role: z.enum(["admin", "user"]).default("user"),
    name: z.string().trim().min(1).max(120).optional()
  })
};

