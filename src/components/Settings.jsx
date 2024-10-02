import { useState } from "react";
import CustomSelect from "./Select";
import CustomButton from "./Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Settings = () => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <CustomButton onClick={handleClickOpen}>Change Settings</CustomButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleClose();
          },
        }}
      >
        <DialogTitle>Game Settings</DialogTitle>
        <DialogContent>
          <DialogContentText className="pb-5">
          Select who goes first.
          </DialogContentText>
          <CustomSelect />
          
        </DialogContent>
        <DialogActions className="mx-5 my-5 gap-x-20 w-96">
          <CustomButton onClick={handleClose}>Cancel</CustomButton>
          <CustomButton type="submit">Apply</CustomButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Settings;
