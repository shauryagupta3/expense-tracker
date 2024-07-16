import React from "react";
import ExpenseTracker from "./ExpenseTracker";
import { getUser } from "@/lib/auth/getUser";
import {
  getRecentTransaction,
  getSumOfTransactionsOfCurrentMonth,
} from "@/lib/transactions";
import LastTransaction from "@/components/LastTransaction";
import ExpensesThisMonth from "@/components/ExpensesThisMonth";

const page = async () => {
  const user = await getUser();
  const expenses = await getSumOfTransactionsOfCurrentMonth();
  const recentTransaction = await getRecentTransaction();

  return (
    <div>
      {recentTransaction && <LastTransaction transaction={recentTransaction} />}{" "}
      <ExpenseTracker />
      {expenses && <ExpensesThisMonth expenses={expenses} />}
    </div>
  );
};

export default page;
