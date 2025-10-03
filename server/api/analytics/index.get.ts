import db from "~~/lib/db";
import { menu, order, orderItem, withdraw } from "~~/lib/db/schema";
import { desc, eq, sql } from "drizzle-orm";

export default defineEventHandler(async () => {
  // Total Orders
  const [{ totalOrders = 0 }] = await db.select({ totalOrders: sql`count(*)` }).from(order);

  // Total Revenue (sum of all order items' price * quantity)
  const [{ totalRevenue = 0 }] = await db
    .select({
      totalRevenue: sql`COALESCE(SUM(${orderItem.quantity} * ${menu.price}), 0)`,
    })
    .from(orderItem)
    .leftJoin(menu, eq(orderItem.menuId, menu.id));

  // Total Withdraws
  const [{ totalWithdraws = 0 }] = await db.select({ totalWithdraws: sql`COALESCE(SUM(amount), 0)` }).from(withdraw);

  // Orders Over Time (last 14 days)
  const ordersOverTime = await db
    .select({
      date: order.orderDate,
      count: sql`count(*)`,
    })
    .from(order)
    .groupBy(sql`DATE(${order.orderDate} / 1000, 'unixepoch', 'localtime')`)
    .orderBy(desc(sql`DATE(${order.orderDate} / 1000, 'unixepoch', 'localtime')`))
    .limit(14);

  // Revenue Breakdown by menu type
  const revenueBreakdown = await db
    .select({
      type: menu.type,
      revenue: sql`COALESCE(SUM(${orderItem.quantity} * ${menu.price}), 0)`,
    })
    .from(orderItem)
    .leftJoin(menu, eq(orderItem.menuId, menu.id))
    .groupBy(menu.type);

  // Recent Orders (last 5)
  const recentOrders = await db
    .select({
      id: order.id,
      orderDate: order.orderDate,
      userId: order.userId,
    })
    .from(order)
    .orderBy(desc(order.orderDate))
    .limit(5);

  return {
    totalOrders,
    totalRevenue,
    totalWithdraws,
    ordersOverTime,
    revenueBreakdown,
    recentOrders,
  };
});
