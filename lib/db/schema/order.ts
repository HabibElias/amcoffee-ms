import { int, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

import { user } from "./auth-schema";

export const order = sqliteTable("order", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull().references(() => user.id, { onDelete: "cascade" }),
  orderDate: int().notNull().$default(() => Date.now()),
});

export const insertOrderSchema = createInsertSchema(order).omit({ id: true });
