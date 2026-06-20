import { BadRequestError, NotFoundError } from "../../../shared/errors/app-error.js";
import type { UpdateUserInput } from "../users.schemas.js";
import type { UsersRepository } from "../users.repository.js";
import { checkUserConflicts } from "./check-user-conflicts.js";

export async function updateUser(
  repository: UsersRepository,
  id: number,
  input: UpdateUserInput
) {
  const user = await repository.findById(id);

  if (!user) {
    throw new NotFoundError("USER_NOT_FOUND", "User was not found.");
  }

  if (user.deletedAt) {
    throw new BadRequestError("Deleted users cannot be updated.");
  }

  await checkUserConflicts(repository, input, id);
  const updatedUser = await repository.update(id, input);

  if (!updatedUser) {
    throw new NotFoundError("USER_NOT_FOUND", "User was not found.");
  }

  return updatedUser;
}
