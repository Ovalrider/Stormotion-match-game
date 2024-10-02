// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import { useGameSettings } from "../context/GameSettings";
import {  Person } from "@mui/icons-material";
import { SmartToy } from "@mui/icons-material";
import { Fab } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import {Settings} from '@mui/icons-material';
import "../index.css"



const CustomSelect = () => {
  const { whoGoesFirst, setWhoGoesFirst } = useGameSettings();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  const handleChange = () => {
    if (whoGoesFirst === "Player")
      setWhoGoesFirst("Ai");
    else
      setWhoGoesFirst("Player");
  };
  return (
    <div className='flex flex-col justify-end items-end w-full h-full pr-12'>
      <Fab color="primary">
        <Settings onClick={toggleDrawer(true)} sx={{boxShadow:"none", width: 30,
        height: 30}} className="transition-transform duration-500 hover:animate-spin"/>
      </Fab>
      <Drawer
        anchor="top"
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        
      <div className="flex justify-center items-center mt-5 gap-80" style={{minWidth:"500"}}>
        <div className="flex flex-col items-center">
        <Fab color="primary" sx={{boxShadow:"none", width: 120,      
        height: 120}} disabled={whoGoesFirst !=="Ai"} onClick={handleChange} className="transition ease-in-out hover:scale-105 disabled:opacity-75">
        <Person sx={{boxShadow:"none", width: 70,  
        height: 70}}/>
      </Fab>
        <label htmlFor="goesFirst" className="pt-3 text-3xl">Player</label>
        </div>
        <h1 className="text-3xl mb-5">Who goes first?</h1>
      <div className="flex flex-col items-center ">
      <Fab color="primary"  sx={{boxShadow:"none", width: 120,      
        height: 120}} disabled={whoGoesFirst !=="Player"} onClick={handleChange} className="hover:scale-105 disabled:opacity-75" >
        <SmartToy sx={{boxShadow:"none", width: 70,    
        height: 70}}/>
      </Fab>
      <label htmlFor="goesFirst" className="pt-3 text-3xl">Ai</label>
      </div>
      
      </div>
      
        <div
          style={{ width: '50%', height: '30px' }}
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
        </div>
      </Drawer>
      
    </div>
  );
};

export default CustomSelect;
