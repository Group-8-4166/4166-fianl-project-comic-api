import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

import comicRoutes from "./routes/comicRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import readingListRoutes from "./routes/readingListRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

app.use(cors());
app.use(helmet());
app.use(express.json());

// API routes
app.use("/api/comics", comicRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reading-list", readingListRoutes);

// Swagger/OpenAPI
const openapiDoc = YAML.load(path.join(__dirname, "../public/bundled.yaml"));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapiDoc));

// 404 handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (!err.status) {
    err.status = 500;
    err.message = "Internal Server Error";
  }
  res.status(err.status).json({ error: err.message });
});

export default app;
