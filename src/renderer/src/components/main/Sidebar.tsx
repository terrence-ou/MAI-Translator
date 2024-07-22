import { useAppSelector } from "@/hooks";
import { useMemo } from "react";
import HistoryCard from "./HistoryCard";

const SideBar = () => {
  const filePreview = useAppSelector((state) => state.files.filePreview);
  const fileDates = useMemo(() => {
    return Object.keys(filePreview).sort((a, b) => parseInt(b) - parseInt(a));
  }, [filePreview]);

  return (
    <div className="h-full px-6 pt-20 pb-8 overflow-y-auto">
      {fileDates.length === 0 && <p>No translation history</p>}
      {fileDates.map((key) => (
        <div key={key}>
          <p className="text-sm italic text-slate-400">{key}</p>
          <HistoryCard />
        </div>
      ))}
    </div>
  );
};

export default SideBar;
