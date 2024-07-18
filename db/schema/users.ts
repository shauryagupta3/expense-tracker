import { eq, sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { db } from "@/db/index";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  email: text("email").notNull(),
  password: text("password").notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const InsertUser = async(user: InsertUser) => {
  return await db.insert(users).values(user).returning();
};

export const SelectUser = async (user: User) => {
  return await db.select().from(users).where(eq(users.id, user.id));
};
