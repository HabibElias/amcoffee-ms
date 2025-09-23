import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { order } from "./order";

export const user = sqliteTable("user", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: int({ mode: "boolean" })
    .$defaultFn(() => false)
    .notNull(),
  image: text(),
  createdAt: int()
    .$defaultFn(() => /* @__PURE__ */Date.now())
    .notNull(),
  updatedAt: int()
    .$defaultFn(() => /* @__PURE__ */Date.now())
    .notNull(),
});

export const userRelations = relations(user, ({ one }) => ({
  order: one(order, {
    fields: [user.id],
    references: [order.userId],
  }),
}));

export const session = sqliteTable("session", {
  id: int().primaryKey({ autoIncrement: true }),
  expiresAt: int().notNull(),
  token: text().notNull().unique(),
  createdAt: int().notNull(),
  updatedAt: int().notNull(),
  ipAddress: text(),
  userAgent: text(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: int().primaryKey({ autoIncrement: true }),
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  accessTokenExpiresAt: int("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: int("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text(),
  password: text(),
  createdAt: int().notNull(),
  updatedAt: int().notNull(),
});

export const verification = sqliteTable("verification", {
  id: int().primaryKey({ autoIncrement: true }),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: int().notNull(),
  createdAt: int().$defaultFn(
    () => /* @__PURE__ */Date.now(),
  ),
  updatedAt: int().$defaultFn(
    () => /* @__PURE__ */Date.now(),
  ),
});
