import { Router } from "@oak/oak/router";
import { userRouter } from "./user_controller.ts";
import { serviceRouter } from "./service_controller.ts";
import { contactRouter } from "./contact_controller.ts";
import { photoRouter } from "./photo_controller.ts";

export const router = new Router();

router.use(userRouter.routes(), userRouter.allowedMethods());
router.use(serviceRouter.routes(), serviceRouter.allowedMethods());
router.use(contactRouter.routes(), contactRouter.allowedMethods());
router.use(photoRouter.routes(), photoRouter.allowedMethods());
