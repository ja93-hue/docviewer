const Main = ({ file, onFileChange }) => {
  return (
    <main className="flex flex-1 min-w-0 min-h-0 bg-white p-4 overflow-y-auto">
      {!file ? (
        <div className="flex w-full h-full items-center justify-center">
          <label
            className="w-full max-w-md h-44 flex flex-col items-center justify-center gap-2
                        border-2 border-dashed border-gray-300 rounded-lg
                        bg-gray-50 hover:bg-gray-100
                        cursor-pointer transition text-sm text-gray-600"
          >
            <span className="text-base font-medium">Upload Document</span>
            <span className="text-xs text-gray-400">
              Click to select a file
            </span>

            <input type="file" className="hidden" onChange={onFileChange} />
          </label>
        </div>
      ) : (
        <pre className="max-w-3xl mx-auto w-full text-gray-800 leading-7 text-[15px] whitespace-pre-wrap break-words">
          {file}
        </pre>
      )}
    </main>
  );
};

export default Main;
