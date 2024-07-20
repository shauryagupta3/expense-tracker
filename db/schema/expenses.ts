import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "..";

export const expenses = sqliteTable("expenses", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  description: text("description"),
  amount: integer("amount", { mode: "number" }).notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
});

export type InsertExpensesType = typeof expenses.$inferInsert;
export type SelectExpensesType = typeof expenses.$inferSelect;

export async function InsertExpense(expense: InsertExpensesType) {
  return await db.insert(expenses).values(expense).returning();
}

export async function GetExpenses(
  userId: string
): Promise<SelectExpensesType[]> {
  return await db.select().from(expenses).where(eq(expenses.userId, userId)).orderBy(desc(expenses.createdAt));
}
