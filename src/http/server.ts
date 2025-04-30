import { Elysia } from "elysia"

const app = new Elysia()

app.get('/', () => 'Hello Elysia!')

app.listen(3333, () => {
    console.log('HTTP server running!')
})