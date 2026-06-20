import { NotFoundError } from "../../../shared/errors/app-error.js";
import type { UsersRepository } from "../users.repository.js";

export async function getUser(repository: UsersRepository, id: number) {
  const user = await repository.findById(id);

  if (!user) {
    throw new NotFoundError("USER_NOT_FOUND", "User was not found.");
  }

  return user;
}

