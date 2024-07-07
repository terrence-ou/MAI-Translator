import { ComponentProps, useRef } from "react";
import { useAppDispatch } from "@/hooks";
import { setSourceText } from "@/store/translationConfigSlice";
import TextField from "./TextField";
import { Button } from "../ui/button";
import { cn } from "@/utils";

const TranslationInterface = ({ className }: ComponentProps<"div">) => {
  const dispatch = useAppDispatch();
  // Reference to the source textarea
  const sourceRef = useRef<HTMLTextAreaElement>(null);
  const handleSetSourceText = () => {
    if (sourceRef.current !== null) dispatch(setSourceText(sourceRef.current.value));
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex-1 flex gap-4">
        {/* Source text */}
        <TextField ref={sourceRef} onBlur={() => handleSetSourceText()}>
          <Button variant="secondary" className="h-8 hover:bg-foreground hover:text-background">
            Translate
          </Button>
        </TextField>
        {/* Translate text */}
        <TextField disabled={true} value={" This is a default content"} />
      </div>
    </div>
  );
};

export default TranslationInterface;
