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

import ThemeSelector from "../settings/ThemeSelector";
import FontSizeSelector from "../settings/FontSizeSelector";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import APIInput from "../settings/APIInput";

type SettingDialogProps = { className: string };
const settingRowStyle = "flex justify-between items-center";

const SettingDialog = ({ className }: SettingDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger className="p-1 rounded-md hover:bg-border transition-colors duration-200">
        <Settings className={className} />
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] sm:max-h-[80vh] overflow-auto"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            You can customize your interface and provide APIs here.
          </DialogDescription>
        </DialogHeader>
        {/* Settings */}
        <div className="flex flex-col gap-3 my-4 ">
          <h3 className="font-semibold">Interface</h3>
          <ThemeSelector className={settingRowStyle} />
          <FontSizeSelector className={settingRowStyle} />
          <h3 className="font-semibold mt-3">APIs</h3>
          <APIInput className={settingRowStyle} APIName="DeepL" />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingDialog;
