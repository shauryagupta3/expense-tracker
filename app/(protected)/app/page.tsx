import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FormEvent, use, useEffect, useState } from "react";
import FormForAddExpenses from "./FormForAddExpenses";
import { GetExpenses, SelectExpensesType } from "@/db/schema/expenses";
import Last5Expenses from "./Last5Expenses";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }
  const userId = session.user.id;
  const allExpenses: SelectExpensesType[] = await GetExpenses(userId);

  return (
    <div className="text-gray-50 text-xl flex w-full items-center justify-center">
      <FormForAddExpenses />
      <Last5Expenses expenses={allExpenses} />
    </div>
  );
};

export default HomePage;
