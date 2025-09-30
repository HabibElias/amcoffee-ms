import db from "~~/lib/db";
import { withdraw } from "~~/lib/db/schema";
import { and, desc, gte, lt } from "drizzle-orm";

export default defineEventHandler(async () => {
  // Get today's date at midnight (start of day)
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime();

  // Fetch orders where orderDate is today (assuming orderDate is a timestamp)

  const todayWithdraws = await db.query.withdraw.findMany({
    orderBy: [desc(withdraw.createdAt)], // Orders by createdAt ascending
    where: and(
      gte(withdraw.createdAt, startOfToday),
      lt(withdraw.createdAt, endOfToday),
    ),
    with: {
      user: true,
    },
  });

  return todayWithdraws;
});
