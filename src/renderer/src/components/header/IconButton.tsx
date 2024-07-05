import { ComponentProps } from "react";
import { cn } from "@/utils";

const IconButton = ({ children, ...props }: ComponentProps<"button">) => {
  const { className, onClick, disabled } = props;
  return (
    <button
      className={cn(
        "p-1 rounded-md",
        disabled ? "opacity-30" : "hover:bg-border transition-colors duration-200",
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
