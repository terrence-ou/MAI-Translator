import { ComponentProps } from "react";
import TextField from "./TextField";
import { cn } from "@/utils";

const TranslationInterface = ({ className }: ComponentProps<"div">) => {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex-1 flex gap-4">
        <TextField />
        <TextField disabled={true} content={" This is a default content"} />
      </div>
    </div>
  );
};

export default TranslationInterface;
