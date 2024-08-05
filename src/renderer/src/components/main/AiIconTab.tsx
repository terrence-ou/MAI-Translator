import { Button } from "@/components/ui/button";
import { AISource } from "@shared/types";
import { ComponentProps } from "react";
import DeeplIcon from "@/components/ui/icons/deeplIcon";
import ClaudeIcon from "../ui/icons/claudeIcon";
import OpenaiIcon from "../ui/icons/openaiIcon";

type AiIconTabProps = {
  variant: "default" | "outline" | "secondary" | "ghost" | undefined;
  icon: AISource;
  active?: boolean;
} & ComponentProps<"button">;

/* The body of AiIconTab component */
const AiIconTab = ({ variant, icon, active, ...props }: AiIconTabProps) => {
  const fillStyle = active ? "fill-white dark:fill-black" : "fill-black dark:fill-white";
  const getIcon = () => {
    switch (icon) {
      case "DeepL":
        return <DeeplIcon className={fillStyle} />;
      case "Claude":
        return <ClaudeIcon className={fillStyle} />;
      case "OpenAI":
        return <OpenaiIcon className={fillStyle} />;
      default:
        return undefined;
    }
  };

  return (
    <Button
      variant={variant}
      className="w-7 h-12 rounded-none rounded-tr-md rounded-br-md p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      {...props}
    >
      {getIcon()}
    </Button>
  );
};
export default AiIconTab;
