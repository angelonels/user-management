import type { Request, Response } from "express";
import type { UsersRepository } from "./users.repository.js";
import type { ListUsersQuery, UserIdParams } from "./users.schemas.js";
import { toUserDetail, toUserListItem } from "./users.mapper.js";
import { createUser } from "./use-cases/create-user.usecase.js";
import { deleteUser } from "./use-cases/delete-user.usecase.js";
import { getUser } from "./use-cases/get-user.usecase.js";
import { listUsers } from "./use-cases/list-users.usecase.js";
import { restoreUser } from "./use-cases/restore-user.usecase.js";
import { updateUser } from "./use-cases/update-user.usecase.js";

export function createUsersController(repository: UsersRepository) {
  return {
    async create(request: Request, response: Response) {
      const user = await createUser(repository, request.body);
      response.status(201).json({ data: toUserDetail(user) });
    },

    async list(request: Request, response: Response) {
      const query = request.query as unknown as ListUsersQuery;
      const result = await listUsers(repository, query);

      response.json({
        data: result.users.map(toUserListItem),
        meta: result.meta
      });
    },

    async get(request: Request, response: Response) {
      const { id } = request.params as unknown as UserIdParams;
      const user = await getUser(repository, id);
      response.json({ data: toUserDetail(user) });
    },

    async update(request: Request, response: Response) {
      const { id } = request.params as unknown as UserIdParams;
      const user = await updateUser(repository, id, request.body);
      response.json({ data: user ? toUserDetail(user) : null });
    },

    async delete(request: Request, response: Response) {
      const { id } = request.params as unknown as UserIdParams;
      const user = await deleteUser(repository, id);
      response.json({ data: toUserDetail(user) });
    },

    async restore(request: Request, response: Response) {
      const { id } = request.params as unknown as UserIdParams;
      const user = await restoreUser(repository, id);
      response.json({ data: toUserDetail(user) });
    }
  };
}

