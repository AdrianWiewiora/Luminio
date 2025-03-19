import { Router } from "@oak/oak/router";
import { getContactsByUser } from "../models/contacts.ts";
import { ContactResponse } from "../../../common/responses.ts";

export const contactRouter = new Router();

contactRouter.get("/api/users/:id/contacts", async (ctx) => {
  const id = Number.parseInt(ctx.params.id, 10);
  const services = await getContactsByUser(id);
  const response: ContactResponse[] = services.map((contact) => {
    return {
      id: contact.id,
      user_id: contact.user_id,
      name: contact.name,
      contact_info: contact.contact_info,
    };
  });

  ctx.response.body = response;
});
