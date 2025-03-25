import { Router } from "@oak/oak/router";
import * as path from "@std/path";
import { UPLOADS_DIR } from "../../config.ts";
import { generate } from "@std/uuid/v1";
import { PostPhotoRequest, PostPhotoSchema } from "common";
import * as v from "@valibot/valibot";
import { sql } from "../db.ts";
import { getLoggedInUser } from "../auth.ts";

export const photoRouter = new Router();

photoRouter.post("/api/photo", async (ctx) => {
  const user = await getLoggedInUser(ctx);
  if (!user) {
    return;
  }

  const form_data = await ctx.request.body.formData();
  const file = form_data.get("file") as File;

  const raw_request: PostPhotoRequest = {
    file: file,
  };

  const validation_result = await v.safeParseAsync(
    PostPhotoSchema,
    raw_request,
  );

  if (!validation_result.success) {
    ctx.response.body = validation_result.issues;
    ctx.response.status = 400;
    return;
  }

  const validated_request = validation_result.output;
  const file_data = validated_request.file.stream();
  const file_name = generate();
  const file_path = path.join(UPLOADS_DIR, file_name);

  // Perfom a transaction because we don't want to insert anything to the database when the writeFile fails
  await sql.begin(async (sql) => {
    const data = {
      user_id: user.id,
      file_path: file_name,
    };
    await sql`INSERT INTO photos ${sql(data)}`;
    await Deno.writeFile(file_path, file_data);
  });

  ctx.response.body = {};
});
