import { useEffect } from "react";
import { useAppDispatch } from "@/hooks";
import { loadApis } from "@/store/translationConfigSlice";
import Header from "@/components/header/Header";
import Main from "@/components/main/Main";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  // load api from the internal file
  useEffect(() => {
    dispatch(loadApis());
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Header: sidebar button, dictionary button, settings button */}
      <Header className="bg-transparent h-header pl-24 pr-8 py-2" data-testid="header" />
      {/* Body: sidebar, translation interface */}
      <Main className="flex-1" data-testid="main" />
    </div>
  );
}

export default App;
