// src/MainStore.js
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../images/dan-burton-lrHpdJ9r7sQ-unsplash.jpg";

const cardsData = [
  { title: "Dried Chilli", path: "/dried-chilli" },
  { title: "Dried Turmeric", path: "/dried-turmeric" },
  { title: "Pepper Seeds", path: "/pepper-seeds" },
  { title: "Pepper powder", path: "/pepper-powder" },
  { title: "Cinnamon", path: "/cinnamon" },
  { title: "Gamboge", path: "/gamboge" },
  { title: "Fennel Seeds", path: "/fennel-seeds" },
  { title: "Heenduru", path: "/heenduru" },
  { title: "Coriander", path: "/coriander" },
  { title: "Mustard", path: "/mustard" },
  { title: "Fenugreek", path: "/fenugreek" },
  { title: "Cardamom", path: "/cardamom" },
  { title: "Nutmeg flowers", path: "/nutmeg-flowers" },
  { title: "Nutmeg", path: "/nutmeg" },
  { title: "Cloves", path: "/cloves" },
  { title: "Cinnamon sticks", path: "/cinnamon-sticks" },
  { title: "Ginger", path: "/ginger" },
  { title: "Dhal", path: "/dhal" },
  { title: "Rice", path: "/rice" },
];

const BasicCard = ({ title, onClick }) => (
  <Button
    component={Card}
    sx={{
      minWidth: 275,
      marginBottom: 2,
      backgroundColor: "white",
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
    }}
    onClick={onClick}
  >
    <CardContent>
      <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
        {title}
      </Typography>
    </CardContent>
  </Button>
);

const MainStore = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        alignItems: "center",
      }}
    >
      {/* Content wrapper */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          padding: "20px",
          borderBottom: "1px solid #ccc",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Header section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            width: "100%",
          }}
        >
          <Typography variant="h2" sx={{ flexGrow: 1 }} align="center">
            <b>Main Store</b>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/home")}
          >
            Home
          </Button>
        </Box>

        {/* Cards section */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {cardsData.map((card, index) => (
            <BasicCard
              key={index}
              title={card.title}
              onClick={() => handleCardClick(card.path)}
            />
          ))}
        </Box>
      </Box>

      {/* Footer section */}
      <Box
        sx={{
          marginTop: "auto",
          borderTop: "1px solid #ccc",
          padding: "20px",
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ marginRight: "10px" }}
          onClick={() => navigate("/store-in")}
        >
          Main Store In
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/store-out")}
        >
          Main Store Out
        </Button>
      </Box>
    </Box>
  );
};

export default MainStore;
