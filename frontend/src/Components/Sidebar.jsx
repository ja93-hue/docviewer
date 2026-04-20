function Sidebar({ isOpen, width, sidebarRef, children }) {
  return (
    <div
      ref={sidebarRef}
      style={{ width: isOpen ? `${width}px` : "0px" }}
      className="overflow-hidden flex-shrink-0 bg-[#F6F6F6] border-r border-[#CCCCCC] transition-[width] duration-100 ease-in-out h-full overflow-hidden"
    >
      {children}
    </div>
  );
}

export default Sidebar;
