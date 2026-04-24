import IconButton from "./IconButton";

import {
  BsLayoutSidebarInset,
  BsReverseLayoutSidebarInsetReverse,
} from "react-icons/bs";

import { IoIosSunny } from "react-icons/io";

import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { TbFileUpload } from "react-icons/tb";
import { useRef } from "react";

const Header = ({
  toggleLeftSideBar,
  toggleRightSideBar,
  toggleDarkMode,
  fileName,
  onToggleLeft,
  onToggleRight,
  onToggleDark,
  onFileChange,
}) => {
  const fileInputRef = useRef(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <header
      className={`w-screen h-[7vh] text-[#333] px-2 flex justify-between 
      ${toggleDarkMode ? "bg-[#363636]" : "bg-[#FCFCFC]"}
      items-center border-b 
      ${toggleDarkMode? 'border-[#444444]' : 'border-[#CCCCCC]'}`}
    >
      {/* LEFT */}
      <div className="flex items-center gap-2">

        {/* LEFT SIDEBAR */}
        <IconButton darkMode={toggleDarkMode} onClick={onToggleLeft} title="Toggle left sidebar">
          {toggleDarkMode ? (
            toggleLeftSideBar ? (
              <BsReverseLayoutSidebarInsetReverse className="text-xl text-[#dbdbdb]" />
            ) : (
              <BsLayoutSidebarInset className="text-xl text-[#dbdbdb]" />
            )
          ) : toggleLeftSideBar ? (
            <BsReverseLayoutSidebarInsetReverse className="text-xl" />
          ) : (
            <BsLayoutSidebarInset className="text-xl" />
          )}
        </IconButton>

        <div
          className={`max-w-[200px] truncate text-[0.94rem] ${toggleDarkMode? "text-gray-300": "text-gray-800"}`}
          title={fileName || "No file selected"}
        >
          {fileName || "No File"}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-1">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={onFileChange}
        />

        {/*UPLOAD FILE*/}
        <IconButton darkMode={toggleDarkMode} onClick={handleFileClick} title="Open file">
          {toggleDarkMode ? (
            <TbFileUpload className="text-[1.40rem] text-[#dbdbdb]" />
          ) : (
            <TbFileUpload className="text-[1.40rem]" />
          )}
        </IconButton>

        {/*RIGHT SIDEBAR*/}
        <IconButton darkMode={toggleDarkMode} onClick={onToggleRight} title="Toggle right sidebar">
          {toggleDarkMode ? (
            toggleRightSideBar ? (
              <BsLayoutSidebarInset className="text-xl text-[#dbdbdb]" />
            ) : (
              <BsReverseLayoutSidebarInsetReverse className="text-xl text-[#dbdbdb]" />
            )
          ) : toggleRightSideBar ? (
            <BsLayoutSidebarInset className="text-xl" />
          ) : (
            <BsReverseLayoutSidebarInsetReverse className="text-xl" />
          )}
        </IconButton>

        {/*DARK MODE*/}
        <IconButton darkMode={toggleDarkMode} onClick={onToggleDark} title="Toggle theme">
          {toggleDarkMode ? (
            <IoIosSunny className="text-yellow-400 text-[1.50rem]"/>
          ) : (
            <MdDarkMode className="text-xl" />
          )}
        </IconButton>
      </div>
    </header>
  );
};

export default Header;

/*.left{
    height: 100%;
    width: 50%;
}

.right{
    height: 100%;
    width: 50%;
}
    */