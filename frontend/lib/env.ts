import { z } from "zod";
import "server-only";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
});

const _env = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (!_env.success) {
  console.error(
    "❌ [ENV ERROR] Invalid frontend environment variables:",
    JSON.stringify(_env.error.format(), null, 2)
  );
  throw new Error("Invalid frontend environment variables");
}

export const env = _env.data;

export type Env = z.infer<typeof envSchema>;
