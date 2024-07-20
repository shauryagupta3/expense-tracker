import { SelectExpensesType } from "@/db/schema/expenses";
import Link from "next/link";
import React from "react";

const AllExpenses = ({ expenses }: { expenses: SelectExpensesType[] }) => {
  return (
    <div className="w-2/3 ">
        <ul className="flex flex-col gap-4 ">
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
        </ul>
      </div>
  );
};

export default AllExpenses;
