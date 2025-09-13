import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

export const menu = sqliteTable("menu", {
  id: int().primaryKey({ autoIncrement: true }),
  type: text("type", { enum: ["food", "drink"] }).notNull(),
  image: text(),
  name: text().notNull(),
  price: real().notNull(),
});

export const InsertMenuSchema = createInsertSchema(menu, {
  image: schema => schema.url({ message: "Image must be a valid URL" }).optional(),
  name: schema => schema.min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name must be at most 100 characters" }),
  price: schema => schema.positive({ message: "Price must be positive" }),
  type: schema => schema.refine(val => ["food", "drink"].includes(val), { message: "Type must be either 'food' or 'drink'" }),
}).omit({ id: true });
