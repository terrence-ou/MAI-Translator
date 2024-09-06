import { useEffect } from "react";
import { useAppDispatch } from "@/hooks";
import { loadModelConfigs } from "@/store/translationConfigSlice";
import { loadFiles } from "@/store/filesSlice";
import Header from "@/components/header/Header";
import Main from "@/components/main/Main";
import { TooltipProvider } from "@/components/ui/tooltip";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  // load api from the internal file
  useEffect(() => {
    dispatch(loadModelConfigs());
    dispatch(loadFiles());
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <TooltipProvider delayDuration={100} skipDelayDuration={50}>
        {/* Header: sidebar button, dictionary button, settings button */}
        <Header className="bg-transparent h-header pl-24 pr-8 py-2" data-testid="header" />
        {/* Body: sidebar, translation interface */}
        <Main className="flex-1 max-h-[100%]" data-testid="main" />
      </TooltipProvider>
    </div>
  );
}

export default App;
