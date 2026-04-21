function FileList({ files, onSelect, onDelete }) {
  return (
    <div className="p-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex justify-between items-center p-2 hover:bg-gray-200 cursor-pointer"
        >
          <span onClick={() => onSelect(file)}>
            {file.name}
          </span>

          <button onClick={() => onDelete(file.id)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default FileList;