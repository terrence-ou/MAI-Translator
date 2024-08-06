import { useAppSelector } from "@/hooks";
import { useMemo } from "react";
import HistoryCard from "@/components/sidebar/HistoryCard";
import Nav from "@/components/sidebar/Nav";
import { RootState } from "@/store";
import { cn } from "@/utils";

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
        showPanel ? "opacity-100 duration-150" : "opacity-0 duration-150a"
      )}
      data-testid="sidebar"
    >
      <Nav className="mx-5 flex flex-col gap-1 mb-5 pb-5 border-b border-b-primary/20" />
      <div className="mx-1 px-4 scroll-pb-10 overflow-y-auto">
        {fileDates.length === 0 && <p className="text-primary/40 italic">No translation history</p>}
        {fileDates.map((key) => (
          <div key={key}>
            <p className="text-xs italic text-slate-400 px-2">{`${key.slice(0, 4)}-${key.slice(4, 6)}-${key.slice(6)}`}</p>
            <HistoryCard records={filePreview[key]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
