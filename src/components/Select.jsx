import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useGameSettings } from "../context/GameSettings";

const CustomSelect = () => {
  const { whoGoesFirst, setWhoGoesFirst } = useGameSettings();

  const handleChange = (event) => {
    if (event.target.value === "Ai" || event.target.value === "Player")
      setWhoGoesFirst(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel id="goesFirstLabel">First move</InputLabel>
        <Select
          labelId="goesFirstLabel"
          id="goesFirst"
          value={whoGoesFirst}
          label="First move"
          onChange={handleChange}
        >
          <MenuItem value={"Player"}>Player</MenuItem>
          <MenuItem value={"Ai"}>Ai</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
