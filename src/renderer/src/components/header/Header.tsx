import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const Header = ({ className }: ComponentProps<"header">) => {
  return <header className={twMerge("absolute inset-0", className)}></header>;
};

export default Header;
