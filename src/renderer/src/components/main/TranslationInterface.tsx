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
  const handleSetSourceText = () => {
    if (sourceRef.current !== null) dispatch(setSourceText(sourceRef.current.value));
  };
  const handleTranslate = () => {
    dispatch(getDeepLFreeRes());
  };

  // Temp code
  const translations = useAppSelector((state) => state.translationConfig.results);
  const deepLResult = translations.filter(({ aiSource }) => aiSource === "DeepL")[0];

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex-1 flex gap-4">
        {/* Source text */}
        <TextField ref={sourceRef} onBlur={() => handleSetSourceText()}>
          <Button
            variant="secondary"
            className="h-8 hover:bg-foreground hover:text-background"
            onClick={handleTranslate}
            disabled={loading}
          >
            {loading ? "Translating..." : "Translate"}
          </Button>
        </TextField>
        {/* Translate text */}
        <TextField
          disabled={true}
          value={deepLResult === undefined ? "The result will appear here" : deepLResult.text}
        >
          <Button variant="secondary" className="h-8 hover:bg-foreground hover:text-background">
            Save Result
          </Button>
        </TextField>
      </div>
    </div>
  );
};

export default TranslationInterface;
