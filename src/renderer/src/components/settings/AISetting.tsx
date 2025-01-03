import {
  updateDeepLConfig,
  updateClaudeConfig,
  updateOpenaiConfig,
} from "@/store/translationConfigSlice";
import { useAppDispatch } from "@/hooks";
import { DEEPL_MODELS, OPENAI_MODELS, CLAUDE_MODELS, OPENAI_TTS_VOICES } from "@shared/consts";
import type { DeepLModels, ClaudeModels, OpenaiModels, OpenaiTTSVoices } from "@shared/types";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type AISettingProps = {
  aiProvider: "DeepL" | "Claude" | "OpenAI";
  apiKey: string;
  currModel: DeepLModels | ClaudeModels | OpenaiModels;
  currVoice?: OpenaiTTSVoices;
};

const modelCollection = { DeepL: DEEPL_MODELS, Claude: CLAUDE_MODELS, OpenAI: OPENAI_MODELS };

const AISetting = ({ aiProvider, apiKey, currModel, currVoice }: AISettingProps) => {
  const models = modelCollection[aiProvider];
  const dispatch = useAppDispatch();

  const handleChangeKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value;
    switch (aiProvider) {
      case "DeepL":
        dispatch(updateDeepLConfig({ key, model: currModel as DeepLModels }));
        break;
      case "Claude":
        dispatch(updateClaudeConfig({ key, model: currModel as ClaudeModels }));
        break;
      case "OpenAI":
        dispatch(
          updateOpenaiConfig({
            key,
            model: currModel as OpenaiModels,
            voice: currVoice as OpenaiTTSVoices,
          })
        );
    }
  };

  const handleChangeModel = (model: string) => {
    switch (aiProvider) {
      case "DeepL":
        dispatch(updateDeepLConfig({ key: apiKey, model: model as DeepLModels }));
        break;
      case "Claude":
        dispatch(updateClaudeConfig({ key: apiKey, model: model as ClaudeModels }));
        break;
      case "OpenAI":
        dispatch(updateOpenaiConfig({ key: apiKey, model: model as OpenaiModels }));
    }
  };

  const handleChangeVoice = (voice: string) => {
    dispatch(
      updateOpenaiConfig({
        key: apiKey,
        model: currModel as OpenaiModels,
        voice: voice as OpenaiTTSVoices,
      })
    );
  };

  return (
    <AccordionItem
      value={aiProvider}
      className="border-b border-dashed border-slate-200 dark:border-slate-700"
      data-testid={`ai-settings-${aiProvider.toLowerCase()}`}
    >
      <AccordionTrigger className="text-sm py-2">{aiProvider}</AccordionTrigger>
      <AccordionContent className="flex flex-col pl-2 text-sm">
        <div className="flex items-center justify-between h-9 pr-1">
          <p>api key</p>
          <Input
            className="w-[250px] h-[30px] focus-visible:ring-offset-0 text-xs"
            type="text"
            placeholder={`Paste your ${aiProvider} API here`}
            defaultValue={"*".repeat(apiKey.length)}
            onBlur={(event) => handleChangeKey(event)}
          />
        </div>
        <div className="flex items-center justify-between h-10 pr-1">
          <p>model</p>
          {/* Model selections */}
          <Select
            onValueChange={(value) => {
              handleChangeModel(value);
            }}
          >
            <SelectTrigger className="w-[250px] h-[30px] text-xs focus:ring-offset-0">
              <SelectValue placeholder={currModel} />
            </SelectTrigger>
            <SelectContent className="focus-visible:ring-offset-0">
              {models.map((model) => {
                return (
                  <SelectItem key={`model-setting-${model}`} value={model} className="text-xs">
                    {model}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        {/* Voice Selection, only available for OpenAI TTS */}
        {aiProvider === "OpenAI" && (
          <div className="flex items-center justify-between h-10 pr-1">
            <p>voice</p>
            {/* Model selections */}
            <Select
              onValueChange={(value) => {
                handleChangeVoice(value);
              }}
            >
              <SelectTrigger className="w-[250px] h-[30px] text-xs focus:ring-offset-0">
                <SelectValue placeholder={currVoice ? currVoice : "alloy"} />
              </SelectTrigger>
              <SelectContent className="focus-visible:ring-offset-0">
                {OPENAI_TTS_VOICES.map((voice) => {
                  return (
                    <SelectItem key={`model-setting-${voice}`} value={voice} className="text-xs">
                      {voice}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default AISetting;
