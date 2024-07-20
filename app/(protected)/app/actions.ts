"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { InsertExpense, InsertExpensesType } from "@/db/schema/expenses";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { Router } from "next/router";
import { z } from "zod";

type FormState =
  | {
      errors?: {
        amount?: string[];
        description?: string[];
      };
    }
  | undefined;
const SchemaExpense = z.object({
  amount: z.number({ message: "not a number" }),
  description: z.string(),
});

export const AddExpenseToDB = async (
  FormState: FormState,
  data: FormData
): Promise<FormState> => {
  const validatedData = SchemaExpense.safeParse({
    amount: Number(data.get("amount")),
    description: data.get("description"),
  });
  
  if (!validatedData.success) {
      return { errors: validatedData.error.flatten().fieldErrors };
    }
    
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
        return undefined;
    }
    console.log("i am here");

  const userId = session?.user.id;
  const newExpense: InsertExpensesType = {
    amount: validatedData.data.amount,
    description: validatedData.data.description,
    userId: userId,
  };
  const expense = await InsertExpense(newExpense);
  const insertedID = expense[0].id;
  revalidatePath('/app')
  return undefined;
};
