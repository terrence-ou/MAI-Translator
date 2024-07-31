import { ComponentProps, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Record } from "@shared/types";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import HistoryContent from "./HistoryContent";

type HistoryCardProps = {
  records: Record[];
} & ComponentProps<"div">;

/* The body of the HistoryCard content */
const HistoryCard = ({ records }: HistoryCardProps) => {
  let sortedRecords = [...records];
  // using useMemo to avoid sorting the array at every rendering
  sortedRecords = useMemo(
    () => sortedRecords.sort((a, b) => parseInt(b.filename!) - parseInt(a.filename!)),
    [records]
  );

  const [currFile, setCurrFile] = useState<string | undefined>(undefined);
  const [dialogState, setDialogState] = useState<false | undefined>(undefined);
  const handleSetCurrFile = (filename: string) => {
    setCurrFile(filename);
  };

  // Once a file been deleted, close the modal immediately then restore the modal's default status
  useEffect(() => {
    setDialogState(false);
    const timerId = setTimeout(() => setDialogState(undefined), 500);
    return () => clearTimeout(timerId);
  }, [records]);

  return (
    <div className="flex flex-col gap-1 justify-start min-w-[150px] mt-2 mb-4">
      <Dialog open={dialogState}>
        {sortedRecords.map((record) => {
          const { from, to, filename, brief } = record;
          // for the block-based languages, we display less characters in preview
          const sliceSize = from === "ZH" || from === "JP" || from === "KR" ? 50 : 90;
          return (
            <DialogTrigger asChild key={filename}>
              <Button
                variant="secondary"
                className="h-fit flex flex-col text-slate-700 dark:text-slate-300 whitespace-normal gap-1 hover:dark:bg-primary-foreground hover:bg-slate-300 p-2"
                onClick={() => handleSetCurrFile(filename!)}
              >
                <span className="w-full text-left text-xs font-normal">
                  from <span className="font-semibold">{from}</span> to{" "}
                  <span className="font-semibold">{to}</span>
                </span>
                <span className="w-full text-left text-xs font-normal">
                  {brief!.slice(0, sliceSize) + "..."}
                </span>
              </Button>
            </DialogTrigger>
          );
        })}
        {currFile && <HistoryContent filename={currFile} />}
      </Dialog>
    </div>
  );
};

export default HistoryCard;
