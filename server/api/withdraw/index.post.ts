import db from "~~/lib/db";
import { InsertWithdrawSchema, withdraw } from "~~/lib/db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      status: 401,
      statusMessage: "Unauthorized",
    }));
  }

  const result = await readValidatedBody(event, InsertWithdrawSchema.safeParse);

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

  const [created] = await db.insert(withdraw).values({ ...result.data, userId: event.context.user.id }).returning();

  const fetched = await db.query.withdraw.findFirst({
    with: {
      user: true,
    },
    where: eq(withdraw.id, created.id),
  });

  return fetched;
});
