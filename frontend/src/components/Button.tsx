type ButtonProps = {
  label: string;
  color?: string;
  onClick?: () => void;
};

const Button = ({ label, color, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`h-10 w-20 rounded-2xl text-white text-sm cursor-pointer ${
        color ? color : "bg-gray-600"
      }`}
    >
      {label}
    </button>
  );
};
export default Button;
