function FileUnit({ file, isActive, onSelect, onDelete }) {
  return (
    <div
      className={`
        flex items-center justify-between
        px-3 py-1.5
        text-sm
        rounded-md
        cursor-pointer
        transition
        ${isActive ? "bg-gray-300" : "hover:bg-gray-200"}
      `}
      onClick={() => onSelect(file)}
    >
      {/* filename */}
      <span className="truncate flex-1 text-gray-800">
        {file.filename}
      </span>

      {/* delete button */}
      <button
        className="
          ml-2
          px-2 py-0.5
          text-xs
          text-gray-500
          rounded
          hover:bg-gray-400
          hover:text-black

          transition
        "
        onClick={(e) => {
          e.stopPropagation();
          onDelete(file.id);
        }}
      >
        x
      </button>
    </div>
  );
}

export default FileUnit;