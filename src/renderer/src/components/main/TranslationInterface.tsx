import { ComponentProps, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setSourceText, getDeepLFreeRes } from "@/store/translationConfigSlice";
import TextField from "./TextField";
import AiIconTab from "./AiIconTab";
import { Button } from "../ui/button";
import { cn } from "@/utils";
import { AI_LIST } from "@shared/consts";
import { AISource } from "@shared/types";

const TranslationInterface = ({ className }: ComponentProps<"div">) => {
  // The currAi state controls the display of translation results
  const [currAi, setCurrAi] = useState<AISource>("DeepL");
  const handleSetCurrAi = (aiSource: AISource) => {
    setCurrAi(aiSource);
  };

  const dispatch = useAppDispatch();
  const sourceRef = useRef<HTMLTextAreaElement>(null);
  const loading = useAppSelector((state) => state.translationConfig.loading);
  // Set source text (input text)
  const handleSetSourceText = () => {
    if (sourceRef.current !== null) dispatch(setSourceText(sourceRef.current.value));
  };
  const handleTranslate = () => {
    dispatch(getDeepLFreeRes());
  };

  const translations = useAppSelector((state) => state.translationConfig.results);
  // TODO - use currAi state to control the translation result selections
  const deepLResult = translations.filter(({ aiSource }) => aiSource === "DeepL")[0];

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex-1 flex gap-0">
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
          {/* Translated text */}
          <TextField
            disabled={true}
            value={deepLResult === undefined ? "The result will appear here" : deepLResult.text}
          >
            <Button variant="secondary" className="h-8 hover:bg-foreground hover:text-background">
              Save Results
            </Button>
          </TextField>
        </div>
        {/* AI source tabs */}
        <div className="flex flex-col pt-3">
          {AI_LIST.map((ai) => {
            const variant = ai === currAi ? "default" : "secondary";
            const iconFill = ai === currAi ? "white" : "black";
            return (
              <AiIconTab
                key={ai}
                variant={variant}
                icon={ai}
                fill={iconFill}
                onClick={() => handleSetCurrAi(ai)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TranslationInterface;
