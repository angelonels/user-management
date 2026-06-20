import type { User } from "./users.types.js";
import { maskAadhaar, maskPan } from "./utils/mask-sensitive-fields.js";

export function toUserDetail(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    primaryMobile: user.primaryMobile,
    secondaryMobile: user.secondaryMobile,
    aadhaar: user.aadhaar,
    pan: user.pan,
    dateOfBirth: user.dateOfBirth,
    placeOfBirth: user.placeOfBirth,
    currentAddress: user.currentAddress,
    permanentAddress: user.permanentAddress,
    isPermanentAddressSameAsCurrent: user.isPermanentAddressSameAsCurrent,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt
  };
}

export function toUserListItem(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    primaryMobile: user.primaryMobile,
    aadhaarMasked: maskAadhaar(user.aadhaar),
    panMasked: maskPan(user.pan),
    dateOfBirth: user.dateOfBirth,
    createdAt: user.createdAt,
    deletedAt: user.deletedAt
  };
}

