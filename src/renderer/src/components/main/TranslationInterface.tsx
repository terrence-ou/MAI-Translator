import { ComponentProps, useRef, useState, useEffect } from "react";
import { AI_LIST } from "@shared/consts";
import { AISource } from "@shared/types";
import { cn } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setSourceText, getTranslations } from "@/store/translationConfigSlice";
import TextField from "@/components/main/TextField";
import AiIconTab from "@/components/main/AiIconTab";
import { Button } from "@/components/ui/button";
import { Copy, Eraser, Check, Loader2 } from "lucide-react";

// constant styles for text filed buttons
const iconStyle = "stroke-[1.5px] text-slate-300 hover:text-primary transition duration-150";
const iconHeight = 18;
const iconButtonStyle = "p-0 hover:bg-transparent h-5";
const textButtonStyle = "h-7 hover:bg-foreground hover:text-background";

const TranslationInterface = ({ className }: ComponentProps<"div">) => {
  // The currAi state controls the display of translation results
  const [currAi, setCurrAi] = useState<AISource>("DeepL");
  const [copied, setCopied] = useState<boolean>(false);
  const handleSetCurrAi = (aiSource: AISource) => {
    setCurrAi(aiSource);
  };

  const dispatch = useAppDispatch();
  const sourceRef = useRef<HTMLTextAreaElement>(null);
  const loading = useAppSelector((state) => state.translationConfig.loading);
  const translations = useAppSelector((state) => state.translationConfig.results.outputs);
  const displayResult = translations.filter(({ aiSource }) => aiSource === currAi)[0];

  // Set source text (input text)
  const handleSetSourceText = () => {
    if (sourceRef.current !== null) dispatch(setSourceText(sourceRef.current.value));
  };
  const handleTranslate = () => {
    dispatch(getTranslations());
  };
  // handles icon button clicks
  const handleCopy = () => {
    if (displayResult) navigator.clipboard.writeText(displayResult.text);
    setCopied(true);
  };
  const handleClear = () => {
    if (sourceRef.current !== null) {
      sourceRef.current!.value = "";
    }
  };

  useEffect(() => {
    if (copied) {
      let timerId: NodeJS.Timeout | null = null;
      timerId = setTimeout(() => {
        setCopied(false);
        return () => clearTimeout(timerId!);
      }, 1000);
    }
  }, [copied]);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex-1 flex gap-0">
        <div className="flex-1 flex gap-4">
          {/* Source text */}
          <TextField ref={sourceRef} onBlur={() => handleSetSourceText()}>
            <Button
              variant="ghost"
              disabled={loading}
              className={iconButtonStyle}
              onClick={handleClear}
            >
              <Eraser className={iconStyle} height={iconHeight} />
            </Button>
            <Button
              variant="secondary"
              className={textButtonStyle}
              onClick={handleTranslate}
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin" />}
              {loading ? "Translating" : "Translate"}
            </Button>
          </TextField>
          {/* Translated text */}
          <TextField
            disabled={true}
            value={displayResult === undefined ? "The result will appear here" : displayResult.text}
          >
            <Button variant="ghost" className={iconButtonStyle} onClick={handleCopy}>
              {copied ? (
                <Check className={iconStyle} height={iconHeight} />
              ) : (
                <Copy className={iconStyle} height={iconHeight} />
              )}
            </Button>
            <Button variant="secondary" className={textButtonStyle}>
              Save Results
            </Button>
          </TextField>
        </div>
        {/* AI source tabs */}
        <div className="flex flex-col pt-3">
          {AI_LIST.map((ai) => {
            const variant = ai === currAi ? "default" : "secondary";
            const active = ai === currAi;
            return (
              <AiIconTab
                key={ai}
                variant={variant}
                icon={ai}
                active={active}
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
