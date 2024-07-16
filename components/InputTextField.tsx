type InputTextFieldProps = {
  name: string;
  type?: string;
  value?: string;
};

const InputTextField = ({
  name,
  type = "text",
  value = "",
}: InputTextFieldProps) => {
  return (
    <input
      type={type}
      name={name}
      id=""
      className="border-2 border-slate-900 rounded-sm col-span-2 px-2 bg-transparent"
    />
  );
};

export default InputTextField;
