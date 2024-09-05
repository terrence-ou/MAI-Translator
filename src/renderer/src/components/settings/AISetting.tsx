import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const AISetting = ({ aiProvider }: { aiProvider: "DeepL" | "Claude" | "OpenAI" }) => {
  return (
    <AccordionItem value={aiProvider} className="border-b border-dashed border-slate-200">
      <AccordionTrigger className="text-sm py-2">{aiProvider}</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-1 pl-1 text-sm">
        <div className="flex">
          <p>- api key</p>
          <input />
        </div>
        <div className="flex">
          <p>- model</p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AISetting;
