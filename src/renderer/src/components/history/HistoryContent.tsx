import { ComponentProps } from "react";
import { useAppSelector } from "@/hooks";

const HistoryContent = ({ ...props }: ComponentProps<"div">) => {
  const currHistIdx = useAppSelector((state) => state.settings.currentFilename);
  return (
    <div {...props}>
      {currHistIdx === undefined && (
        <div className="h-full flex justify-center items-center">
          <p className="text-center text-xl italic text-primary/40">
            The translation record is currently unvavilable.
          </p>
        </div>
      )}
    </div>
  );
};

export default HistoryContent;
