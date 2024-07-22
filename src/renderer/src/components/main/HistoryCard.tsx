import { ComponentProps } from "react";
import { Button } from "../ui/button";
import type { Record } from "@shared/types";

type HistoryCardProps = {
  records: Record[];
} & ComponentProps<"div">;

const HistoryCard = ({ records }: HistoryCardProps) => {
  return (
    <div className="flex flex-col gap-2 justify-start min-w-[150px] mt-1 mb-3">
      {records.map((record) => (
        <Button
          key={record.filename}
          variant="secondary"
          className="h-fit flex flex-col text-slate-700 dark:text-slate-300 whitespace-normal gap-1 hover:bg-primary-foreground p-2"
        >
          <span className="w-full text-left text-xs font-normal">
            from <span className="font-semibold">{record.from}</span> to{" "}
            <span className="font-semibold">{record.to}</span>
          </span>
          <span className="w-full text-left text-xs font-normal">
            {record.brief.slice(0, 35) + "..."}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default HistoryCard;
