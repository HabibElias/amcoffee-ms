import db from "~~/lib/db";
import { InsertMenuSchema, menu } from "~~/lib/db/schema";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    }));
  }

  const result = await readValidatedBody(event, InsertMenuSchema.safeParse);

  if (!result.success) {
    const statusMessage = result.error.issues.map(issue => `${issue.path.join("")}: ${issue.message}`).join("; ");

    const data = result.error.issues.reduce((error, issue) => {
      error[issue.path.join("")] = issue.message;
      return error;
    }, {} as Record<string, string>);
    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }

  const [created] = await db.insert(menu).values({
    ...result.data,
  }).returning();

  return created;
});
