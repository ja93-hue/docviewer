import { useEffect, useRef, useState } from "react";

const MIN_WIDTH = 250;
const MAX_WIDTH = 800;

export default function useResizablePanels(containerRef) {
  const leftSidebarRef = useRef(null);
  const rightSidebarRef = useRef(null);
  const isResizingRef = useRef(null);

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
      let finalWidth;

      if (isResizingRef.current === "left") {
        finalWidth = e.clientX - rect.left;
        setLeftWidth(Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, finalWidth)));
      }

      if (isResizingRef.current === "right") {
        finalWidth = rect.right - e.clientX;
        setRightWidth(Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, finalWidth)));
      }

      isResizingRef.current = null;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [leftWidth, rightWidth, containerRef]);

  return {
    leftSidebarRef,
    rightSidebarRef,
    leftWidth,
    rightWidth,
    startResizing,
  };
}