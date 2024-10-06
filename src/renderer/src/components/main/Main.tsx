import { ComponentProps, useRef, useState, useEffect } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { useAppSelector, useAppDispatch, usePanelControl } from "@/hooks";
import { collapsePanel } from "@/store/settingsSlice";
import { RootState } from "@/store";
import { ResizablePanel, ResizableHandle, ResizablePanelGroup } from "@/components/ui/resizable";

import { cn } from "@/utils";
import TranslationInterface from "@/components/main/TranslationInterface";
import SideBar from "@/components/sidebar/Sidebar";
import HistoryContent from "../history/HistoryContent";

// default main interface panel configurations
const panelConfig = {
  defaultSize: 25,
  maxSize: 25,
  minSize: 18,
  collapible: true,
};
const Main = ({ ...props }: ComponentProps<"div">) => {
  // handle sidebar closing/exapnding animation
  const [sliding, setSliding] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (sliding) {
      timeoutId = setTimeout(() => setSliding(false), 200);
    }
    return timeoutId === null
      ? () => {}
      : () => {
          clearTimeout(timeoutId);
        };
  }, [sliding]);

  // Control panel on/off using state
  const dispatch = useAppDispatch();
  const currentRoute = useAppSelector((state: RootState) => state.settings.currentRoute);
  const showPanel = useAppSelector((state: RootState) => state.settings.showPanel)!;
  const panelRef = useRef<ImperativePanelHandle>(null);
  usePanelControl(showPanel, panelRef, panelConfig.defaultSize);

  // set the showPanel state to false when panel collapsed during resize
  const handleOnCollapse = () => {
    dispatch(collapsePanel());
    setSliding(true);
  };
  // Trigger transition when expanding
  const handleOnExpand = () => {
    setSliding(true);
  };

  // The style for the main interface
  const mainInterfaceStyle = "box-border pt-16 pb-8 px-5 h-full";

  return (
    <div {...props}>
      <ResizablePanelGroup direction="horizontal">
        {/* left panel, tranlation history */}
        <ResizablePanel
          ref={panelRef}
          id="panel-left"
          className={cn("bg-muted", sliding ? "duration-150" : "")}
          data-testid="panel-left"
          defaultSize={panelConfig.defaultSize}
          maxSize={panelConfig.maxSize}
          minSize={panelConfig.minSize}
          collapsible={panelConfig.collapible}
          onCollapse={handleOnCollapse}
          onExpand={handleOnExpand}
        >
          <SideBar />
        </ResizablePanel>
        <ResizableHandle />
        {/* right panel, translation interface */}
        <ResizablePanel
          id="panel-right"
          data-testid="panel-right"
          defaultSize={100 - panelConfig.defaultSize}
        >
          {currentRoute === "main" && <TranslationInterface className={mainInterfaceStyle} />}
          {currentRoute === "history" && <HistoryContent className={mainInterfaceStyle} />}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Main;
