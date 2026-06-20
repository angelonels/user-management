import type { CreateUserInput } from "../users.schemas.js";
import type { UsersRepository } from "../users.repository.js";
import { checkUserConflicts } from "./check-user-conflicts.js";

export async function createUser(
  repository: UsersRepository,
  input: CreateUserInput
) {
  await checkUserConflicts(repository, input);
  return repository.create(input);
}

