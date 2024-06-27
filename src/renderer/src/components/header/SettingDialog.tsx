import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ThemeSelector from "../settings/ThemeSelector";
import FontSizeSelector from "../settings/FontSizeSelector";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";

type SettingDialogProps = { className: string };
const settingRowStyle = "flex justify-between items-center";

const SettingDialog = ({ className }: SettingDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger className="p-1 rounded-md hover:bg-border transition-colors duration-200">
        <Settings className={className} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>You can customize your interface here.</DialogDescription>
        </DialogHeader>
        {/* Settings */}
        <div className="flex flex-col gap-3.5 my-4 ">
          <ThemeSelector className={settingRowStyle} />
          <FontSizeSelector className={settingRowStyle} />
        </div>

        <DialogFooter>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingDialog;
