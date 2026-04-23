import FileUnit from "./FileUnit";
import "../global.css";

function FileBox({ files = [], selectedFile, onSelect, onDelete }) {
  if (!files.length) {
    return (
      <div className="p-2 text-gray-500 text-sm">
        No files uploaded
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 px-1 mt-2 overflow-y-auto custom-scrollbar">
      {files.map((file) => (
        <FileUnit
          key={file.id}
          file={file}
          isActive={selectedFile?.id === file.id}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default FileBox;