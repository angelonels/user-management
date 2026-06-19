import cors from "cors";
import express from "express";
import { pinoHttp } from "pino-http";
import { env } from "./shared/config/env.js";
import { logger } from "./shared/logger/logger.js";

export const app = express();

app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());
app.use(pinoHttp({ logger }));

app.get("/api/v1/health", (_request, response) => {
  response.json({
    data: {
      status: "ok",
      service: "user-registry-backend"
    }
  });
});
