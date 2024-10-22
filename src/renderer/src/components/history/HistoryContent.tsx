import { useState, useEffect, ComponentProps, useRef } from "react";
import { useAppSelector } from "@/hooks";
import type { Record } from "@shared/types";
import { useAppDispatch } from "@/hooks";
import { deleteFile } from "@/store/filesSlice";
import supportedLanguages from "@shared/languages";
import TextField from "@/components/ui/TextField";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AudioControl from "@/components/ui/AudioControl";

const filenameToDate = (filename: string): string => {
  const year = filename.slice(0, 4);
  const month = filename.slice(4, 6);
  const date = filename.slice(6, 8);
  return `${year}-${month}-${date}`;
};

// The body of the HistoryContent component
const HistoryContent = ({ ...props }: ComponentProps<"div">) => {
  const [fileContent, setFileContent] = useState<Record | null>(null);
  const [audioLoading, setAudioLoading] = useState<[boolean, boolean]>([false, false]);
  const [audioPlaying, setAudioPlaying] = useState<[boolean, boolean]>([false, false]);

  const dispatch = useAppDispatch();
  const currFilename = useAppSelector((state) => state.settings.currentFilename);
  const fontSize = useAppSelector((state) => state.settings.editorFontSize);
  const filePreview = useAppSelector((state) => state.files.filePreview);
  const { key, voice } = useAppSelector((state) => state.translationConfig.models.OpenAI);

  const audioValid = key !== undefined && key.length > 0;
  const hasFile = Object.keys(filePreview).length;
  const audioRef = useRef(new Audio());
  audioRef.current.addEventListener("ended", () => {
    setAudioPlaying([false, false]);
  });

  // Load content from the local file
  useEffect(() => {
    if (currFilename === undefined) return;
    (async () => {
      const content = await window.context.getFileContent(currFilename);
      setFileContent(content!);
    })();
  }, [currFilename]);

  // This side effects help stopping audio when switching content/tab
  useEffect(() => {
    const stopAudio = () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAudioLoading([false, false]);
      setAudioPlaying([false, false]);
    };
    stopAudio();
    return () => {
      // also stop the audio on unmount
      stopAudio();
    };
  }, [fileContent]);

  const handleDeleteFile = (filename: string) => {
    dispatch(deleteFile(filename));
  };

  // Control play/stop for the source text and result text
  const handleAudioControl = async (text: string, index: 0 | 1) => {
    if (audioLoading[index]) return;
    if (audioPlaying[1 - index] || audioLoading[1 - index] || audioPlaying[index]) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAudioPlaying([false, false]);
    } else {
      setAudioLoading((prevAudioLoading) => {
        const newAudioLoading = [...prevAudioLoading];
        newAudioLoading[1 - index] = false;
        newAudioLoading[index] = true;
        return newAudioLoading as [boolean, boolean];
      });
      const res = await window.context.textToSpeech(text, voice ? voice : "alloy");
      audioRef.current = new Audio(`data:audio/mp3;base64,${res}`);
      audioRef.current.volume = 0.3;
      audioRef.current.play();
      setAudioLoading([false, false]);
      setAudioPlaying((prevAudioPlaying) => {
        const newAudioPlaying = [...prevAudioPlaying];
        newAudioPlaying[1 - index] = false;
        newAudioPlaying[index] = true;
        return newAudioPlaying as [boolean, boolean];
      });
    }
  };

  // Parse from/to language
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
              className="h-full resize-none disabled:cursor-text disabled:opacity-60"
              style={{ fontSize: `${fontSize}px` }}
            >
              <AudioControl
                valid={audioValid}
                audioLoading={audioLoading[0]}
                audioPlaying={audioPlaying[0]}
                onClick={() => handleAudioControl(fileContent.source!, 0)}
              />
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
                    className="h-full resize-none disabled:cursor-text disabled:opacity-60"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    <AudioControl
                      valid={audioValid}
                      audioLoading={audioLoading[1]}
                      audioPlaying={audioPlaying[1]}
                      onClick={() => handleAudioControl(text, 1)}
                    />
                  </TextField>
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
