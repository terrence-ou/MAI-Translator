import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComponentProps } from "react";

const ThemeSelector = ({ className }: ComponentProps<"div">) => {
  return (
    <div className={className}>
      <span className="text-sm">Theme</span>
      <Select>
        <SelectTrigger className="w-[120px] h-[30px]">
          <SelectValue placeholder="System" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ThemeSelector;
