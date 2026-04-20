const Resizer = ({ isVisible, side, onResizeStart }) => {
  if (!isVisible) return null;

  return (
    <div
      onMouseDown={(e) => onResizeStart(side, e)}
      className="w-1 cursor-col-resize bg-gray-300 hover:bg-gray-400"
    />
  );
};

export default Resizer;