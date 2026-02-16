const Button = ({ children, ...props }) => (
    <button
      className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
      {...props}
    >
      {children}
    </button>
  );
  
  export default Button;
  