import { SelectExpensesType } from "@/db/schema/expenses";
import Link from "next/link";
import React from "react";

const Last5Expenses = ({ expenses }: { expenses: SelectExpensesType[] }) => {
  expenses = expenses.slice(0, 5);
  return (
    <div className="h-full flex justify-center w-1/4">
      <ul className="flex flex-col gap-4">
        <li className="text-center">last 5 transactions</li>
        {expenses.map((e) => {
          return (
            <li key={e.id} className="flex justify-between">
              <div>
                <p>{e.description}</p>
                <p className="text-sm text-gray-400">{e.createdAt}</p>
              </div>
              <p className="text-red-500">{e.amount}</p>
            </li>
          );
        })}
        <li>
          <Link href={"/app/transactions"}>
            <button className="w-full bg-gray-50 text-gray-950 py-1 rounded-md">
              See all expenses
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Last5Expenses;
