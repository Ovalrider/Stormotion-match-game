import { useState } from "react";
import CustomSelect from "./Select";
import CustomButton from "./Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useGameSettings } from "../context/GameSettings";

const Settings = () => {
  const { nParam, mParam, setNParam, setMParam, reset } = useGameSettings();
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
            Select who goes first. <br />n parameter - total matches is
            calculated as folows 2 * n + 1.
            <br />m parameter - how many matches can one take.
          </DialogContentText>
          <p className="pb-5">Total matches: {2* nParam + 1}</p>
          <CustomSelect />
          <TextField
            autoFocus
            value={nParam}
            margin="dense"
            id="n"
            name="n"
            label="n"
            type="number"
            min="0"
            size="large"
            fullWidth
            onChange={(event) => {
              if (event.target.value > 0) {
                setNParam(event.target.value);
              }
            }}
            
            //   variant="standard"
          />
          <TextField
            autoFocus
            value={mParam}
            margin="dense"
            id="m"
            name="m"
            label="m"
            type="number"
            size="large"
            fullWidth
            onChange={(event) => {
                if (event.target.value > 0 && event.target.value <= 2*nParam+1 ) 
                    setMParam(event.target.value);
                  
            }}
            //   variant="standard"
          />
        </DialogContent>
        <DialogActions className="mb-5 mr-5 gap-x-5">
          <CustomButton onClick={handleClose}>Cancel</CustomButton>
          <CustomButton onClick={reset}>Reset</CustomButton>
          <CustomButton type="submit">Apply</CustomButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Settings;
