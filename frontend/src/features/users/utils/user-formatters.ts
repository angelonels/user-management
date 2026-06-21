import type { UserDetail, UserFormValues } from "../types/user.types";
import { toDateInputValue } from "../../../lib/utils/format-date";
import { emptyUserFormValues } from "../validation/user-form.schema";

export function userToFormValues(user?: UserDetail): UserFormValues {
  if (!user) return emptyUserFormValues;

  return {
    name: user.name,
    email: user.email,
    primaryMobile: user.primaryMobile,
    secondaryMobile: user.secondaryMobile ?? "",
    aadhaar: user.aadhaar,
    pan: user.pan,
    dateOfBirth: toDateInputValue(user.dateOfBirth),
    placeOfBirth: user.placeOfBirth,
    currentAddress: user.currentAddress,
    permanentAddress: user.permanentAddress,
    isPermanentAddressSameAsCurrent: user.isPermanentAddressSameAsCurrent
  };
}

export function getServerFieldName(code?: string) {
  const map: Record<string, keyof UserFormValues> = {
    USER_EMAIL_ALREADY_EXISTS: "email",
    USER_PRIMARY_MOBILE_ALREADY_EXISTS: "primaryMobile",
    USER_AADHAAR_ALREADY_EXISTS: "aadhaar",
    USER_PAN_ALREADY_EXISTS: "pan"
  };
  return code ? map[code] : undefined;
}
