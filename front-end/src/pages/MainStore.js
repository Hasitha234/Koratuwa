import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import backgroundImage from "../images/pratiksha-mohanty-BwpKvFuPm_U-unsplash.jpg"; // Adjust the path as per your project structure

const cardsData = [
  { title: "Chilli pods" },
  { title: "Dry yellow" },
  { title: "Peppercorns" },
  { title: "Pepper powder" },
  { title: "Cinnamon" },
  { title: "Snoring" },
  { title: "Doctor" },
  { title: "Hinduru" },
  { title: "Coriander" },
  { title: "Mustard" },
  { title: "Fenugreek" },
  { title: "Cardamom" },
  { title: "Nutmeg flowers" },
  { title: "Nutmeg" },
  { title: "Cloves" },
  { title: "Cinnamon sticks" },
  { title: "Ginger flakes" },
  { title: "Lentils" },
  { title: "Rice" },
];

const BasicCard = ({ title, description }) => (
  <Button
    component={Card}
    sx={{ minWidth: 275, marginBottom: 2, backgroundColor: "white" }}
  >
    <CardContent>
      <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Button>
);

const App = () => (
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
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          Spice Store
        </Typography>
        <Button variant="contained" color="primary">
          Home
        </Button>
      </Box>

      {/* Cards section */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {cardsData.map((card, index) => (
          <BasicCard
            key={index}
            title={card.title}
            description={card.description}
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
      }}
    >
      <Button variant="contained" color="primary" sx={{ marginRight: "10px" }}>
        Store In
      </Button>
      <Button variant="contained" color="secondary">
        Store Out
      </Button>
    </Box>
  </Box>
);

export default App;
