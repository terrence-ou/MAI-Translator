import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";

type SettingDialogProps = { className: string };

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
        <DialogFooter>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingDialog;
