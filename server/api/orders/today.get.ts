import db from "~~/lib/db";
import { order } from "~~/lib/db/schema";
import { and, desc, gte, lt } from "drizzle-orm";

export default defineEventHandler(async () => {
  // Get today's date at midnight (start of day)
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime();

  // Fetch orders where orderDate is today (assuming orderDate is a timestamp)

  const todaysOrders = await db.query.order.findMany({
    orderBy: [desc(order.orderDate)], // Orders by createdAt ascending
    where: and(
      gte(order.orderDate, startOfToday),
      lt(order.orderDate, endOfToday),
    ),
    with: {
      orderItem: true,
      user: true,
    },
  });

  return todaysOrders;
});
