import { useAppSelector, useAppDispatch } from "@/hooks";
import { togglePanel } from "@/store/settingsSlice";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import IconButton from "@/components/header/IconButton";
import SettingDialog from "@/components/header/SettingDialog";
import LanguagesBar from "@/components/main/LanguagesBar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const iconStyle = "stroke-primary stroke-thin w-5 h-5";

const HeaderControls = () => {
  const dispatch = useAppDispatch();
  const panelStatus = useAppSelector((state) => state.settings.showPanel);

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex justify-between">
        <Tooltip>
          <IconButton
            onClick={() => dispatch(togglePanel())}
            data-testid={panelStatus ? "button-panel-close" : "button-panel-open"}
          >
            <TooltipTrigger asChild>
              {panelStatus ? (
                <PanelLeftClose className={iconStyle} />
              ) : (
                <PanelLeftOpen className={iconStyle} />
              )}
            </TooltipTrigger>
          </IconButton>
          <TooltipContent side="right" sideOffset={8}>
            <p className="text-xs">{panelStatus ? "Close Sidebar" : "Open Sidebar"}</p>
          </TooltipContent>
        </Tooltip>
        <LanguagesBar />
        <SettingDialog className={iconStyle} />
      </div>
    </div>
  );
};

export default HeaderControls;
