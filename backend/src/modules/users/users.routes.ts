import { Router } from "express";
import { asyncHandler } from "../../shared/http/async-handler.js";
import { validateRequest } from "../../shared/http/validate-request.js";
import { createUsersController } from "./users.controller.js";
import type { UsersRepository } from "./users.repository.js";
import {
  createUserSchema,
  listUsersQuerySchema,
  updateUserSchema,
  userIdParamsSchema
} from "./users.schemas.js";

export function createUsersRouter(repository: UsersRepository) {
  const router = Router();
  const controller = createUsersController(repository);

  router.post(
    "/",
    validateRequest({ body: createUserSchema }),
    asyncHandler(controller.create)
  );

  router.get(
    "/",
    validateRequest({ query: listUsersQuerySchema }),
    asyncHandler(controller.list)
  );

  router.get(
    "/:id",
    validateRequest({ params: userIdParamsSchema }),
    asyncHandler(controller.get)
  );

  router.patch(
    "/:id",
    validateRequest({ params: userIdParamsSchema, body: updateUserSchema }),
    asyncHandler(controller.update)
  );

  router.delete(
    "/:id",
    validateRequest({ params: userIdParamsSchema }),
    asyncHandler(controller.delete)
  );

  router.patch(
    "/:id/restore",
    validateRequest({ params: userIdParamsSchema }),
    asyncHandler(controller.restore)
  );

  return router;
}

