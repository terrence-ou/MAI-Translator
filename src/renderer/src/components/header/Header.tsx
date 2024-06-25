import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import HeaderControls from "./HeaderControls";

const Header = ({ className }: ComponentProps<"header">) => {
  return (
    <header className={twMerge("absolute inset-0", className)}>
      <HeaderControls />
    </header>
  );
};

export default Header;
