import { buildPaginationMeta } from "../../../shared/pagination/pagination.js";
import type { ListUsersQuery } from "../users.schemas.js";
import type { UsersRepository } from "../users.repository.js";

export async function listUsers(repository: UsersRepository, query: ListUsersQuery) {
  const result = await repository.list(query);

  return {
    users: result.users,
    meta: buildPaginationMeta(query.page, query.pageSize, result.total)
  };
}

