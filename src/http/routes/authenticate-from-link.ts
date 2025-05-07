import dayjs from "dayjs";
import Elysia, { t } from "elysia";
import { db } from "../../db/connection";

import { eq } from "drizzle-orm";
import { authLinks } from "../../db/schema";
import { auth } from "../auth";

export const authenticateFromLink = new Elysia();

authenticateFromLink.use(auth).get(
	"/auth-links/authenticate",
	async ({ query, signUser, redirect }) => {
		const { code, redirect: redirectTo } = query;

		const authLinkFromCode = await db.query.authLinks.findFirst({
			where(fields, { eq }) {
				return eq(fields.code, code);
			},
		});

		if (!authLinkFromCode) {
			throw new Error("Auth link not found");
		}

		const daysSinceAuthLinkCreated = dayjs().diff(
			authLinkFromCode.createdAt,
			"days",
		);

		if (daysSinceAuthLinkCreated > 7) {
			throw new Error("Auth link expired, please generate a new one.");
		}

		const managedRestaurant = await db.query.restaurants.findFirst({
			where(fields, { eq }) {
				return eq(fields.managerId, authLinkFromCode.userId);
			},
		});

		await signUser({
			sub: authLinkFromCode.userId,
			restaurantId: managedRestaurant?.id,
		});

		await db.delete(authLinks).where(eq(authLinks.code, code));

		return redirect(redirectTo);
	},
	{
		query: t.Object({
			code: t.String(),
			redirect: t.String(),
		}),
	},
);
