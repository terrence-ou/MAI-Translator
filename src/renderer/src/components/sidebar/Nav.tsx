import { House, Notebook } from "lucide-react";
import { ComponentProps } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Routes } from "@shared/types";
import { route, setCurrFilename } from "@/store/settingsSlice";
import { cn } from "@/utils";

const Nav = ({ ...props }: ComponentProps<"div">) => {
  const dispatch = useAppDispatch();
  const currRoute = useAppSelector((state) => state.settings.currentRoute);

  const handleRoute = (dest: Routes) => {
    dispatch(route(dest));
    if (dest === "main") {
      dispatch(setCurrFilename(undefined));
    }
  };

  const navStyle =
    "flex gap-2 px-2 py-[2px] items-center text-sm font-medium text-primary/70 hover:dark:bg-primary-foreground hover:bg-slate-300 rounded-md hover:cursor-pointer";
  return (
    <div {...props}>
      <div
        className={cn(
          navStyle,
          currRoute === "main" ? "bg-slate-200 dark:bg-primary-foreground/50" : ""
        )}
        onClick={() => handleRoute("main")}
      >
        <House className="w-[18px] min-w-[18px] stroke-[1.5px]" />
        Home
      </div>
      <div
        className={cn(
          navStyle,
          currRoute === "history" ? "bg-slate-200 dark:bg-primary-foreground/50" : ""
        )}
        onClick={() => handleRoute("history")}
      >
        <Notebook className="w-[18px] min-w-[18px] stroke-[1.5px]" />
        Histories
      </div>
    </div>
  );
};

export default Nav;
