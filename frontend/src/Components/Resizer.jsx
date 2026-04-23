const Resizer = ({ isVisible, side, onResizeStart, bgColor }) => {
  if (!isVisible) return null;

  return (
    <div
      onMouseDown={(e) => onResizeStart(side, e)}
      className={`
        w-1
        ${bgColor}
        cursor-col-resize
        hover:bg-yellow-400
        transition-colors
        duration-150
        `
      }
    />
  );
};

export default Resizer;