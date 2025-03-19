import { Router } from "@oak/oak/router";
import { getAllServices } from "../models/services.ts";
import { ServiceResponse } from "../../../common/responses.ts"

export const serviceRouter = new Router();

serviceRouter.get("/api/services", async (ctx) => {
  const services = await getAllServices();
  const response: ServiceResponse[] = services.map((service) => {
    return {
      id: service.id,
      name: service.name,
    };
  });

  ctx.response.body = response;
});