import { z } from "zod";

const envSchema = z.object({
	DATABASE_URL: z.string().url().min(1),
	DATABASE_HOST: z.string().min(1),
	DATABASE_USER: z.string(),
	DATABASE_PASSWORD: z.string(),
	DATABASE_NAME: z.string(),
	DATABASE_PORT: z.coerce.number().int().positive(),
	API_BASE_URL: z.string().url().min(1),
	AUTH_REDIRECT_URL: z.string().url().min(1),
	JWT_SECRET_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
