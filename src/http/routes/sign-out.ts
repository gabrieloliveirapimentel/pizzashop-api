import Elysia from "elysia";
import { auth } from "../auth";

export const signOut = new Elysia();

signOut.use(auth).post("/sign-out", async ({ cookie: { auth } }) => {
	if (auth) {
		auth.remove();
	}
});
