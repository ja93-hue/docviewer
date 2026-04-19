function IconButton({ children, as: Component = "button", ...props }) {
  return (
    <Component
      {...props}
      className="p-2 rounded-md cursor-pointer 
                 hover:bg-gray-200 
                 active:bg-gray-300 active:scale-95 
                 transition duration-150"
    >
      {children}
    </Component>
  );
}

export default IconButton;