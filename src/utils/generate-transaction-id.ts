import crypto from "crypto";

export const generateTransactionId = (): string => {
  const now = new Date();

  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
  const timePart = now.toTimeString().slice(0, 8).replace(/:/g, "");
  const randomPart = crypto.randomBytes(4).toString("hex");

  return `TXN-${datePart}-${timePart}-${randomPart}`;
};
