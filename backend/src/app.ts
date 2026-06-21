import cors from "cors";
import express from "express";
import helmet from "helmet";
import { pinoHttp } from "pino-http";
import { errorHandler } from "./shared/errors/error-handler.js";
import { env } from "./shared/config/env.js";
import { logger } from "./shared/logger/logger.js";
import { createUsersRouter } from "./modules/users/users.routes.js";
import {
  mysqlUsersRepository,
  type UsersRepository
} from "./modules/users/users.repository.js";

export function createApp(repository: UsersRepository = mysqlUsersRepository) {
  const app = express();
  const allowedOrigins = new Set([
    env.CORS_ORIGIN,
    "http://localhost:5173",
    "http://127.0.0.1:5173"
  ]);

  app.use(helmet());
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error("Origin is not allowed by CORS."));
      }
    })
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(pinoHttp({ logger }));

  app.get("/api/v1/health", (_request, response) => {
    response.json({
      data: {
        status: "ok",
        service: "user-registry-backend"
      }
    });
  });

  app.use("/api/v1/users", createUsersRouter(repository));

  app.use((_request, response) => {
    response.status(404).json({
      error: {
        code: "NOT_FOUND",
        message: "Route was not found."
      }
    });
  });

  app.use(errorHandler);

  return app;
}

export const app = createApp();
