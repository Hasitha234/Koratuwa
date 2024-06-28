import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../images/dan-burton-lrHpdJ9r7sQ-unsplash.jpg";

const cardsData = [
  { title: "Chilli Pieces", path: "/chilli-pieces" },
  { title: "Chilli Powder", path: "/chilli-powder" },
  { title: "Turmeric Powder", path: "/turmeric-powder" },
  { title: "Pepper Powder", path: "/pepper-powder" },
  { title: "Curry Powder", path: "/curry-powder" },
  { title: "Fried Curry Powder", path: "/fried-curry-powder" },
  { title: "Meat Curry Powder", path: "/meat-curry-powder" },
  { title: "Mustard Powder", path: "/mustard-powder" },
  { title: "Mustard Seeds", path: "/mustard-seeds" },
  { title: "Fenugreek", path: "/fenugreek" },
  { title: "Cinnamon", path: "/cinnamon" },
  { title: "Gamboge", path: "/gamboge" },
  { title: "Tea Powder", path: "/tea-powder" },
  { title: "Clove Packs", path: "/clove-packs" },
  { title: "Cardamom Packs", path: "/cardamom-packs" },
  { title: "Suwada Hatha", path: "/suwada-hatha" },
];

const BasicCard = ({ title, onClick }) => (
  <Button
    component={Card}
    sx={{ minWidth: 275, marginBottom: 2, backgroundColor: "white" }}
    onClick={onClick}
  >
    <CardContent>
      <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
        {title}
      </Typography>
    </CardContent>
  </Button>
);

const PackingStore = () => {
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
      }}
    >
      {/* Header section */}
      <Box sx={{ padding: "20px", borderBottom: "1px solid #ccc" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Typography variant="h2" sx={{ flexGrow: 1 }} align="center">
            <b>Packing Store</b>
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
            alignItems: "center",
            margin: "auto",
            maxWidth: "1200px", // You can adjust the maxWidth as needed
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
      {/* <Box
        sx={{
          marginTop: "auto",
          borderTop: "1px solid #ccc",
          padding: "20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      > */}
        <Button
  variant="contained"
  color="primary"
  sx={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000, // Ensures it's above other elements if there are overlays
  }}
  onClick={() => navigate("/packing-in")}
>
  Update Packing Store
</Button>

        
        {/* <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/packing-out")}
        >
          Packing Store Out
        </Button> */}
      {/* </Box> */}
    </Box>
  );
};

export default PackingStore;
