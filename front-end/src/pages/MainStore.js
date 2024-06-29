import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../components/Header";
import backgroundImage from "../images/123.jpg";

const cardsData = [
  { title: "Dried Chilli", path: "/dried-chilli" },
  { title: "Dried Turmeric", path: "/dried-turmeric" },
  { title: "Pepper Seeds", path: "/pepper-seeds" },
  { title: "Pepper Powder", path: "/pepper-powder" }, // Corrected path
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

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      zIndex: 0,
    },
  };

  return (
    <>
      <ResponsiveAppBar />
      <div style={styles.container}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
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
              <Typography variant="h2" sx={{ flexGrow: 1, color: '#634F0C' }} align="center">
                <b>Main Store</b>
              </Typography>
            </Box>
            <br /><br /><br />

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
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#634F0C", // Setting the button color
              "&:hover": {
                backgroundColor: "#4a3809", // Slightly darker color for the hover effect
              },
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: 1000, // Ensures it's above other elements if there are overlays
            }}
            onClick={() => navigate("/store-in")}
          >
            Main Store In
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#634F0C", // Setting the button color
              "&:hover": {
                backgroundColor: "#4a3809", // Slightly darker color for the hover effect
              },
              position: "fixed",
              bottom: "20px",
              left: "20px",
              zIndex: 1000, // Ensures it's above other elements if there are overlays
            }}
            onClick={() => navigate("/store-out")}
          >
            Main Store Out
          </Button>
        </Box>
      </div>
    </>
  );
};

export default MainStore;
