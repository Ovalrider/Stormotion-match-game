import Button from "@mui/material/Button";

const CustomButton = ({ children, onClick, type, disabled }) => {
  return (
    <Button
      variant="contained"
      className="max-w-64 w-full h-9"
      disabled={disabled}
      onClick={onClick}
      type={type ? type : "button"}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
