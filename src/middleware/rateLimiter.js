import { rateLimit } from "express-rate-limit";

const LogInLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: process.env.NODE_ENV === "test" ? 1000 : 3,
  handler: (req, res, next) => {
    const err = new Error("Too many login requests. Try again later");
    err.status = 429;
    next(err);
  },
});

export default LogInLimiter;
