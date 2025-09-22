import type { InferSelectModel } from "drizzle-orm";

import { relations } from "drizzle-orm";
import { int, sqliteTable } from "drizzle-orm/sqlite-core";

import { user } from "./auth-schema";
import { orderItem } from "./order-item";

export const order = sqliteTable("order", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull().references(() => user.id, { onDelete: "cascade" }),
  orderDate: int().notNull().$default(() => Date.now()),
});

export const orderRelations = relations(order, ({ many, one }) => ({
  orderItem: many(orderItem),
  user: one(user),
}));

export type Order = InferSelectModel<typeof order>;
