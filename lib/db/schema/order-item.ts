import { int, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { menu } from "./menu";
import { order } from "./order";

export const orderItem = sqliteTable("order_item", {
  id: int().primaryKey({ autoIncrement: true }),
  // refer order id
  orderId: int().notNull().references(() => order.id, { onDelete: "cascade" }),
  // refer menu id
  menuId: int().notNull().references(() => menu.id, { onDelete: "cascade" }),
  quantity: int().notNull(),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});

export const orderItemSchema = createInsertSchema(orderItem)
  .omit({ id: true, orderId: true })
  .extend({
    menuId: z.preprocess(val => Number(val), z.number()),
  });

export const insertOrderItemSchema = z.object({
  orderItems: z.array(orderItemSchema),
});
