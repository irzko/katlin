import { ChangeEventHandler, FocusEventHandler, useState } from "react";
import clsx from "clsx";

type InputType = {
  type: string;
  label: string;
  id: string;
  name?: string;
  className: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  value: any;
  errorMessage: string;
  // checkValid?: Function;
};

const TextField = ({
  type,
  label,
  id,
  name = id,
  className = "",
  onChange,
  value,
  errorMessage,
  onBlur,
}: // checkValid,
InputType) => {
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(!focus);
  };

  // const handleBlur = () => {
  //   setFocus(!focus);
  //   if (checkValid) {
  //     checkValid(id);
  //   }
  // };

  return (
    <div className={className}>
      <div className="relative">
        <input
          className={clsx(
            errorMessage
              ? "border-red-500 focus:border-red-500"
              : "focus:border-blue-500",
            "focus:outline-none h-10 w-full border focus:border-[3px] rounded-xl px-1.5 text-gray-900 peer"
          )}
          type={type}
          id={id}
          name={name}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={onBlur}
          value={value}
          placeholder=" "
        ></input>
        <label
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
      <span className="text-red-500 text-xs">{errorMessage}</span>
    </div>
  );
};

export default TextField;
