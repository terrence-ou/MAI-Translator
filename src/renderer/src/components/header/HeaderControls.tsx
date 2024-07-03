import { useAppSelector, useAppDispatch } from "@/hooks";
import { togglePanel } from "@/store/settingsSlice";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import IconButton from "@/components/header/IconButton";
import SettingDialog from "@/components/header/SettingDialog";

const iconStyle = "stroke-primary stroke-thin w-5 h-5";

const HeaderControls = () => {
  const dispatch = useAppDispatch();
  const panelStatus = useAppSelector((state) => state.settings.showPanel);

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex justify-between">
        <IconButton
          onClick={() => dispatch(togglePanel())}
          data-testid={panelStatus ? "button-panel-close" : "button-panel-open"}
        >
          {panelStatus ? (
            <PanelLeftClose className={iconStyle} />
          ) : (
            <PanelLeftOpen className={iconStyle} />
          )}
        </IconButton>
        <SettingDialog className={iconStyle} data-testid="button-settings" />
      </div>
    </div>
  );
};

export default HeaderControls;
