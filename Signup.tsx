"use client";

import React from "react";
import { useFormState } from "react-dom";
import { signup } from "../actions";

const Signup = () => {
  const [state, action] = useFormState(signup, undefined);
  return (
    <div className="text-gray-50 text-xl">
      <form action={action}>
        <div className="flex flex-col justify-around gap-1">
          <label htmlFor="email">Email</label>
          <input type="email" className=" border-2 border-gray-50 bg-transparent rounded-md p-2" name="email" placeholder="Enter email address" />
          {state?.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 my-2">
          <label htmlFor="password">Password</label>
          <input type="password" className=" border-2 border-gray-50 bg-transparent rounded-md p-2" name="password" placeholder="Enter password" />
          <input
            type="password"
            name="password-re-enter"
            placeholder="Enter password again"
            className=" border-2 border-gray-50 bg-transparent rounded-md p-2"
          />
          {state?.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password}</p>
          )}{" "}
        </div>
        <button type="submit" className="w-full bg-gray-50 text-gray-950 py-1 rounded-md">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
