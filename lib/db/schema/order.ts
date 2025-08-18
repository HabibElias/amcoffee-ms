import { int, sqliteTable } from "drizzle-orm/sqlite-core";

export const order = sqliteTable("order", {
  id: int().primaryKey({ autoIncrement: true }),
  orderDate: int().$default(() => Date.now()),
});
