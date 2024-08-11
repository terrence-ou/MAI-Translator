import { cn } from "@/utils";
import { ComponentProps } from "react";

const IconButton = ({ children, ...props }: ComponentProps<"button">) => {
  const { className, onClick, disabled } = props;
  return (
    <button
      className={cn(
        "p-1 h-7 rounded-md focus-visible:ring-offset-0 focus-visible:ring-0",
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
