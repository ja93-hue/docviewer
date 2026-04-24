const Resizer = ({ isVisible, side, onResizeStart, darkMode }) => {
  if (!isVisible) return null;


  // Hover: 

  return (
    <div
      onMouseDown={(e) => onResizeStart(side, e)}
      className={`
        w-1
        ${darkMode ? "bg-[#1e1e1e]" : "bg-white"}
        cursor-col-resize
        hover:bg-gray-300
        transition-colors
        duration-150
        `
      }
    />
  );
};

export default Resizer;