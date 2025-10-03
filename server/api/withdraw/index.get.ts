import db from "~~/lib/db";
import { withdraw } from "~~/lib/db/schema";
import { desc, sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      status: 401,
      statusMessage: "Unauthorized",
    }));
  }

  const dailyWithdraws = await db
    .select({
      date: withdraw.createdAt,
      count: sql<number>`COUNT(*)`,
    })
    .from(withdraw)
    .groupBy(sql`DATE(${withdraw.createdAt} / 1000, 'unixepoch', 'localtime')`)
    .orderBy(desc(sql`DATE(${withdraw.createdAt} / 1000, 'unixepoch', 'localtime')`))
    .offset(1)
    .limit(10);

  return dailyWithdraws;
});
