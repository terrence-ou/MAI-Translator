import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComponentProps } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { RootState } from "@/store";
import { updateSettings } from "@/store/settingsSlice";
// import { useTheme } from "../ThemeProvider";
import { Theme } from "@shared/types";

const ThemeSelector = ({ className }: ComponentProps<"div">) => {
  const dispatch = useAppDispatch();
  const currTheme = useAppSelector((state: RootState) => state.settings.theme);

  // Change the theme from the selecor will trigger updating the redux store
  const handleSelectTheme = (newTheme: Theme) => {
    dispatch(updateSettings({ theme: newTheme }));
  };

  return (
    <div className={className}>
      <span className="text-sm">Theme</span>
      <Select onValueChange={(value) => handleSelectTheme(value as Theme)}>
        <SelectTrigger className="w-[120px] h-[30px]">
          <SelectValue placeholder={currTheme![0].toUpperCase() + currTheme?.slice(1)} />
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
