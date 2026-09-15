interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className: string;
  disabled?: boolean;
  type?: "submit" | "reset";
}

const Button = ({
  children,
  onClick,
  className,
  disabled,
  type,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
