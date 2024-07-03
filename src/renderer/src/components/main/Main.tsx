import { ComponentProps, useRef } from "react";
import { useAppSelector, useAppDispatch, usePanelControl } from "@/hooks";
import { collapsePanel } from "@/store/settingsSlice";
import { ImperativePanelHandle } from "react-resizable-panels";
import { ResizablePanel, ResizableHandle, ResizablePanelGroup } from "@/components/ui/resizable";
import { RootState } from "@/store";

// default main interface panel configurations
const panelConfig = {
  defaultSize: 25,
  maxSize: 35,
  minSize: 15,
  collapible: true,
};
const Main = ({ ...props }: ComponentProps<"div">) => {
  // Control panel on/off using state
  const dispatch = useAppDispatch();
  const showPanel = useAppSelector((state: RootState) => state.settings.showPanel)!;
  const panelRef = useRef<ImperativePanelHandle>(null);
  usePanelControl(showPanel, panelRef, panelConfig.defaultSize);

  // set the showPanel state to false when panel collapsed during resize
  const handleOnCollapse = () => {
    dispatch(collapsePanel());
  };

  return (
    <div {...props}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          ref={panelRef}
          className="bg-muted"
          data-testid="panel-left"
          defaultSize={panelConfig.defaultSize}
          maxSize={panelConfig.maxSize}
          minSize={panelConfig.minSize}
          collapsible={panelConfig.collapible}
          onCollapse={handleOnCollapse}
        ></ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          data-testid="panel-right"
          defaultSize={100 - panelConfig.defaultSize}
        ></ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Main;
