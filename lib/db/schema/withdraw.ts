import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const withdraw = sqliteTable("withdraw", {
  id: int().primaryKey({ autoIncrement: true }),
  description: text(),
  amount: real().notNull(),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});
