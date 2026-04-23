function Sidebar({ isOpen, width, bgColor, sidebarRef, side, children }) {
  return (
    <div
      ref={sidebarRef}
      style={{ width: isOpen ? `${width}px` : "0px" }}
      className={`overflow-hidden flex flex-col flex-shrink-0 ${(side==="right")? 'border-l':'border-r'} ${bgColor} border-[#CCCCCC] transition-[width] duration-100 ease-in-out h-full`}
    >
      {children}
    </div>
  );
}

export default Sidebar;
