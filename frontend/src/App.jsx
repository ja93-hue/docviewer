import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Main from "./Components/Main";

import { useState, useEffect, useRef } from "react";

const MIN_WIDTH = 250;
const MAX_WIDTH = 800;

function App() {
  const [toggleLeftSideBar, setToggleLeftSideBar] = useState(false);
  const [toggleRightSideBar, setToggleRightSideBar] = useState(false);
  const [toggleDarkMode, setToggleDarkMode] = useState(false);

  const [sidebarWidth, setSidebarWidth] = useState(MIN_WIDTH); // px

  const containerRef = useRef(null);
  const sidebarRef = useRef(null);
  const isResizingRef = useRef(false);

  const handleToggleLeftSidebar = () => {
    setToggleLeftSideBar((prev) => !prev);
  };

  const handleToggleRightSidebar = () => {
    setToggleRightSideBar((prev) => !prev);
  };

  const handleToggleDarkMode = () => {
    setToggleDarkMode((prev) => !prev);
  };

  const startResizing = (e) => {
    e.preventDefault();
    if (!toggleLeftSideBar) return;
    isResizingRef.current = true;
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isResizingRef.current) return;
      if (!containerRef.current || !sidebarRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const newWidth = Math.max(
        MIN_WIDTH,
        Math.min(MAX_WIDTH, e.clientX - rect.left),
      );

      sidebarRef.current.style.width = `${newWidth}px`;
    };

    const onMouseUp = (e) => {
      if (!isResizingRef.current) return;

      isResizingRef.current = false;

      const rect = containerRef.current.getBoundingClientRect();
      const finalWidth = Math.max(
        MIN_WIDTH,
        Math.min(MAX_WIDTH, e.clientX - rect.left),
      );

      setSidebarWidth(finalWidth);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Header
        toggleLeftSideBar={toggleLeftSideBar}
        toggleRightSideBar={toggleRightSideBar}
        toggleDarkMode={toggleDarkMode}
        onToggleLeft={handleToggleLeftSidebar}
        onToggleRight={handleToggleRightSidebar}
        onToggleDark={handleToggleDarkMode}
      />

      <div ref={containerRef} className="flex flex-1 select-none">
        <Sidebar
          isOpen={toggleLeftSideBar}
          width={sidebarWidth}
          sidebarRef={sidebarRef}
        />

        {toggleLeftSideBar && (
          <div
            onMouseDown={startResizing}
            className="w-1 cursor-col-resize bg-gray-300 hover:bg-gray-400 active:bg-gray-500"
          />
        )}

        <Main />
      </div>
    </div>
  );
}

export default App;
