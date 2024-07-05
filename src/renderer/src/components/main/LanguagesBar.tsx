import { useAppSelector, useAppDispatch } from "@/hooks";
import { switchLanguages } from "@/store/translationConfigSlice";
import { ArrowLeftRight } from "lucide-react";
import Combobox from "@/components/main/Combobox";
import IconButton from "../header/IconButton";

const LanguagesBar = () => {
  const dispatch = useAppDispatch();
  const currFromLan = useAppSelector((state) => state.translationConfig.fromLanguage);
  const handleSwitchLanguages = () => {
    dispatch(switchLanguages());
  };
  return (
    <div className="flex justify-center items-center gap-3">
      <Combobox type="fromLanguage" />
      <IconButton disabled={currFromLan === ""} onClick={handleSwitchLanguages}>
        <ArrowLeftRight className="stroke-primary stroke-thin w-5 h-5" />
      </IconButton>
      <Combobox type="toLanguage" />
    </div>
  );
};

export default LanguagesBar;
