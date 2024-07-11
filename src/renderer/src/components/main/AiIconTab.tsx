import { Button } from "@/components/ui/button";
import DeeplIcon from "@/components/ui/icons/deeplIcon";
import ClaudeIcon from "../ui/icons/claudeIcon";
import { AISource } from "@shared/types";
import { ComponentProps } from "react";

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
      default:
        return undefined;
    }
  };

  return (
    <Button
      variant={variant}
      className="w-7 h-12 rounded-none rounded-tr-md rounded-br-md p-0"
      {...props}
    >
      {getIcon()}
    </Button>
  );
};
export default AiIconTab;
