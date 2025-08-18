import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { user } from "./auth-schema";

export const withdraw = sqliteTable("withdraw", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull().references(() => user.id, { onDelete: "cascade" }),
  description: text(),
  amount: real().notNull(),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});
