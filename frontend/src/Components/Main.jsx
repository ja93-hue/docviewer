import {useRef} from 'react';

const Main = ({ file, onFileChange }) => {

  const fileInputRef = useRef(null);
  
    const handleFileClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      const formData = new FormData();
      formData.append("file", file);
  
      const res = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      console.log(data);
    };
  

  return (
    <main className="flex-1 min-w-0 bg-white p-4 overflow-auto flex items-center justify-center">
      {!file && (
        <label
           className="w-[85%] max-w-sm min-h-40 flex flex-col items-center justify-center gap-2
             border-2 border-dashed border-gray-300 rounded-lg
             bg-gray-50 hover:bg-gray-100
             cursor-pointer transition text-sm text-gray-600"
        >
          <span className="text-base font-medium">Upload Document</span>

          <span className="text-xs text-gray-400">Click to select a file</span>

          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      )}

      {file && (
        <div className="text-gray-800 text-sm whitespace-pre-wrap break-words">
          {file}
        </div>
      )}
    </main>
  );
};

export default Main;
