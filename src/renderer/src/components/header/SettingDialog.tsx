import { Settings } from "lucide-react";
import { RootState } from "@/store";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { writeModelConfigs } from "@/store/translationConfigSlice";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ThemeSelector from "@/components/settings/ThemeSelector";
import FontSizeSelector from "@/components/settings/FontSizeSelector";
import AISetting from "../settings/AISetting";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type SettingDialogProps = { className: string };
export type InputHandle = { getValue: () => string | undefined };
const settingRowStyle = "flex justify-between items-center";

/*
  The body of the Setting Dialog component
  The A dialog that allows users to customize interface or provide APIs
*/
const SettingDialog = ({ className }: SettingDialogProps) => {
  const dispatch = useAppDispatch();
  const modelConfigs = useAppSelector((state: RootState) => state.translationConfig.models);
  // handle save apis
  const handleSaveApis = () => {
    dispatch(writeModelConfigs(modelConfigs));
  };

  return (
    <Dialog>
      <DialogTrigger
        className="p-1 rounded-md hover:bg-border transition-colors duration-200"
        data-testid="button-settings"
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Settings className={className} />
          </TooltipTrigger>
          <TooltipContent side="left" sideOffset={8}>
            <p className="text-xs">Settings</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] sm:max-h-[80vh] overflow-auto"
        onOpenAutoFocus={(event) => event.preventDefault()}
        data-testid="dialog-window"
      >
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            You can customize your interface and provide APIs here.
          </DialogDescription>
        </DialogHeader>
        {/* Settings */}
        <div className="flex flex-col gap-3 my-4 ">
          {/* Interface Settings */}
          <h3 className="font-semibold">Interface</h3>
          <ThemeSelector className={settingRowStyle} data-testid="dialog-theme" />
          <FontSizeSelector className={settingRowStyle} data-testid="dialog-font" />
          <h3 className="font-semibold mt-3">AI Services</h3>
          {/* AI Service Settings */}
          {/*
          {aiInputRefs.map(({ source, defaultValue, ref }) => {
            return (
              <APIInput
                key={source}
                ref={ref}
                className={settingRowStyle}
                source={source}
                defaultValue={defaultValue}
              />
            );
          })}
            */}
          <Accordion type="single" collapsible>
            <AISetting
              aiProvider="DeepL"
              apiKey={modelConfigs.DeepL.key}
              currModel={modelConfigs.DeepL.model}
            />
            <AISetting
              aiProvider="Claude"
              apiKey={modelConfigs.Claude.key}
              currModel={modelConfigs.Claude.model}
            />
            <AISetting
              aiProvider="OpenAI"
              apiKey={modelConfigs.OpenAI.key}
              currModel={modelConfigs.OpenAI.model}
            />
          </Accordion>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleSaveApis} data-testid="dialog-save-btn">
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingDialog;
