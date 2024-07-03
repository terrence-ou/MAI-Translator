import { ImperativePanelHandle } from "react-resizable-panels";
import { useEffect } from "react";

export const usePanelControl = (
  showPanel: boolean,
  panelRef: React.MutableRefObject<ImperativePanelHandle | null>,
  defaultSize: number
) => {
  useEffect(() => {
    if (panelRef === null) return;
    if (!showPanel) panelRef.current?.collapse();
    else panelRef.current?.expand(defaultSize);
  }, [showPanel, panelRef]);
};
