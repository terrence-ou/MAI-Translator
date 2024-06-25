import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const IconButton = ({ className, children }: ComponentProps<"button">) => {
  return (
    <button
      className={twMerge(
        "p-1 rounded-md hover:bg-border transition-colors duration-200",
        className
      )}
    >
      {children}
    </button>
  );
};

export default IconButton;
