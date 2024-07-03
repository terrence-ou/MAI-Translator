import { ComponentProps } from "react";
import { Input } from "../ui/input";
import { AISource } from "@shared/types";
type APIInputProps = { source: AISource } & ComponentProps<"div">;

const APIInput = ({ source, className }: APIInputProps) => {
  return (
    <div className={className}>
      <span className="text-sm">{source} API</span>
      <Input
        className="w-[220px] h-[30px]"
        type="text"
        placeholder={`Paste your ${source} API here`}
      />
    </div>
  );
};

export default APIInput;
