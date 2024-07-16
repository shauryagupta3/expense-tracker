"use client";

import ErrorMessage from "@/components/ErrorMessage";
import InputTextField from "@/components/InputTextField";
import { Button } from "@/components/ui/button";
import { AddTransaction } from "@/lib/transactions";
import { useFormState, useFormStatus } from "react-dom";

const ExpenseTracker = () => {
  const [state, action] = useFormState(AddTransaction, undefined);

  return (
    <>
      <form action={action}>
        <div className="flex flex-col gap-2 p-8 bg-slate-100 text-slate-950 rounded-2xl">
          <div className="grid grid-cols-3">
            <label htmlFor="amount">Amount</label>
            <InputTextField name="amount" type="number" value="0" />{" "}
          </div>
          {state?.errors?.amount && (
            <ErrorMessage>{state.errors.amount}</ErrorMessage>
          )}
          <div className="grid grid-cols-3">
            <label htmlFor="text">Text</label>
            <InputTextField name="text" />{" "}
          </div>
          {state?.errors?.text && (
            <ErrorMessage>{state.errors.text}</ErrorMessage>
          )}
          <AddButton />{" "}
        </div>{" "}
      </form>
    </>
  );
};
export function AddButton() {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} type="submit" className="mt-2 w-full">
      {pending ? "Submitting..." : "Add Expense"}
    </Button>
  );
}
export default ExpenseTracker;
