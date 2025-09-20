import db from "~~/lib/db";
import { order } from "~~/lib/db/schema";
import { desc, sql } from "drizzle-orm";

export default defineEventHandler(async () => {
// Example: count orders grouped by date (ignoring time)
  const dailyOrders = await db
    .select({
      date: order.orderDate, // or 'unixepoch', 'unixepoch', 'localtime' depending on your TZ
      count: sql<number>`COUNT(*)`,
    })
    .from(order)
    .groupBy(sql`DATE(${order.orderDate}, 'unixepoch')`)
    .orderBy(desc(sql`DATE(${order.orderDate}, 'unixepoch')`));

  return dailyOrders;
});
