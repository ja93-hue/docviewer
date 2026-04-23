import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Main from "./Components/Main";
import Resizer from "./Components/Resizer";
import FileBox from "./Components/FileBox";

import { useState, useRef } from "react";
import useResizablePanels from "./hooks/useResizablePanels";
import { uploadFile } from "./utils/fileUtils";

function App() {
  const [toggleLeftSideBar, setToggleLeftSideBar] = useState(false);
  const [toggleRightSideBar, setToggleRightSideBar] = useState(false);
  const [toggleDarkMode, setToggleDarkMode] = useState(false);

  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const containerRef = useRef(null);

  const {
    leftSidebarRef,
    rightSidebarRef,
    leftWidth,
    rightWidth,
    startResizing,
  } = useResizablePanels(containerRef, {
    toggleLeftSideBar,
    toggleRightSideBar,
    setToggleLeftSideBar,
    setToggleRightSideBar,
  });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = await uploadFile(file);

    if (!data || !data.filename || !data.content) {
      console.error("Invalid response:", data);
      return;
    }

    const newFile = {
      id: crypto.randomUUID(),
      filename: data.filename,
      content: data.content,
    };

    setFiles((prev) => [...prev, newFile]);
    setSelectedFile(newFile);
  };

  // HANDLE DELETE
  const handleDelete = (id) => {
    setFiles((prev) => {
      const updated = prev.filter((f) => f.id !== id);

      setSelectedFile((current) =>
        current?.id === id ? updated[0] || null : current,
      );

      return updated;
    });
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header
        bgColor={toggleDarkMode ? "bg-[#363636]" : "bg-[#FCFCFC]"}
        toggleLeftSideBar={toggleLeftSideBar}
        toggleRightSideBar={toggleRightSideBar}
        toggleDarkMode={toggleDarkMode}
        fileName={selectedFile?.filename}
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
          bgColor={toggleDarkMode ? "bg-[#262626]" : "bg-[#F6F6F6]"}
          sidebarRef={leftSidebarRef}
          side="left"
        >
          <FileBox
            files={files}
            selectedFile={selectedFile}
            onSelect={setSelectedFile}
            onDelete={handleDelete}
          />
        </Sidebar>

        <Resizer
          isVisible={toggleLeftSideBar}
          side="left"
          onResizeStart={startResizing}
          bgColor={toggleDarkMode ? "bg-[#1e1e1e]" : "bg-white"}
        />

        {/* MAIN */}
        <Main
          file={selectedFile}
          onFileChange={handleFileChange}
          bgColor={toggleDarkMode ? "bg-[#1e1e1e]" : "bg-white"}
        />

        <Resizer
          isVisible={toggleRightSideBar}
          side="right"
          onResizeStart={startResizing}
          bgColor={toggleDarkMode ? "bg-[#1e1e1e]" : "bg-white"}
        />

        {/* RIGHT */}
        <Sidebar
          isOpen={toggleRightSideBar}
          width={rightWidth}
          bgColor={toggleDarkMode ? "bg-[#262626]" : "bg-[#F6F6F6]"}
          sidebarRef={rightSidebarRef}
          side="right"
        />
      </div>
    </div>
  );
}

export default App;
