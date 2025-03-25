import { Context } from "@oak/oak";
import { getUserBySession } from "./models/sessions.ts";
import { DbUser } from "./models/users.ts";

export async function getLoggedInUser(
  ctx: Context,
): Promise<DbUser | undefined> {
  const session = await ctx.cookies.get("SESSION");

  if (!session) {
    ctx.response.body = { message: "Brak sesji" };
    ctx.response.status = 400;
    return;
  }

  const loggedUser = await getUserBySession(session);
  if (!loggedUser) {
    ctx.response.body = {
      message: "Żaden użytkownik nie jest powiązany z sesją",
    };
    ctx.response.status = 400;
    return;
  }

  return loggedUser;
}
