import "../global.css";

const Main = ({ file, onFileChange, darkMode }) => {
  //
  return (
    <main className={`flex flex-1 min-w-0 min-h-0 ${darkMode? "bg-[#1e1e1e]" : "bg-white"} p-4 overflow-y-auto custom-scrollbar`}>
      {!file ? (
        <div className="flex w-full h-full items-center justify-center">
          <label
            className={`w-full max-w-md h-44 flex flex-col items-center justify-center gap-2
                        border-2 border-dashed ${darkMode? "border-gray-600": "border-gray-300"} rounded-lg
                        ${darkMode? "bg-[#262626]": "bg-gray-50"} ${darkMode? "hover:bg-[#2d2d2d]": "hover:bg-gray-100"} 
                        cursor-pointer transition text-sm ${darkMode? "text-gray-300": "text-gray-600"}`}
          >
            <span className="text-base font-medium">Upload Document</span>
            <span className={`text-xs ${darkMode? "text-gray-400": "text-gray-500"}`}>
              Click to select a file
            </span>

            <input type="file" className="hidden" onChange={onFileChange} />
          </label>
        </div>
      ) : (
        <pre className={`max-w-3xl mx-auto w-full ${darkMode? "text-gray-200" : "text-gray-800"} leading-7 text-[15px] whitespace-pre-wrap break-words`}>
          {file?.content}
        </pre>
      )}
    </main>
  );
};

export default Main;
