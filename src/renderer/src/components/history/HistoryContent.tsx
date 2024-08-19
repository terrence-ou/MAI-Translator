import { useState, useEffect, ComponentProps, useRef } from "react";
import { useAppSelector } from "@/hooks";
import type { Record } from "@shared/types";
import { useAppDispatch } from "@/hooks";
import { deleteFile } from "@/store/filesSlice";
import supportedLanguages from "@shared/languages";
import TextField from "@/components/ui/TextField";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CircleStop, Loader2, Volume1 } from "lucide-react";
import { cn } from "@/utils";

const filenameToDate = (filename: string): string => {
  const year = filename.slice(0, 4);
  const month = filename.slice(4, 6);
  const date = filename.slice(6, 8);
  return `${year}-${month}-${date}`;
};

// The body of the HistoryContent component
const HistoryContent = ({ ...props }: ComponentProps<"div">) => {
  const [fileContent, setFileContent] = useState<Record | null>(null);
  const [audioLoading, setAudioLoading] = useState<boolean>(false);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const currFilename = useAppSelector((state) => state.settings.currentFilename);
  const fontSize = useAppSelector((state) => state.settings.editorFontSize);
  const filePreview = useAppSelector((state) => state.files.filePreview);
  const hasFile = Object.keys(filePreview).length;
  const audioRef = useRef(new Audio());
  audioRef.current.addEventListener("ended", () => {
    setAudioPlaying(false);
  });

  // Load content from the local file
  useEffect(() => {
    if (currFilename === undefined) return;
    (async () => {
      const content = await window.context.getFileContent(currFilename);
      setFileContent(content!);
    })();
  }, [currFilename]);

  // This side effect helps stopping audio when switching tab
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setAudioLoading(false);
  }, [fileContent]);

  const handleDeleteFile = (filename: string) => {
    dispatch(deleteFile(filename));
  };

  const handlePlaySpeech = async (text: string) => {
    if (audioPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAudioPlaying(false);
    } else {
      setAudioLoading(true);
      const res = await window.context.textToSpeech(text);
      audioRef.current = new Audio(`data:audio/mp3;base64,${res}`);
      audioRef.current.play();
      setAudioLoading(false);
      setAudioPlaying(true);
    }
  };

  const fromLan = supportedLanguages.filter((language) => {
    if (!fileContent) return undefined;
    return language.value === fileContent.from.toLowerCase();
  });

  const toLan = supportedLanguages.filter((language) => {
    if (!fileContent) return undefined;
    return language.value === fileContent.to.toLowerCase();
  });

  return (
    <div {...props}>
      {currFilename === undefined && (
        <div className="h-full flex justify-center items-center">
          <p className="text-center text-xl italic text-primary/40">
            {hasFile ? "Please select a translation record." : "No translation history available"}
          </p>
        </div>
      )}
      {currFilename && fileContent && (
        <div className="h-full flex flex-col">
          <div className="flex mt-1 mb-3 gap-4 px-2 text-sm text-primary/70 font-normal">
            <p>
              Date: <span>{filenameToDate(currFilename)}</span>
            </p>
            <p>
              From:{" "}
              <span className="font-bold">{fromLan ? fromLan[0].label : "Failed to detect"}</span>
            </p>
            <p>
              To: <span className="font-bold">{toLan ? toLan[0].label : "Failed to detect"}</span>
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            {/* Source text */}
            <TextField
              disabled={true}
              value={fileContent.source}
              className="h-full resize-none disabled:cursor-text"
              style={{ fontSize: `${fontSize}px` }}
            >
              <Button
                variant="ghost"
                className={cn("icon-button", "w-8 -translate-x-1 translate-y-1")}
                onClick={() => handlePlaySpeech(fileContent.source!)}
              >
                {audioLoading ? (
                  <Loader2 className="animate-spin" />
                ) : audioPlaying ? (
                  <CircleStop className="textfield-icon" />
                ) : (
                  <Volume1 className="textfield-icon" />
                )}
              </Button>
            </TextField>
            {/* Translated contents displayed by ai source */}
            <Tabs
              defaultValue={fileContent.translations![0].aiSource}
              className="flex flex-col-reverse h-full gap-2"
            >
              <TabsList>
                {fileContent!.translations!.map(({ aiSource }) => (
                  <TabsTrigger key={`tab-${aiSource}`} value={aiSource}>
                    {aiSource}
                  </TabsTrigger>
                ))}
              </TabsList>
              {fileContent!.translations!.map(({ aiSource, text }) => (
                <TabsContent key={`content-${aiSource}`} value={aiSource} className="mt-0 flex-1">
                  <TextField
                    disabled={true}
                    value={text}
                    className="h-full resize-none disabled:cursor-text"
                    style={{ fontSize: `${fontSize}px` }}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
          <div className="w-full text-right mt-2">
            <Button
              variant="destructive"
              className="w-16 h-7"
              onClick={() => handleDeleteFile(currFilename)}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryContent;
