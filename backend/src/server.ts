import { createApp } from "./app.js";
import { env } from "./shared/config/env.js";
import { logger } from "./shared/logger/logger.js";

const app = createApp();
const server = app.listen(env.PORT, () => {
  logger.info(`Backend running on port ${env.PORT}`);
});

process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Closing backend server.");
  server.close(() => process.exit(0));
});
