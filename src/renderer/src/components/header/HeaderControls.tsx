import { PanelLeftOpen } from "lucide-react";
import IconButton from "@/components/header/IconButton";
import SettingDialog from "@/components/header/SettingDialog";

const iconStyle = "stroke-foreground stroke-thin";

const HeaderControls = () => {
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex justify-between">
        <IconButton>
          <PanelLeftOpen className={iconStyle} />
        </IconButton>
        <SettingDialog className={iconStyle} />
      </div>
    </div>
  );
};

export default HeaderControls;
