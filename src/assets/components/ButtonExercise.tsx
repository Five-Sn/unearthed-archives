interface Props {
  text: string;
  // A question mark (?) means it's optional and the parent can avoid passing this variable
  // The | is a union operator. This allows color to only be set to any of these string literals
  color?: "primary" | "secondary" | "light" | "dark";
  onClick: () => void;
}

const ButtonExercise = ({ text, onClick, color = "primary" }: Props) => {
  return (
    <button
      type="button"
      className={"btn btn-" + color}
      onClick={() => {
        onClick();
      }}
    >
      {text}
    </button>
  );
};

export default ButtonExercise;
