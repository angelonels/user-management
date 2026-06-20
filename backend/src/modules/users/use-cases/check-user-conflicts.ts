import { ConflictError } from "../../../shared/errors/app-error.js";
import type { UsersRepository } from "../users.repository.js";

type UniqueFields = {
  email?: string;
  primaryMobile?: string;
  aadhaar?: string;
  pan?: string;
};

const messages = {
  email: {
    code: "USER_EMAIL_ALREADY_EXISTS",
    message: "A user with this email already exists."
  },
  primaryMobile: {
    code: "USER_PRIMARY_MOBILE_ALREADY_EXISTS",
    message: "A user with this primary mobile already exists."
  },
  aadhaar: {
    code: "USER_AADHAAR_ALREADY_EXISTS",
    message: "A user with this Aadhaar already exists."
  },
  pan: {
    code: "USER_PAN_ALREADY_EXISTS",
    message: "A user with this PAN already exists."
  }
};

export async function checkUserConflicts(
  repository: UsersRepository,
  fields: UniqueFields,
  excludeId?: number
) {
  for (const field of ["email", "primaryMobile", "aadhaar", "pan"] as const) {
    const value = fields[field];

    if (!value) {
      continue;
    }

    const existingUser = await repository.findByUniqueField(field, value, excludeId);

    if (existingUser) {
      throw new ConflictError(messages[field].code, messages[field].message, {
        field
      });
    }
  }
}

