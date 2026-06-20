import { z } from "zod";
import {
  normalizeAadhaar,
  normalizeEmail,
  normalizeMobile,
  normalizePan
} from "./utils/normalize-user-input.js";

const mobileSchema = z
  .string()
  .transform((value) => normalizeMobile(value) ?? "")
  .refine((value) => /^[6-9]\d{9}$/.test(value), "Enter a valid 10 digit mobile number.");

const aadhaarSchema = z
  .string()
  .transform(normalizeAadhaar)
  .refine((value) => /^\d{12}$/.test(value), "Aadhaar must have 12 digits.");

const panSchema = z
  .string()
  .transform(normalizePan)
  .refine((value) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value), "Enter a valid PAN.");

const dateOfBirthSchema = z.string().refine((value) => {
  const date = new Date(value);
  return !Number.isNaN(date.getTime()) && date <= new Date();
}, "Date of birth cannot be in the future.");

const userBodySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().email().transform(normalizeEmail),
  primaryMobile: mobileSchema,
  secondaryMobile: mobileSchema.optional().or(z.literal("").transform(() => undefined)),
  aadhaar: aadhaarSchema,
  pan: panSchema,
  dateOfBirth: dateOfBirthSchema,
  placeOfBirth: z.string().trim().min(2).max(100),
  currentAddress: z.string().trim().min(10).max(500),
  permanentAddress: z.string().trim().min(10).max(500),
  isPermanentAddressSameAsCurrent: z.boolean().default(false)
});

export const createUserSchema = userBodySchema
  .refine((data) => data.secondaryMobile !== data.primaryMobile, {
    path: ["secondaryMobile"],
    message: "Secondary mobile cannot be the same as primary mobile."
  });

export const updateUserSchema = userBodySchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required."
  })
  .refine((data) => !data.secondaryMobile || data.secondaryMobile !== data.primaryMobile, {
    path: ["secondaryMobile"],
    message: "Secondary mobile cannot be the same as primary mobile."
  });

export const userIdParamsSchema = z.object({
  id: z.coerce.number().int().positive()
});

export const listUsersQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(50).default(10),
  search: z.string().trim().optional(),
  status: z.enum(["active", "deleted", "all"]).default("active"),
  sortBy: z.enum(["createdAt", "name", "email", "dateOfBirth"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc")
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>;
export type UserIdParams = z.infer<typeof userIdParamsSchema>;
