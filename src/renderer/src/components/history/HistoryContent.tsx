import { useState, useLayoutEffect, ComponentProps } from "react";
import { useAppSelector } from "@/hooks";
import type { Record } from "@shared/types";
import { useAppDispatch } from "@/hooks";
import { deleteFile } from "@/store/filesSlice";
import supportedLanguages from "@shared/languages";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const filenameToDate = (filename: string): string => {
  const year = filename.slice(0, 4);
  const month = filename.slice(4, 6);
  const date = filename.slice(6, 8);
  return `${year}-${month}-${date}`;
};

// The body of the HistoryContent component
const HistoryContent = ({ ...props }: ComponentProps<"div">) => {
  const [fileContent, setFileContent] = useState<Record | null>(null);
  const dispatch = useAppDispatch();
  const currFilename = useAppSelector((state) => state.settings.currentFilename);
  const fontSize = useAppSelector((state) => state.settings.editorFontSize);

  // using useLayoutEffect to make the content ready before component being rendered
  useLayoutEffect(() => {
    if (currFilename === undefined) return;
    (async () => {
      const content = await window.context.getFileContent(currFilename);
      setFileContent(content!);
    })();
  }, [currFilename]);

  const handleDeleteFile = (filename: string) => {
    dispatch(deleteFile(filename));
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
            The translation record is currently unvavilable.
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
            <Textarea
              disabled={true}
              value={fileContent.source}
              className="h-full resize-none disabled:cursor-text"
              style={{ fontSize: `${fontSize}px` }}
            />
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
                  <Textarea
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
