import { Input } from "../ui/input";
import { ComponentProps } from "react";

const FontSizeSelector = ({ className }: ComponentProps<"div">) => {
  return (
    <div className={className}>
      <span className="text-sm">Editor Font Size</span>
      <div className="flex items-center gap-2">
        <Input className="w-[70px] h-[30px]" type="number" defaultValue={10} />
        <span>px</span>
      </div>
    </div>
  );
};

export default FontSizeSelector;
