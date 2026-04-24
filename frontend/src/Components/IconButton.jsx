function IconButton({ darkMode, children, as: Component = "button", ...props }) {
  return (
    <Component
      {...props}
      className={`p-1.5 rounded-md cursor-pointer 
                  ${darkMode? "hover:bg-[#484848]" : "hover:bg-gray-200" }
                  ${darkMode? "active:bg-[#555555]" : "active:bg-gray-300" }
                 
                  active:scale-95 
                 transition duration-150`}
    >
      {children}
    </Component>
  );
}

export default IconButton;