import { PanelLeftOpen, Settings } from "lucide-react";
import IconButton from "./IconButton";

const iconStyle = "stroke-foreground stroke-thin";

const HeaderControls = () => {
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex justify-between">
        <IconButton>
          <PanelLeftOpen className={iconStyle} />
        </IconButton>
        <IconButton>
          <Settings className={iconStyle} />
        </IconButton>
      </div>
    </div>
  );
};

export default HeaderControls;
