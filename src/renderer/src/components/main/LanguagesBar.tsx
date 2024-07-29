import { useAppSelector, useAppDispatch } from "@/hooks";
import { switchLanguages } from "@/store/translationConfigSlice";
import { ArrowLeftRight } from "lucide-react";
import Combobox from "@/components/main/Combobox";
import IconButton from "../header/IconButton";

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
      <IconButton
        disabled={currFromLan === "" || currFromLan === currToLan}
        onClick={handleSwitchLanguages}
        data-testid="button-lan-switch"
      >
        <ArrowLeftRight className="stroke-primary stroke-thin w-4 h-4" />
      </IconButton>
      <Combobox type="toLanguage" />
    </div>
  );
};

export default LanguagesBar;
