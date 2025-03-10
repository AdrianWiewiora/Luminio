import { Application } from "@oak/oak";
import { HOSTNAME } from "../config.ts";
import { PORT } from "../config.ts";
import { router } from "./controller.ts";
import { migrate } from "./migrations.ts";

console.log("Running database migrations...");
await migrate();
console.log("Migrations complete");

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port: PORT, hostname: HOSTNAME });
console.log(`Server running on http://${HOSTNAME}:${PORT}`);
