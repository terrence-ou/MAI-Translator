import { useEffect } from "react";
import Header from "./components/header/Header";
// import { editorSettingsType } from "@shared/types";

function App(): JSX.Element {
  useEffect(() => {
    window.context.readSettings().then((data) => console.log(data));
  }, []);

  return (
    <>
      <Header className="bg-transparent h-14 pl-24 pr-8 py-2" />
    </>
  );
}

export default App;
