import { useGameSettings } from "../context/gameSettingsContext";
import { Person } from "@mui/icons-material";
import { SmartToy } from "@mui/icons-material";
import { Fab } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import { Settings } from "@mui/icons-material";
import "../index.css";
import PlayerIconButton from "./PlayerIconButton";

const CustomSelect = () => {
  const { whoGoesFirst, setWhoGoesFirst } = useGameSettings();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  const handleChange = () => {
    if (whoGoesFirst === "Player") setWhoGoesFirst("Ai");
    else setWhoGoesFirst("Player");
  };
  return (
    <div className="flex flex-col justify-end items-end w-full h-full pr-12">
      <Fab color="primary">
        <Settings
          onClick={toggleDrawer(true)}
          sx={{ boxShadow: "none", width: 30, height: 30 }}
          className="transition-transform duration-500 hover:animate-spin"
        />
      </Fab>
      <Drawer anchor="top" open={isOpen} onClose={toggleDrawer(false)}>
        <div
          className="flex justify-center items-center mt-5 gap-80"
          style={{ minWidth: "500" }}
        >
          <PlayerIconButton
            whoGoesFirst={whoGoesFirst}
            onClick={handleChange}
            player="Ai"
          >
            <Person sx={{ boxShadow: "none", width: 70, height: 70 }} />
          </PlayerIconButton>
          <h1 className="text-3xl mb-5">Who goes first?</h1>
          <PlayerIconButton
            whoGoesFirst={whoGoesFirst}
            onClick={handleChange}
            player="Player"
          >
            <SmartToy sx={{ boxShadow: "none", width: 70, height: 70 }} />
          </PlayerIconButton>
        </div>

        <div
          style={{ width: "50%", height: "30px" }}
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        ></div>
      </Drawer>
    </div>
  );
};

export default CustomSelect;
