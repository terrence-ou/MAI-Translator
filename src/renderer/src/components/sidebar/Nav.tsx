import { House, Notebook } from "lucide-react";
import { ComponentProps } from "react";
import { useAppDispatch } from "@/hooks";
import { Routes } from "@shared/types";
import { route } from "@/store/settingsSlice";

const Nav = ({ ...props }: ComponentProps<"div">) => {
  const dispatch = useAppDispatch();
  const handleRoute = (dest: Routes) => {
    dispatch(route(dest));
  };
  return (
    <div {...props}>
      <div
        className="flex gap-2 px-2 py-[2px] items-center text-sm font-medium text-primary/70 hover:dark:bg-primary-foreground hover:bg-slate-300 rounded-md hover:cursor-pointer"
        onClick={() => handleRoute("main")}
      >
        <House className="w-[18px] stroke-[1.5px]" />
        Home
      </div>
      <div
        className="flex gap-2 px-2 py-[2px] items-center text-sm font-medium text-primary/70 hover:dark:bg-primary-foreground hover:bg-slate-300 rounded-md hover:cursor-pointer"
        onClick={() => handleRoute("history")}
      >
        <Notebook className="w-[18px] stroke-[1.5px]" />
        Histories
      </div>
    </div>
  );
};

export default Nav;
