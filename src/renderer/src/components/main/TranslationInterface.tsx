import { ComponentProps, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setSourceText, getDeepLFreeRes } from "@/store/translationConfigSlice";
import TextField from "./TextField";
import { Button } from "../ui/button";
import { cn } from "@/utils";

const TranslationInterface = ({ className }: ComponentProps<"div">) => {
  const dispatch = useAppDispatch();
  const sourceRef = useRef<HTMLTextAreaElement>(null);
  const loading = useAppSelector((state) => state.translationConfig.loading);
  console.log(loading);
  const handleSetSourceText = () => {
    if (sourceRef.current !== null) dispatch(setSourceText(sourceRef.current.value));
  };
  const handleTranslate = () => {
    dispatch(getDeepLFreeRes());
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex-1 flex gap-4">
        {/* Source text */}
        <TextField ref={sourceRef} onBlur={() => handleSetSourceText()}>
          <Button
            variant="secondary"
            className="h-8 hover:bg-foreground hover:text-background"
            onClick={handleTranslate}
          >
            Translate
          </Button>
        </TextField>
        {/* Translate text */}
        <TextField disabled={true} value={"This is a default content"}>
          <Button variant="secondary" className="h-8 hover:bg-foreground hover:text-background">
            Save Result
          </Button>
        </TextField>
      </div>
    </div>
  );
};

export default TranslationInterface;
