import { Router } from "@oak/oak/router";
import { userRouter } from "./user_controller.ts";
import { serviceRouter } from "./export_controller.ts";

export const router = new Router();

router.use(userRouter.routes(),userRouter.allowedMethods());
router.use(serviceRouter.routes(),serviceRouter.allowedMethods());