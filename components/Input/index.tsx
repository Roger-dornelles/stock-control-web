interface InputProps {
  type: "text" | "password" | "number";
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  disabled?: boolean;
}

const Input = ({ type, value, onChange, className, disabled }: InputProps) => {
  return (
    <>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={className}
        disabled={disabled}
      />
    </>
  );
};

export default Input;
