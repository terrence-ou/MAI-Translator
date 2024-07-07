import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { setFromLanguage, setToLanguage } from "@/store/translationConfigSlice";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

import supportedLanguages from "@shared/languages";
import { RootState } from "@/store";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/utils";

type ComboboxProps = {
  type: "fromLanguage" | "toLanguage";
};

/*
  The body of Combobox component
*/
const Combobox = ({ type }: ComboboxProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const setLanFn = (newLan: string) => {
    type === "toLanguage" ? dispatch(setToLanguage(newLan)) : dispatch(setFromLanguage(newLan));
    setOpen(false);
  };

  // Get language list based on the combobox type
  const languageList =
    type === "toLanguage" ? supportedLanguages.slice(1) : supportedLanguages.slice(0);

  // Get current language and label based on the combobox type
  const currLan = useAppSelector((state: RootState) => {
    if (type === "fromLanguage") {
      return state.translationConfig.fromLanguage;
    } else {
      return state.translationConfig.toLanguage;
    }
  });
  const label = languageList.filter(({ value }) => value === currLan)[0].label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] h-[30px] justify-between rounded-sm border-none bg-transparent"
        >
          {label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Language..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languageList.map(({ language, label, value }) => (
                <CommandItem key={language} value={value} onSelect={() => setLanFn(value)}>
                  <Check
                    className={cn("mr-2 h-4 w-4", value === currLan ? "opacity-100" : "opacity-0")}
                  />
                  {label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
