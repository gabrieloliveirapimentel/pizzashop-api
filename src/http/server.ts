import { Elysia } from "elysia";
import { authenticateFromLink } from "./routes/authenticate-from-link";
import { registerRestaurant } from "./routes/register-restaurant";
import { sendAuthLink } from "./routes/send-auth-link";

const app = new Elysia();

app.use(registerRestaurant);
app.use(sendAuthLink);
app.use(authenticateFromLink);

app.listen(3333, () => {
	console.log("HTTP server running!");
});
