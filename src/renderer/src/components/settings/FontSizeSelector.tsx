import { Input } from "@/components/ui/input";
import { ComponentProps } from "react";

import { useAppSelector, useAppDispatch } from "@/hooks";
import { RootState } from "@/store";
import { updateSettings } from "@/store/settingsSlice";

const FontSizeSelector = ({ className, ...props }: ComponentProps<"div">) => {
  const dispatch = useAppDispatch();
  const currFontSize = useAppSelector((state: RootState) => state.settings.editorFontSize);

  // Change the fontsize will trigger updating the redux store
  const handleUpdateFontSize = (newFontSize: string) => {
    dispatch(updateSettings({ editorFontSize: parseInt(newFontSize) }));
  };

  return (
    <div className={className} {...props}>
      <span className="text-sm">Editor Font Size</span>
      <div className="flex items-center gap-2">
        <Input
          className="w-[70px] h-[30px]"
          type="number"
          onChange={(event) => handleUpdateFontSize(event.target.value)}
          defaultValue={currFontSize}
        />
        <span>px</span>
      </div>
    </div>
  );
};

export default FontSizeSelector;
