import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Main from "./Components/Main";
import Resizer from "./Components/Resizer";

import { useState, useRef } from "react";
import useResizablePanels from "./hooks/useResizablePanels";
import { uploadFile } from "./utils/fileUtils";

function App() {
  const [toggleLeftSideBar, setToggleLeftSideBar] = useState(false);
  const [toggleRightSideBar, setToggleRightSideBar] = useState(false);
  const [toggleDarkMode, setToggleDarkMode] = useState(false);

  const [fileContent, setFileContent] = useState(null);
  const [fileName, setFileName] = useState("");

  const containerRef = useRef(null);

  const {
    leftSidebarRef,
    rightSidebarRef,
    leftWidth,
    rightWidth,
    startResizing,
  } = useResizablePanels(containerRef);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const content = await uploadFile(file);
    setFileContent(content);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header
        toggleLeftSideBar={toggleLeftSideBar}
        toggleRightSideBar={toggleRightSideBar}
        toggleDarkMode={toggleDarkMode}
        fileName={fileName}
        onToggleLeft={() => setToggleLeftSideBar((p) => !p)}
        onToggleRight={() => setToggleRightSideBar((p) => !p)}
        onToggleDark={() => setToggleDarkMode((p) => !p)}
        onFileChange={handleFileChange}
      />

      <div ref={containerRef} className="flex flex-1 overflow-hidden">
        {/* LEFT */}
        <Sidebar
          isOpen={toggleLeftSideBar}
          width={leftWidth}
          sidebarRef={leftSidebarRef}
        />

        <Resizer
          isVisible={toggleLeftSideBar}
          side="left"
          onResizeStart={startResizing}
        />

        {/* MAIN */}
        <Main file={fileContent} onFileChange={handleFileChange} />

        <Resizer
          isVisible={toggleRightSideBar}
          side="right"
          onResizeStart={startResizing}
        />

        {/* RIGHT */}
        <Sidebar
          isOpen={toggleRightSideBar}
          width={rightWidth}
          sidebarRef={rightSidebarRef}
        />
      </div>
    </div>
  );
}

export default App;