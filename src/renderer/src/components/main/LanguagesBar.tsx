import { useAppSelector, useAppDispatch } from "@/hooks";
import { switchLanguages } from "@/store/translationConfigSlice";
import { ArrowLeftRight } from "lucide-react";
import Combobox from "@/components/main/Combobox";
import IconButton from "@/components/header/IconButton";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const LanguagesBar = () => {
  const dispatch = useAppDispatch();
  const currFromLan = useAppSelector((state) => state.translationConfig.fromLanguage);
  const currToLan = useAppSelector((state) => state.translationConfig.toLanguage);
  const handleSwitchLanguages = () => {
    dispatch(switchLanguages());
  };
  return (
    <div className="flex justify-center items-center gap-3">
      <Combobox type="fromLanguage" />
      <Tooltip>
        <IconButton
          disabled={currFromLan === "" || currFromLan === currToLan}
          onClick={handleSwitchLanguages}
          data-testid="button-lan-switch"
        >
          <TooltipTrigger asChild>
            <ArrowLeftRight className="stroke-primary stroke-thin w-4 h-4" />
          </TooltipTrigger>
        </IconButton>
        <TooltipContent side="bottom" sideOffset={8}>
          <p className="text-xs">Switch Languages</p>
        </TooltipContent>
      </Tooltip>
      <Combobox type="toLanguage" />
    </div>
  );
};

export default LanguagesBar;
