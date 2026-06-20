export function maskAadhaar(aadhaar: string) {
  return `XXXX XXXX ${aadhaar.slice(-4)}`;
}

export function maskPan(pan: string) {
  return `${pan.slice(0, 5)}****${pan.slice(-1)}`;
}

