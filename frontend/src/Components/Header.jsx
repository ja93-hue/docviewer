import styles from "./Header.module.css";
import IconButton from "./IconButton";

import {
  BsLayoutSidebarInset,
  BsReverseLayoutSidebarInsetReverse,
} from "react-icons/bs";
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
      className={`${styles.header} px-2 flex justify-between items-center border-b border-gray-300`}
      style={{ backgroundColor: "#FCFCFC" }}
    >
      {/* LEFT */}
      <div className="flex items-center gap-2">
        <IconButton onClick={onToggleLeft} title="Toggle left sidebar">
          {toggleLeftSideBar ? (
            <BsReverseLayoutSidebarInsetReverse className="text-xl" />
          ) : (
            <BsLayoutSidebarInset className="text-xl" />
          )}
        </IconButton>

        <div
          className="max-w-[200px] truncate text-[0.97rem]"
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

        <IconButton onClick={handleFileClick} title="Open file">
          <TbFileUpload className="text-xl" />
        </IconButton>

        <IconButton onClick={onToggleRight} title="Toggle right sidebar">
          {toggleRightSideBar ? (
            <BsLayoutSidebarInset className="text-xl" />
          ) : (
            <BsReverseLayoutSidebarInsetReverse className="text-xl" />
          )}
        </IconButton>

        <IconButton onClick={onToggleDark} title="Toggle theme">
          {toggleDarkMode ? (
            <MdOutlineDarkMode className="text-yellow-400 text-xl" />
          ) : (
            <MdDarkMode className="text-xl" />
          )}
        </IconButton>
      </div>
    </header>
  );
};

export default Header;