export function normalizeMobile(value?: string | null) {
  if (!value) {
    return value;
  }

  const digits = value.replace(/\D/g, "");
  return digits.length > 10 && digits.startsWith("91") ? digits.slice(-10) : digits;
}

export function normalizeAadhaar(value: string) {
  return value.replace(/\D/g, "");
}

export function normalizePan(value: string) {
  return value.trim().toUpperCase();
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

