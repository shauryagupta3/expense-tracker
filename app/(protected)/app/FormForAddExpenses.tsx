"use client";
import React, { FormEvent } from "react";
import { useFormState } from "react-dom";
import { AddExpenseToDB } from "./actions";

const FormForAddExpenses = () => {
  const [state,action] = useFormState(AddExpenseToDB,undefined)
  return (
    <div className="w-2/4 flex justify-around">

    <form action={action} className="w-1/2 ">
      <div className="flex flex-col justify-around gap-1">
        <label htmlFor="email">Amount</label>
        <input
          type="number"
          className=" border-2 border-gray-50 bg-transparent rounded-md p-2"
          name="amount"
          placeholder="Enter the amount"
        />
      </div>
      <div className="flex flex-col gap-1 my-2">
        <label htmlFor="password">Description</label>
        <input
          type="text"
          className=" border-2 border-gray-50 bg-transparent rounded-md p-2"
          name="description"
          placeholder="Enter description for expense"
          />
      </div>
      <button
        type="submit"
        className="w-full bg-gray-50 text-gray-950 py-1 rounded-md"
        >
        Sign Up
      </button>
    </form>
        </div>
  );
};

export default FormForAddExpenses;
