import { Elysia } from "elysia";
import { authenticateFromLink } from "./routes/authenticate-from-link";
import { registerRestaurant } from "./routes/register-restaurant";
import { sendAuthLink } from "./routes/send-auth-link";
import { signOut } from "./routes/sign-out";

const app = new Elysia();

app.use(registerRestaurant);
app.use(sendAuthLink);
app.use(authenticateFromLink);
app.use(signOut);

app.listen(3333, () => {
	console.log("HTTP server running!");
});
