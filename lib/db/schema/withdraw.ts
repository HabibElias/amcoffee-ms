import type { InferSelectModel } from "drizzle-orm";

import { relations } from "drizzle-orm";
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

import { user } from "./auth-schema";

export const withdraw = sqliteTable("withdraw", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull().references(() => user.id, { onDelete: "cascade" }),
  description: text().notNull(),
  amount: real().notNull(),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});

export const InsertWithdrawSchema = createInsertSchema(withdraw).omit({ id: true, userId: true, createdAt: true, updatedAt: true }).extend({
  amount: z.number({ message: "Amount is Required" }).min(1, { message: "Amount must be greater than 0" }),
  description: z.string({ message: "Description is Required" }).min(1, { message: "Description is Required" }),
});

export const withdrawRelations = relations(withdraw, ({ one }) => ({
  user: one(user),
}));

export type Withdraw = InferSelectModel<typeof withdraw>;
