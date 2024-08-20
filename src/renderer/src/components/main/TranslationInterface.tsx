import { ComponentProps, useRef, useState, useEffect } from "react";
import { AI_LIST } from "@shared/consts";
import { AISource } from "@shared/types";
import { cn } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setSourceText, getTranslations } from "@/store/translationConfigSlice";
import { saveRecord } from "@/store/filesSlice";
import TextField from "@/components/ui/TextField";
import AiIconTab from "@/components/main/AiIconTab";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, Eraser, Check, Loader2 } from "lucide-react";

// icon height constant
const iconHeight = 18;

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
  const sourceText = useAppSelector((state) => state.translationConfig.sourceText);
  const loading = useAppSelector((state) => state.translationConfig.loading);
  const translations = useAppSelector((state) => state.translationConfig.results.outputs);
  const saving = useAppSelector((state) => state.files.saving);
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
    navigator.clipboard.writeText(displayResult ? displayResult.text : "");
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
          defaultValue={sourceText}
          data-testid="textarea-source"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                disabled={loading}
                className="icon-button"
                onClick={handleClear}
                data-testid="button-erase"
              >
                <Eraser className="textfield-icon stroke-[1.5px]" height={iconHeight} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" sideOffset={4}>
              <p className="text-xs">Clear</p>
            </TooltipContent>
          </Tooltip>
          <Button
            variant="secondary"
            className="text-button"
            onClick={handleTranslate}
            disabled={loading}
            data-testid="button-translate"
          >
            {loading && <Loader2 className="animate-spin stroke-[1.5px]" height={18} />}
            {loading ? "Translating" : "Translate"}
          </Button>
        </TextField>
        {/* Translated text */}
        <TextField
          disabled={true}
          value={displayResult === undefined ? "The result will appear here" : displayResult.text}
          data-testid="textarea-result"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="icon-button"
                onClick={handleCopy}
                data-testid="button-copy"
              >
                {copied ? (
                  <Check className="textfield-icon stroke-[1.5px]" height={iconHeight} />
                ) : (
                  <Copy className="textfield-icon stroke-[1.5px]" height={iconHeight} />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" sideOffset={4}>
              <p className="text-xs">{copied ? "Copied" : "Copy"}</p>
            </TooltipContent>
          </Tooltip>
          <Button
            variant="secondary"
            className="text-button"
            onClick={handleSave}
            disabled={saving}
            data-testid="button-save-result"
          >
            {saving && <Loader2 className="animate-spin stroke-[1.5px]" height={18} />}
            {saving ? "Saving..." : "Save Result"}
          </Button>
        </TextField>
      </div>
      {/* AI source tabs */}
      <div className="flex flex-col pt-3 gap-[1px]" data-testid="main-aisources-tab">
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
