import { Button } from "@/components/ui/button";
import { Loader2, CircleStop, Volume1 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type AudioControlProps = {
  audioLoading: boolean;
  audioPlaying: boolean;
  valid: boolean; // invalid if openai key is not provided
  onClick: () => void;
};

const AudioControl = ({ audioLoading, audioPlaying, valid, onClick }: AudioControlProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className={"icon-button w-8 -translate-x-1 translate-y-1"}
          onClick={valid ? onClick : () => {}}
        >
          {audioLoading ? (
            <Loader2 className="animate-spin stroke-[1.5px]" height={20} />
          ) : audioPlaying ? (
            <CircleStop className="textfield-icon stroke-[1.3px]" height={22} />
          ) : (
            <Volume1 className="textfield-icon stroke-[1.3px]" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left" sideOffset={4}>
        {valid && (
          <p className="text-xs">{audioLoading ? "Loading" : audioPlaying ? "Stop" : "Play"}</p>
        )}
        {!valid && <p className="text-xs">OpenAI key required</p>}
      </TooltipContent>
    </Tooltip>
  );
};

export default AudioControl;
