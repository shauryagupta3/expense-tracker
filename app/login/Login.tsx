"use client";
import { login } from "@/lib/auth/actions";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ErrorMessage";
import InputTextField from "@/components/InputTextField";

const Login = () => {
  const [state, action] = useFormState(login, undefined);
  return (
    <>
      <form action={action}>
        <div className="flex flex-col gap-2 p-8 bg-white text-slate-950 rounded-2xl">
          <div className="grid grid-cols-3">
            <label htmlFor="email">Email</label>
            <InputTextField name="email" />{" "}
          </div>
          {state?.errors?.email && (
            <ErrorMessage>{state.errors.email}</ErrorMessage>
          )}
          <div className="grid grid-cols-3">
            <label htmlFor="password">Password</label>
            <InputTextField name="password" />{" "}
          </div>
          {state?.errors?.password && (
            <ErrorMessage>{state.errors.password}</ErrorMessage>
          )}
          <LoginButton />{" "}
        </div>{" "}
      </form>
    </>
  );
};

export function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button aria-disabled={pending} type="submit" className="mt-2 w-full">
      {pending ? "Submitting..." : "Login"}
    </Button>
  );
}

export default Login;
