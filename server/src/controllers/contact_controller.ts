import { Router } from "@oak/oak/router";
import { getContactsByUser, updateContacts } from "../models/contacts.ts";
import { ContactResponse } from "../../../common/responses.ts";
import { UpdateContactSchema } from "../../../common/requests/contact_requests.ts";
import { getUserBySession } from "../models/sessions.ts";
import * as v from "@valibot/valibot";

export const contactRouter = new Router();

contactRouter.get("/api/users/:id/contacts", async (ctx) => {
  const id = Number.parseInt(ctx.params.id, 10);
  const contacts = await getContactsByUser(id);
  const response: ContactResponse[] = contacts.map((contact) => {
    return {
      id: contact.id,
      user_id: contact.user_id,
      name: contact.name,
      contact_info: contact.contact_info,
    };
  });

  ctx.response.body = response;
});

//if contact has id - update, if not - insert
contactRouter.put("/api/users/:id/contacts", async (ctx) => {
  const user_id = Number.parseInt(ctx.params.id, 10);
  const body = await ctx.request.body.json();
  const request = v.parse(v.array(UpdateContactSchema), body);

  const session = await ctx.cookies.get("SESSION");
  if (session === undefined) {
    ctx.response.body = { message: "Brak sesji" };
    ctx.response.status = 400;
    return;
  }
  const logged_user = await getUserBySession(session);
  if (logged_user === undefined) {
    ctx.response.body = {
      message: "Żaden użytkownik nie jest powiązany z sesją",
    };
    ctx.response.status = 400;
    return;
  }
  if (
    logged_user.id !== user_id ||
    request.some((contact) => contact.user_id !== logged_user.id)
  ) {
    ctx.response.body = {
      message: "Próba modyfikacji niezalogowanego użytkownika",
    };
    ctx.response.status = 400;
    return;
  }
  const old_contacts = await getContactsByUser(user_id);
  if (
    request.some((contact) =>
      old_contacts.map((c) => c.name).includes(contact.name)
    )
  ) {
    ctx.response.body = { message: "Ten kontakt już istnieje" };
    ctx.response.status = 400;
    return;
  }
  await updateContacts(request);

  ctx.response.body = {};
});
