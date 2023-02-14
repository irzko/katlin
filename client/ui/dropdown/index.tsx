import { ChangeEvent, FocusEventHandler, useState } from "react";
import clsx from "clsx";

type OptionType = {
  label: string;
  value: number;
};

type DropdownType = {
  label: string;
  id: string;
  name?: string;
  options: OptionType[];
  className: string;
  onChange?: ChangeEvent<HTMLSelectElement> | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  value: any;
  errorMessage: string;
  // checkValid?: Function;
};

const Dropdown = ({
  label,
  id,
  name = id,
  className = "",
  options,
  onChange,
  errorMessage,
  // checkValid,
  value,
}: DropdownType) => {
  const [focus, setFocus] = useState(false);
  const [dropDownValue, setDropDownValue] = useState("");

  const handleFocus = () => {
    setFocus(!focus);
  };

  const handleBlur = () => {
    setFocus(!focus);
    // checkValid(id);
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDropDownValue(event.target.value);
    // onChange();
  };

  return (
    <div className={className}>
      <div className="relative">
        <select
          name={name}
          id={id}
          onChange={handleChange}
          onFocus={handleFocus}
          value={value}
          onBlur={handleBlur}
          className={clsx(
            errorMessage
              ? "border-red-500 focus:border-red-500"
              : "focus:border-blue-500",
            "focus:outline-none h-10 w-full border focus:border-[3px] rounded-xl px-1.5 text-gray-900 peer"
          )}
        >
          <option value="" hidden></option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <label
          className={clsx(
            "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2  peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1",
            dropDownValue
              ? "top-2 scale-75 -translate-y-4 left-1"
              : "scale-100 -translate-y-1/2 top-1/2"
          )}
          htmlFor={id}
        >
          {label}
        </label>
      </div>
      <span className="text-red-500 text-xs">{errorMessage}</span>
    </div>
  );
};

export default Dropdown;
