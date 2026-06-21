import { z } from "zod";

const mobileSchema = z
  .string()
  .trim()
  .regex(/^(\+91[\s-]?)?[6-9]\d{9}$|^[6-9]\d{4}[\s-]?\d{5}$/, "Enter a valid 10 digit Indian mobile number.");

const optionalMobileSchema = z
  .string()
  .trim()
  .optional()
  .transform((value) => value || undefined)
  .pipe(mobileSchema.optional());

export const userFormSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters.").max(100),
    email: z.string().trim().email("Enter a valid email address."),
    primaryMobile: mobileSchema,
    secondaryMobile: optionalMobileSchema,
    aadhaar: z
      .string()
      .trim()
      .regex(/^(\d{4}\s?){3}$|^\d{12}$/, "Aadhaar must have 12 digits."),
    pan: z
      .string()
      .trim()
      .regex(/^[A-Za-z]{5}[0-9]{4}[A-Za-z]$/, "Enter a valid PAN, for example ABCDE1234F."),
    dateOfBirth: z.string().min(1, "Date of birth is required.").refine((value) => {
      const date = new Date(value);
      return !Number.isNaN(date.getTime()) && date <= new Date();
    }, "Date of birth cannot be in the future."),
    placeOfBirth: z.string().trim().min(2, "Place of birth is required.").max(100),
    currentAddress: z.string().trim().min(10, "Current address must be at least 10 characters.").max(500),
    permanentAddress: z.string().trim().min(10, "Permanent address must be at least 10 characters.").max(500),
    isPermanentAddressSameAsCurrent: z.boolean()
  })
  .refine((data) => !data.secondaryMobile || data.secondaryMobile !== data.primaryMobile, {
    path: ["secondaryMobile"],
    message: "Secondary mobile cannot be the same as primary mobile."
  });

export type UserFormSchema = z.infer<typeof userFormSchema>;

export const emptyUserFormValues: UserFormSchema = {
  name: "",
  email: "",
  primaryMobile: "",
  secondaryMobile: "",
  aadhaar: "",
  pan: "",
  dateOfBirth: "",
  placeOfBirth: "",
  currentAddress: "",
  permanentAddress: "",
  isPermanentAddressSameAsCurrent: false
};
