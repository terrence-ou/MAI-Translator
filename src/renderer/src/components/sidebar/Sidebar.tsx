import { useAppSelector } from "@/hooks";
import { useMemo } from "react";
import HistoryCard from "@/components/sidebar/HistoryCard";

const SideBar = () => {
  const filePreview = useAppSelector((state) => state.files.filePreview);
  const fileDates = useMemo(() => {
    return Object.keys(filePreview).sort((a, b) => parseInt(b) - parseInt(a));
  }, [filePreview]);
  return (
    <div className="h-full pt-16 pb-8" data-testid="sidebar">
      <div className="h-full mx-1 px-4 overflow-y-auto">
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
