import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";

import { createId } from "@paralleldrive/cuid2";
import { db } from "../../db/connection";
import { authLinks, users } from "../../db/schema";
import { env } from "../../env";

export const sendAuthLink = new Elysia();

sendAuthLink.post(
	"/authenticate",
	async ({ body }) => {
		const { email } = body;

		// const userFromEmail = await db.query.users.findFirst({where(fields, { eq }) { return eq(fields.email, email) }}})
		const [userFromEmail] = await db
			.select()
			.from(users)
			.where(eq(users.email, email));

		if (!userFromEmail) {
			throw new Error("User not found");
		}

		const authLinkCode = createId();

		await db.insert(authLinks).values({
			userId: userFromEmail.id,
			code: authLinkCode,
		});

		// Send email

		const authLink = new URL("/auth-links/authenticate", env.API_BASE_URL);

		authLink.searchParams.set("code", authLinkCode);
		authLink.searchParams.set("redirect", env.AUTH_REDIRECT_URL);

		console.log(authLink.toString());
	},
	{
		body: t.Object({
			email: t.String({ format: "email" }),
		}),
	},
);
