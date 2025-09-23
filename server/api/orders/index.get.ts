import db from "~~/lib/db";
import { order } from "~~/lib/db/schema";
import { desc, sql } from "drizzle-orm";

export default defineEventHandler(async () => {
  const dailyOrders = await db
    .select({
      date: order.orderDate,
      count: sql<number>`COUNT(*)`,
    })
    .from(order)
    .groupBy(sql`DATE(${order.orderDate} / 1000, 'unixepoch', 'localtime')`)
    .orderBy(desc(sql`DATE(${order.orderDate} / 1000, 'unixepoch', 'localtime')`))
    .offset(1)
    .limit(10);

  return dailyOrders;
});
