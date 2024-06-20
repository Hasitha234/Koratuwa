import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

const MeatCurryPowder = () => { // Correct component name
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Meat Curry Powder
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/PackingStore')}>
        Back to Store
      </Button>
    </Box>
  );
};

export default MeatCurryPowder; // Correct export name
