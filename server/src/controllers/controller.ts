import { Router } from "@oak/oak/router";
import { userRouter } from "./user_controller.ts";
import { serviceRouter } from "./service_controller.ts";
import { contactRouter } from "./contact_controller.ts";
import { albumRouter } from "./album_controller.ts";
import { photoReviewRouter } from "./photo_review_controller.ts";
import { albumReviewRouter } from "./album_review_controller.ts";

export const router = new Router();

router.use(userRouter.routes(), userRouter.allowedMethods());
router.use(serviceRouter.routes(), serviceRouter.allowedMethods());
router.use(contactRouter.routes(), contactRouter.allowedMethods());
router.use(albumRouter.routes(), albumRouter.allowedMethods());
router.use(photoReviewRouter.routes(), photoReviewRouter.allowedMethods());
router.use(albumReviewRouter.routes(), albumReviewRouter.allowedMethods());
