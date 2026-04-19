import styles from "./Header.module.css";

import { useRef } from "react";

import IconButton from "./IconButton";

import {
  BsLayoutSidebarInset,
  BsReverseLayoutSidebarInsetReverse,
} from "react-icons/bs";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { TbFileUpload } from "react-icons/tb";

const Header = ({
  toggleLeftSideBar,
  toggleRightSideBar,
  toggleDarkMode,
  onToggleLeft,
  onToggleRight,
  onToggleDark,
}) => {
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
    <header
      className={`${styles.header} px-2 flex justify-between items-center box-border border-b border-gray-300`}
      styles={{ backgroundColor: "#FCFCFC" }}
    >
      <div className={`${styles.left} flex items-center gap-1`}>
        <IconButton
          onClick={onToggleLeft}
          title={toggleLeftSideBar ? "Hide left sidebar" : "Show left sidebar"}
        >
          {toggleLeftSideBar ? (
            <BsReverseLayoutSidebarInsetReverse className="text-[#222] text-xl" />
          ) : (
            <BsLayoutSidebarInset className="text-[#222] text-xl" />
          )}
        </IconButton>

        <div
          className="max-w-[200px] truncate text-[0.97rem]"
          title="No file selected"
        >
          No File
        </div>
      </div>

      <div className={`${styles.right} flex justify-end items-center gap-1`}>
        <>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          <IconButton onClick={handleFileClick} title="Open file">
            <TbFileUpload className="text-[#222] text-[1.40rem]" />
          </IconButton>
        </>

        <IconButton
          onClick={onToggleRight}
          title={
            toggleRightSideBar ? "Hide right sidebar" : "Show right sidebar"
          }
        >
          {toggleRightSideBar ? (
            <BsLayoutSidebarInset className="text-[#222] text-xl" />
          ) : (
            <BsReverseLayoutSidebarInsetReverse className="text-[#222] text-xl" />
          )}
        </IconButton>

        <IconButton
          onClick={onToggleDark}
          title={
            toggleDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {toggleDarkMode ? (
            <MdOutlineDarkMode className="text-yellow-400 text-xl gap-1" />
          ) : (
            <MdDarkMode className="text-[#222] text-xl" />
          )}
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
