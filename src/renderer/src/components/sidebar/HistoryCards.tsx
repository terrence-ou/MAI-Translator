import { ComponentProps, useMemo } from "react";
import { cn } from "@/utils";
import { setCurrFilename, route } from "@/store/settingsSlice";
import { deleteFile } from "@/store/filesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import type { Record } from "@shared/types";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

type HistoryCardProps = {
  records: Record[];
} & ComponentProps<"div">;

/* The body of the HistoryCard content */
const HistoryCards = ({ records }: HistoryCardProps) => {
  let sortedRecords = [...records];
  const dispatch = useAppDispatch();
  // using useMemo to avoid sorting the array at every rendering
  sortedRecords = useMemo(
    () => sortedRecords.sort((a, b) => parseInt(b.filename!) - parseInt(a.filename!)),
    [records]
  );
  const handleSetCurrFilename = (filename: string | undefined) => {
    dispatch(route("history"));
    dispatch(setCurrFilename(filename));
  };
  const selectedFilename = useAppSelector((state) => state.settings.currentFilename);

  const handleDeleteFile = async (filename: string) => {
    await dispatch(deleteFile(filename));
    dispatch(setCurrFilename(undefined)); // only reset the current file name when the file is been removed
  };

  return (
    <div className="flex flex-col gap-1 justify-start min-w-[150px] mb-4">
      {sortedRecords.map((record) => {
        const { from, to, filename, brief } = record;
        const sliceSize = from === "ZH" || from === "JA" || from === "KR" ? 50 : 90;
        return (
          <ContextMenu key={filename}>
            <ContextMenuTrigger>
              <Button
                variant="secondary"
                className={cn(
                  "h-fit flex flex-col w-full text-slate-700 dark:text-slate-300 whitespace-normal gap-1 hover:dark:bg-primary-foreground hover:bg-slate-300 p-2 focus-visible:ring-0 focus-visible:ring-offset-0",
                  selectedFilename === filename ? "bg-slate-200 dark:bg-primary-foreground/50" : ""
                )}
                onClick={() => handleSetCurrFilename(filename)}
                draggable={true}
                onDragStart={(event) => {
                  event.preventDefault();
                  window.context.onDragStart(filename!);
                }}
              >
                <span className="w-full text-left text-xs font-normal">
                  from <span className="font-semibold">{from}</span> to{" "}
                  <span className="font-semibold">{to}</span>
                </span>
                <span className="w-full text-left text-xs font-normal">
                  {brief!.slice(0, sliceSize) + "..."}
                </span>
              </Button>
              <ContextMenuContent className="flex flex-col gap-1 dark:bg-muted shadow-menu-light dark:shadow-menu-dark">
                <ContextMenuItem
                  className="py-1 hover:cursor-pointer dark:hover:bg-background/50 duration-150"
                  onClick={() => window.context.saveAsFile(filename!)}
                >
                  Save as...
                </ContextMenuItem>
                <ContextMenuItem
                  className="py-1 hover:cursor-pointer text-[#EF4444] hover:!text-destructive dark:hover:!text-[#EF4444] dark:hover:bg-background/50 duration-150"
                  onClick={() => {
                    handleDeleteFile(filename!);
                  }}
                >
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenuTrigger>
          </ContextMenu>
        );
      })}
    </div>
  );
};

export default HistoryCards;
