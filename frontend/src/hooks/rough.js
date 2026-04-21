import { useEffect, useRef, useState } from "react";

const MIN_WIDTH = 250;
const MAX_WIDTH = 800;

export default function useResizablePanels(
  containerRef,
  {
    toggleLeftSideBar,
    toggleRightSideBar,
    setToggleLeftSideBar,
    setToggleRightSideBar,
  }
) {
  const leftSidebarRef = useRef(null);
  const rightSidebarRef = useRef(null);
  const isResizingRef = useRef(null); // "left" | "right" | null

  const [leftWidth, setLeftWidth] = useState(MIN_WIDTH);
  const [rightWidth, setRightWidth] = useState(MIN_WIDTH);

  const startResizing = (side, e) => {
    e.preventDefault();
    isResizingRef.current = side;
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isResizingRef.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const totalWidth = rect.width;

      let newWidth;

      if (isResizingRef.current === "left") {
        newWidth = e.clientX - rect.left;

        const maxAllowed = totalWidth - rightWidth - MIN_WIDTH;
        newWidth = Math.min(newWidth, maxAllowed);
        newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth));

        if (leftSidebarRef.current) {
          leftSidebarRef.current.style.width = `${newWidth}px`;
        }
      }

      if (isResizingRef.current === "right") {
        newWidth = rect.right - e.clientX;

        const maxAllowed = totalWidth - leftWidth - MIN_WIDTH;
        newWidth = Math.min(newWidth, maxAllowed);
        newWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth));

        if (rightSidebarRef.current) {
          rightSidebarRef.current.style.width = `${newWidth}px`;
        }
      }
    };

    const onMouseUp = (e) => {
      if (!isResizingRef.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerWidth = rect.width;

      let finalWidth;

      if (isResizingRef.current === "left") {
        finalWidth = e.clientX - rect.left;
        finalWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, finalWidth));

        setLeftWidth(finalWidth);

        // AUTO CLOSE
        if (
          finalWidth >= containerWidth / 2 &&
          toggleLeftSideBar &&
          toggleRightSideBar
        ) {
          setToggleRightSideBar(false);
          rightWidth = MIN_WIDTH;
        }
      }

      if (isResizingRef.current === "right") {
        finalWidth = rect.right - e.clientX;
        finalWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, finalWidth));

        setRightWidth(finalWidth);

        // AUTO CLOSE
        if (
          finalWidth >= containerWidth / 2 &&
          toggleLeftSideBar &&
          toggleRightSideBar
        ) {
          setToggleLeftSideBar(false);
          leftWidth = MIN_WIDTH;
        }
      }

      isResizingRef.current = null;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [
    leftWidth,
    rightWidth,
    containerRef,
    toggleLeftSideBar,
    toggleRightSideBar,
  ]);

  return {
    leftSidebarRef,
    rightSidebarRef,
    leftWidth,
    rightWidth,
    startResizing,
  };
}