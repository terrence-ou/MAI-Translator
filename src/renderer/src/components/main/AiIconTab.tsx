import { Button } from "@/components/ui/button";
import DeeplIcon from "@/components/ui/icons/deeplIcon";
import ClaudeIcon from "../ui/icons/claudeIcon";
import { AISource } from "@shared/types";
import { ComponentProps } from "react";

type AiIconTabProps = {
  variant: "default" | "outline" | "secondary" | "ghost" | undefined;
  icon: AISource;
  fill: "white" | "black";
} & ComponentProps<"button">;

/* The body of AiIconTab component */
const AiIconTab = ({ variant, icon, fill, ...props }: AiIconTabProps) => {
  const getIcon = () => {
    switch (icon) {
      case "DeepL":
        return <DeeplIcon fill={fill} />;
      case "Claude":
        return <ClaudeIcon fill={fill} />;
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
