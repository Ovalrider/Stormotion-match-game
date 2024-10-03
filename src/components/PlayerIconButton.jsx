import Fab from "@mui/material/Fab";

const PlayerIconButton = ({ whoGoesFirst, onClick, player, children }) => {
  return (
    <div className="flex flex-col items-center ">
      <Fab
        color="primary"
        sx={{ boxShadow: "none", width: 120, height: 120 }}
        disabled={whoGoesFirst !== player}
        onClick={onClick}
        className="transition ease-in-out hover:scale-105 disabled:opacity-75"
      >
        {children}
      </Fab>
      <label htmlFor="goesFirst" className="pt-3 text-3xl">
        Ai
      </label>
    </div>
  );
};

export default PlayerIconButton;
