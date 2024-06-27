import { ComponentProps } from "react";
import { Input } from "../ui/input";
type APIInputProps = { APIName: string } & ComponentProps<"div">;

const APIInput = ({ APIName, className }: APIInputProps) => {
  return (
    <div className={className}>
      <span className="text-sm">{APIName} API</span>
      <Input
        className="w-[220px] h-[30px]"
        type="text"
        placeholder={`Paste your ${APIName} API here`}
      />
    </div>
  );
};

export default APIInput;
