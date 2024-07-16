import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z.string().min(2, { message: "atleast 2 letters" }).trim(),
  email: z.string().email({ message: "enter valid email" }).trim(),
  password: z.string().min(8, "invalid").trim(),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "enter valid email" }).trim(),
  password: z.string().min(8, "invalid").trim(),
});

export const TransactionSchema = z.object({
  amount: z.number().max(1000000, "Max amount 1000000"),
  text: z.string().trim(),
});

export const payloadSchema = z.object({
  userId: z.string(),
  expiresAt: z.string(),
});

export type TransactionState =
  | {
      errors?: {
        amount?: string[];
        text?: string[];
      };
      message?: string;
    }
  | undefined;

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};
