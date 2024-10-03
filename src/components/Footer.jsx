import CustomButton from "./Button";

const Footer = ({ onClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 text-center p-5 bg-gray-200 border border-solid border-gray-400">
      <CustomButton className="text-2xl" onClick={onClick}>
        Start again
      </CustomButton>
    </div>
  );
};

export default Footer;
