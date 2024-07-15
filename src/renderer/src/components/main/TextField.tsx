import { ComponentProps, forwardRef, MutableRefObject } from "react";
import { useAppSelector } from "@/hooks";
import { Textarea } from "../ui/textarea";

type TextFiledProps = { disabled?: boolean; content?: string } & ComponentProps<"textarea">;

// The body of TextField, forwarding the textare ref to the textarea
const TextField = forwardRef<HTMLTextAreaElement, TextFiledProps>(function TextField(
  { disabled, content, children, ...props },
  ref
) {
  // read fontsize from the redux store
  const fontSize = useAppSelector((state) => state.settings.editorFontSize);
  return (
    <div className="h-full w-full">
      <Textarea
        ref={ref}
        className="h-full w-full resize-none focus-visible:ring-offset-0 disabled:cursor-text text-[20px] pb-12"
        placeholder="Type your text here"
        defaultValue={content}
        disabled={disabled}
        // tailwind does not support template literal, so we use style attribute
        style={{ fontSize: `${fontSize}px` }}
        {...props}
      />
      <div className="-translate-y-12 box-border py-2 px-4 flex justify-end items-center gap-2">
        {children}
      </div>
    </div>
  );
});

export default TextField;
