interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

const styles = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-slate-200 hover:bg-slate-300 text-slate-800",
  danger: "bg-red-500 hover:bg-red-600 text-white",
};

const Button = ({
  label,
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition ${
        styles[variant]
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {label}
    </button>
  );
};

export default Button;
