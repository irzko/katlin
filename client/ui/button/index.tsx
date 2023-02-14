import React from "react";
export interface ButtonProps {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | string;
}

const Button = ({ children, type }: ButtonProps) => {
  return (
    <button
      className="col-span-full text-white font-medium bg-black w-full h-10 rounded-md mt-4"
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
