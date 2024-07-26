import { ComponentProps, useRef, useState, useEffect } from "react";
import { AI_LIST } from "@shared/consts";
import { AISource } from "@shared/types";
import { cn } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setSourceText, getTranslations } from "@/store/translationConfigSlice";
import { saveRecord } from "@/store/filesSlice";
import TextField from "@/components/main/TextField";
import AiIconTab from "@/components/main/AiIconTab";
import { Button } from "@/components/ui/button";
import { Copy, Eraser, Check, Loader2 } from "lucide-react";

// constant styles for text filed buttons
const iconStyle =
  "stroke-[1.5px] text-slate-300 dark:text-slate-600 hover:text-primary dark:hover:text-primary transition duration-150";
const iconHeight = 18;
const iconButtonStyle = "p-0 h-7 bg-background hover:bg-background";
const textButtonStyle = "h-7 hover:bg-foreground hover:text-background";

/* The body of Translation Interface */
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
  const saving = useAppSelector((state) => state.files.saving);
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
  // handles file management
  const handleSave = () => {
    dispatch(saveRecord());
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    if (copied) {
      timerId = setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
    return () => (timerId ? clearTimeout(timerId!) : undefined);
  }, [copied]);

  return (
    <div className={cn("flex-1 flex gap-0", className)}>
      <div className="flex-1 flex gap-4">
        {/* Source text */}
        <TextField
          ref={sourceRef}
          onBlur={() => handleSetSourceText()}
          data-testid="textarea-source"
        >
          <Button
            variant="ghost"
            disabled={loading}
            className={iconButtonStyle}
            onClick={handleClear}
            data-testid="button-erase"
          >
            <Eraser className={iconStyle} height={iconHeight} />
          </Button>
          <Button
            variant="secondary"
            className={textButtonStyle}
            onClick={handleTranslate}
            disabled={loading}
            data-testid="button-translate"
          >
            {loading && <Loader2 className="animate-spin" />}
            {loading ? "Translating" : "Translate"}
          </Button>
        </TextField>
        {/* Translated text */}
        <TextField
          disabled={true}
          value={displayResult === undefined ? "The result will appear here" : displayResult.text}
          data-testid="textarea-result"
        >
          <Button
            variant="ghost"
            className={iconButtonStyle}
            onClick={handleCopy}
            data-testid="button-copy"
          >
            {copied ? (
              <Check className={iconStyle} height={iconHeight} />
            ) : (
              <Copy className={iconStyle} height={iconHeight} />
            )}
          </Button>
          <Button
            variant="secondary"
            className={textButtonStyle}
            onClick={handleSave}
            disabled={saving}
            data-testid="button-save-result"
          >
            {saving && <Loader2 className="animate-spin" />}
            {saving ? "Saving..." : "Save Result"}
          </Button>
        </TextField>
      </div>
      {/* AI source tabs */}
      <div className="flex flex-col pt-3" data-testid="main-aisources-tab">
        {AI_LIST.map((ai, i) => {
          const variant = ai === currAi ? "default" : "secondary";
          const active = ai === currAi;
          return (
            <AiIconTab
              key={ai}
              variant={variant}
              icon={ai}
              active={active}
              id={active ? "aisource-active" : undefined}
              data-testid={`aisource-${i}`}
              onClick={() => handleSetCurrAi(ai)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TranslationInterface;
