import { ComponentProps, useRef, useState, useEffect } from "react";
import { ImperativePanelHandle } from "react-resizable-panels";
import { useAppSelector, useAppDispatch, usePanelControl } from "@/hooks";
import { collapsePanel } from "@/store/settingsSlice";
import { RootState } from "@/store";
import LanguagesBar from "@/components/main/LanguagesBar";
import { ResizablePanel, ResizableHandle, ResizablePanelGroup } from "@/components/ui/resizable";

import { cn } from "@/utils";

// default main interface panel configurations
const panelConfig = {
  defaultSize: 25,
  maxSize: 35,
  minSize: 15,
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

  return (
    <div {...props}>
      <ResizablePanelGroup direction="horizontal">
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
        ></ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          id="panel-right"
          data-testid="panel-right"
          defaultSize={100 - panelConfig.defaultSize}
        >
          <div className="mt-16">
            <LanguagesBar />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Main;
