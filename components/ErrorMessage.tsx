import { ReactElement } from "react";

type errorMessageProps = {
  children: string[];
};

const ErrorMessage = ({ children }: errorMessageProps) => {
  return <p className="text-red-500 text-xs">{children}</p>;
};

export default ErrorMessage;
