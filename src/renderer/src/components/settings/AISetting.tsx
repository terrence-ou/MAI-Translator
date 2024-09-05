import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DEEPL_MODELS, OPENAI_MODELS, CLAUDE_MODELS } from "@shared/consts";
import type { DeepLModels, CLaudeModels, OpenaiModels } from "@shared/types";

type AISettingProps = {
  aiProvider: "DeepL" | "Claude" | "OpenAI";
  apiKey: string;
  currModel: DeepLModels | CLaudeModels | OpenaiModels;
};

const modelCollection = { DeepL: DEEPL_MODELS, Claude: CLAUDE_MODELS, OpenAI: OPENAI_MODELS };

const AISetting = ({ aiProvider, apiKey, currModel }: AISettingProps) => {
  const models = modelCollection[aiProvider];
  return (
    <AccordionItem value={aiProvider} className="border-b border-dashed border-slate-200">
      <AccordionTrigger className="text-sm py-2">{aiProvider}</AccordionTrigger>
      <AccordionContent className="flex flex-col pl-1 text-sm">
        <div className="flex items-center justify-between h-9 pr-1">
          <p>api key</p>
          <Input
            className="w-[250px] h-[30px] focus-visible:ring-offset-0 text-xs"
            type="text"
            placeholder={`Paste your ${aiProvider} API here`}
            defaultValue={apiKey}
          />
        </div>
        <div className="flex items-center justify-between h-10 pr-1">
          <p>model</p>
          {/* Model selections */}
          <Select>
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
      </AccordionContent>
    </AccordionItem>
  );
};

export default AISetting;
