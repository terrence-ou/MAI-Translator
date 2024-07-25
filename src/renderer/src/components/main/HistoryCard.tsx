import { ComponentProps, useMemo } from "react";
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

  return (
    <div className="flex flex-col gap-1 justify-start min-w-[150px] mt-2 mb-4">
      {sortedRecords.map((record) => {
        const { from, to, filename, brief } = record;
        // for the block-based languages, we display less characters in preview
        const sliceSize = from === "ZH" || from === "JP" || from === "KR" ? 50 : 90;
        return (
          <Dialog key={filename}>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="h-fit flex flex-col text-slate-700 dark:text-slate-300 whitespace-normal gap-1 hover:dark:bg-primary-foreground hover:bg-slate-300 p-2"
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
            <HistoryContent filename={filename} />
          </Dialog>
        );
      })}
    </div>
  );
};

export default HistoryCard;
