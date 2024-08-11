import { useMemo } from "react";
import { RootState } from "@/store";
import { useAppSelector } from "@/hooks";
import { cn } from "@/utils";
import { ChevronsUpDown } from "lucide-react";
import HistoryCards from "@/components/sidebar/HistoryCards";
import Nav from "@/components/sidebar/Nav";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const SideBar = () => {
  const filePreview = useAppSelector((state: RootState) => state.files.filePreview);
  const showPanel = useAppSelector((state: RootState) => state.settings.showPanel);
  const fileDates = useMemo(() => {
    return Object.keys(filePreview).sort((a, b) => parseInt(b) - parseInt(a));
  }, [filePreview]);
  return (
    <div
      className={cn(
        "h-full flex flex-col pt-[4.5rem] pb-8",
        showPanel ? "opacity-100 duration-50" : "opacity-0 duration-50"
      )}
      data-testid="sidebar"
    >
      <Nav className="mx-5 flex flex-col gap-1 mb-5 pb-5 border-b border-b-primary/20" />
      <div className="mx-1 px-4 scroll-pb-10 overflow-y-auto">
        {fileDates.length === 0 && <p className="text-primary/40 italic">No translation history</p>}
        {fileDates.map((key, index) => (
          <div key={key} className="mb-1">
            <Collapsible defaultOpen={index < 2}>
              <CollapsibleTrigger className="w-full flex justify-between items-center h-5 hover:dark:bg-primary-foreground hover:bg-slate-300 rounded-sm group">
                <p className="text-xs text-slate-400 px-2 group-hover:underline group-hover:text-primary">
                  {`${key.slice(0, 4)}-${key.slice(4, 6)}-${key.slice(6)}`}
                </p>
                <ChevronsUpDown
                  strokeWidth={2}
                  height={14}
                  className="stroke-primary group-hover:visible invisible"
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <HistoryCards records={filePreview[key]} />
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
