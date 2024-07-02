import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const IconButton = ({ className, children, onClick, ...props }: ComponentProps<"button">) => {
  return (
    <button
      className={twMerge(
        "p-1 rounded-md hover:bg-border transition-colors duration-200",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
