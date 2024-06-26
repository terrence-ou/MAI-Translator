import { useEffect } from "react";
import Header from "./components/header/Header";
// import { editorSettingsType } from "@shared/types";

function App(): JSX.Element {
  useEffect(() => {
    window.context.readSettings().then((data) => console.log(data));
  }, []);

  return (
    <>
      <div className="h-screen flex flex-col">
        <Header className="bg-transparent h-header pl-24 pr-8 py-2" />
        <h1 className="mt-header">The body of the translator app</h1>
      </div>
    </>
  );
}

export default App;
