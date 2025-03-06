import { Application } from "@oak/oak";
import { HOSTNAME } from "../config.ts";
import { PORT } from "../config.ts";
import { router } from "./controller.ts";

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port: PORT, hostname: HOSTNAME });
