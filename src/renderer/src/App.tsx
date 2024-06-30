import { useRef, useEffect } from "react";
import Header from "./components/header/Header";
import { ResizablePanel, ResizableHandle, ResizablePanelGroup } from "./components/ui/resizable";
import { getPanelElement } from "react-resizable-panels";

const panelConfig = {
  defaultSize: 25,
  maxSize: 45,
  minSize: 15,
  collapible: true,
};

function App(): JSX.Element {
  // useEffect(() => {
  //   window.context.readSettings().then((data) => console.log(data));
  // }, []);
  const panelRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = getPanelElement("left-panel");
    panelRef.current = element;
  }, []);

  return (
    <>
      <div className="h-screen flex flex-col">
        <Header className="bg-transparent h-header pl-24 pr-8 py-2" />
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            className="bg-muted"
            id="left-panel"
            defaultSize={panelConfig.defaultSize}
            maxSize={panelConfig.maxSize}
            minSize={panelConfig.minSize}
            collapsible={panelConfig.collapible}
          >
            <h1 className="mt-header">The sidebar</h1>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={100 - panelConfig.defaultSize}>
            <h1 className="mt-header">The body of the translator app</h1>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
}

export default App;
