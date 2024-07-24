import { useState, useLayoutEffect } from "react";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Record } from "@shared/types";

const filenameToDate = (filename: string): string => {
  const year = filename.slice(0, 4);
  const month = filename.slice(4, 6);
  const date = filename.slice(6, 8);
  return `${year}-${month}-${date}`;
};

type HistoryContentProps = { filename: string | undefined };

const HistoryContent = ({ filename }: HistoryContentProps) => {
  const [fileContent, setFileContent] = useState<Record | null>(null);

  useLayoutEffect(() => {
    // if (filename === undefined) return;
    (async () => {
      const content = await window.context.getFileContent(filename!);
      setFileContent(content!);
    })();
  }, []);

  return (
    <DialogContent className="min-w-[80%]">
      <DialogHeader>
        <DialogTitle>Translation History</DialogTitle>
        <DialogDescription>
          {fileContent === null && "Failed to load the file, please check is the file exists"}
          {fileContent !== null && (
            <div>
              <p>{`Date: ${filenameToDate(filename!)}`}</p>
              <p>{`From: ${fileContent.from.toUpperCase()} To: ${fileContent.to.toUpperCase()}`}</p>
            </div>
          )}
        </DialogDescription>
      </DialogHeader>
      <div>{/* <p>{fileContent!.source}</p> */}</div>
    </DialogContent>
  );
};

export default HistoryContent;
