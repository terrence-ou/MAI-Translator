import { ComponentProps } from "react";

const IconWrapper = ({ children, ...props }: ComponentProps<"svg">) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" {...props}>
      {children}
    </svg>
  );
};

export default IconWrapper;
