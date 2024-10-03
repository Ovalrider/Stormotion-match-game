import { Box, Card, CardContent } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import "../index.css";

const CustomCard = ({ icon, score, text }) => {
  const [prevScore, setPrevScore] = useState();
  const [scaleUp, setScaleUp] = useState();
  useEffect(() => {
    if (score !== prevScore) {
      setScaleUp("scale-up");
      setTimeout(() => setScaleUp(""), 700); // reset after animation
      setPrevScore(score);
    }
  }, [score, prevScore]);
  return (
    <Card variant="outlined" sx={{ width: 300, height: 450, border: 0 }}>
      <CardContent>
        <Box className="flex flex-col gap-14 mt-10" alignItems="center">
          <p className="text-6xl" style={{ fontSize: "11rem" }}>
            {icon}
          </p>
          <p className={`text-4xl ${scaleUp}`}>{text}</p>
        </Box>
        <p className={`text-4xl mt-7 ${scaleUp}`}>{score}</p>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
