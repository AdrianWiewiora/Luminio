import { Router } from "@oak/oak/router";
import { getUserBySession } from "./../models/sessions.ts";
import * as path from "@std/path";
import { UPLOADS_DIR } from "../../config.ts";
import { generate } from "@std/uuid/v1";

export const photoRouter = new Router();

photoRouter.post("/api/photo", async (ctx) => {
  const session_cookie = await ctx.cookies.get("SESSION");
  if (!session_cookie) {
    ctx.response.status = 401;
    return;
  }

  const user = await getUserBySession(session_cookie);
  if (!user) {
    ctx.response.status = 401;
    return;
  }

  const form_data = await ctx.request.body.formData();
  const file = form_data.get("file") as File;
  if (!file) {
    ctx.response.status = 400;
    return;
  }

  const file_data = file.stream();

  const file_name = generate();
  const file_path = path.join(UPLOADS_DIR, file_name);
  await Deno.writeFile(file_path, file_data);

  ctx.response.body = {};
});
