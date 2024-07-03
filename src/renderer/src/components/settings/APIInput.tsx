import { forwardRef, useRef, useImperativeHandle, ComponentProps } from "react";
import { Input } from "../ui/input";
import { AISource } from "@shared/types";
import type { InputHandle } from "../header/SettingDialog";
type APIInputProps = { source: AISource } & ComponentProps<"div">;

const APIInput = forwardRef<InputHandle, APIInputProps>(function APIInput(
  { source, ...props },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(
    ref,
    () => ({
      getValue: () => inputRef.current?.value,
    }),
    []
  );

  return (
    <div {...props}>
      <span className="text-sm">{source} API</span>
      <Input
        ref={inputRef}
        className="w-[220px] h-[30px]"
        type="text"
        placeholder={`Paste your ${source} API here`}
      />
    </div>
  );
});

export default APIInput;
