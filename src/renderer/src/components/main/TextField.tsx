import { ComponentProps } from "react";
import { Textarea } from "../ui/textarea";
import { cn } from "@/utils";
import { Button } from "../ui/button";

type TextFiledProps = { disabled?: boolean; content?: string } & ComponentProps<"div">;

const TextField = ({ className, disabled, content, ...props }: TextFiledProps) => {
  return (
    <div className={cn("h-full w-full", className)} {...props}>
      <Textarea
        className="h-full w-full resize-none text-base focus-visible:ring-offset-0 disabled:cursor-text"
        placeholder="Type your text here"
        defaultValue={content}
        disabled={disabled}
      />
      <div className="-translate-y-12 p-2">
        <Button variant="secondary" className="h-8 hover:bg-foreground hover:text-background">
          Translate
        </Button>
      </div>
    </div>
  );
};

export default TextField;
