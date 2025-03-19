import { Application } from "@oak/oak";
import { HOSTNAME } from "../config.ts";
import { PORT } from "../config.ts";
import { router } from "./controllers/controller.ts";
import { migrate } from "./migrations.ts";
import { oakCors } from "../deps.ts";

console.log("Running database migrations...");
await migrate();
console.log("Migrations complete");

const app = new Application();
app.use(oakCors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port: PORT, hostname: HOSTNAME });
console.log(`Server running on http://${HOSTNAME}:${PORT}`);
