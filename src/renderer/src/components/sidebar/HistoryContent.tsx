import { useState, useLayoutEffect } from "react";
import { useAppDispatch } from "@/hooks";
import { deleteFile } from "@/store/filesSlice";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Record } from "@shared/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const filenameToDate = (filename: string): string => {
  const year = filename.slice(0, 4);
  const month = filename.slice(4, 6);
  const date = filename.slice(6, 8);
  return `${year}-${month}-${date}`;
};

type HistoryContentProps = { filename: string | undefined };

/* The body of the HistoryContent component */
const HistoryContent = ({ filename }: HistoryContentProps) => {
  const [fileContent, setFileContent] = useState<Record | null>(null);
  const dispatch = useAppDispatch();
  const handleDeleteFile = (filename: string) => {
    dispatch(deleteFile(filename));
  };
  // using useLayoutEffect to make the content ready before component being rendered
  useLayoutEffect(() => {
    (async () => {
      const content = await window.context.getFileContent(filename!);
      setFileContent(content!);
    })();
  }, [filename]);

  // If filename not provided or file not existed, display the following content
  if (fileContent === null || filename === undefined) {
    return (
      <DialogContent className="min-w-[80%]" data-testid="modal-history-invalid">
        <DialogHeader>
          <DialogTitle>Translation Record</DialogTitle>
          <DialogDescription className="flex flex-col">Failed to load the file.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    );
  }
  // If the file exists, render out the content
  return (
    <DialogContent
      className="min-w-[70%] max-h-[93%] gap-3 transition-none"
      data-testid="modal-history-content"
    >
      {/* Header */}
      <DialogHeader>
        <DialogTitle>Translation Record</DialogTitle>
        <DialogDescription className="flex flex-col">
          {fileContent === null && "Failed to load the file, please check is the file exists"}
          {fileContent !== null && (
            <>
              <span className="italic">{`Date: ${filenameToDate(filename!)}`}</span>
              <span className="italic">{`From: ${fileContent.from.toUpperCase()} To: ${fileContent.to.toUpperCase()}`}</span>
            </>
          )}
        </DialogDescription>
      </DialogHeader>
      {/* Source text */}
      <div className="flex gap-4">
        <Textarea
          disabled={true}
          value={fileContent.source}
          className="flex-1 h-full resize-none"
        />
        {/* Translated contents displayed by ai source */}
        <Tabs
          defaultValue={fileContent.translations![0].aiSource}
          className="flex-1 flex flex-col-reverse gap-1"
        >
          <TabsList>
            {fileContent!.translations!.map(({ aiSource }) => (
              <TabsTrigger key={`tab-${aiSource}`} value={aiSource}>
                {aiSource}
              </TabsTrigger>
            ))}
          </TabsList>
          {fileContent!.translations!.map(({ aiSource, text }) => (
            <TabsContent key={`content-${aiSource}`} value={aiSource} className="mt-0">
              <Textarea disabled={true} value={text} className="h-[60dvh] resize-none" />
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <div className="w-full text-right">
        <Button
          variant="destructive"
          className="w-16 h-7"
          onClick={() => handleDeleteFile(filename)}
        >
          Delete
        </Button>
      </div>
    </DialogContent>
  );
};

export default HistoryContent;