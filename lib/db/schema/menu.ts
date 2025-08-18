import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const menu = sqliteTable("menu", {
  id: int().primaryKey({ autoIncrement: true }),
  type: text("type", { enum: ["food", "drink"] }).notNull(),
  name: text().notNull(),
  price: real().notNull(),
});
