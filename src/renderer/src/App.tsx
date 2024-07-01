import { useRef } from "react";
import { useAppSelector, useAppDispatch } from "./hooks";
import { collapsePanel } from "./store/settingsSlice";
import Header from "./components/header/Header";
import { ResizablePanel, ResizableHandle, ResizablePanelGroup } from "./components/ui/resizable";
import { ImperativePanelHandle } from "react-resizable-panels";

const panelConfig = {
  defaultSize: 25,
  maxSize: 35,
  minSize: 15,
  collapible: true,
};

function App(): JSX.Element {
  // useEffect(() => {
  //   window.context.readApis().then((data) => console.log(data));
  // }, []);
  const dispatch = useAppDispatch();

  // Control panel on/off using state
  const showPanel = useAppSelector((state) => state.settings.showPanel);
  const panelRef = useRef<ImperativePanelHandle | null>(null);
  if (panelRef !== null) {
    if (!showPanel) panelRef.current?.collapse();
    else panelRef.current?.expand(panelConfig.defaultSize);
  }

  // set the showPanel state to false when panel collapsed during resize
  const handleOnCollapse = () => {
    dispatch(collapsePanel());
  };

  return (
    <>
      <div className="h-screen flex flex-col">
        <Header className="bg-transparent h-header pl-24 pr-8 py-2" />
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            ref={panelRef}
            className="bg-muted"
            defaultSize={panelConfig.defaultSize}
            maxSize={panelConfig.maxSize}
            minSize={panelConfig.minSize}
            collapsible={panelConfig.collapible}
            onCollapse={handleOnCollapse}
          ></ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={100 - panelConfig.defaultSize}></ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}

export default App;
