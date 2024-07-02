import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../components/Header";
import backgroundImage from "../images/123.jpg"; // import the background image

const cardsData = [
  { title: "Chilli Pieces" },
  { title: "Chilli Powder" },
  { title: "Turmeric Powder" },
  { title: "Pepper Powder Pack" },
  { title: "Curry Powder" },
  { title: "Fried Curry Powder" },
  { title: "Meat Curry Powder" },
  { title: "Mustard Powder" },
  { title: "Mustard Seeds" },
  { title: "Fenugreek Pack" },
  { title: "Cinnamon Pack" },
  { title: "Gamboge Pack" },
  { title: "Tea Powder" },
  { title: "Clove Packs" },
  { title: "Cardamom Packs" },
  { title: "Suwada Hatha" },
];

const packetTypes = [
  { title: "25g" },
  { title: "50g" },
  { title: "100g" },
  { title: "250g" },
  { title: "500g" },
  { title: "1kg" },
];

const PackingIn = () => {
  const [formValues, setFormValues] = useState({
    delivery: "Direct",
    packingType: "",
    spicesQuantity: "",
    packetType: "",
    grindQuantity: "",
    packetQuantity: "",
    name: "",
    remark: "",
  });
  const [alertVisible, setAlertVisible] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleChipClick = (value) => {
    setFormValues({ ...formValues, delivery: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      deliveryOrNot: formValues.delivery,
      storePackingTypeIn: formValues.packingType,
      outSpicesQuantity: parseFloat(formValues.spicesQuantity),
      packetTypeIn: formValues.packetType,
      grindQuantity: parseFloat(formValues.grindQuantity),
      packetQuantityIn: formValues.packetQuantity,
      nameIn: formValues.name,
      remarkIn: formValues.remark,
    };

    try {
      const response = await fetch("https://diplomatic-beauty-production.up.railway.app/api/packing-store/save", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
        navigate("/PackingStore"); // Navigate back to the PackingStore page
      }, 3000); // Hide the alert after 3 seconds
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
    <ResponsiveAppBar />
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box 
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.8)', 
          padding: '20px', 
          borderRadius: '10px',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Packing Store
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl component="fieldset">
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Chip 
                label="Direct" 
                onClick={() => handleChipClick("Direct")} 
                sx={{ backgroundColor: formValues.delivery === "Direct" ? '#A38214' : 'default', color: formValues.delivery === "Direct" ? 'white' : 'default' }}
              />
              <Chip 
                label="Delivery" 
                onClick={() => handleChipClick("Delivery")} 
                sx={{ backgroundColor: formValues.delivery === "Delivery" ? '#A38214' : 'default', color: formValues.delivery === "Delivery" ? 'white' : 'default' }}
              />
              <Chip 
                label="Return" 
                onClick={() => handleChipClick("Return")} 
                sx={{ backgroundColor: formValues.delivery === "Return" ? '#A38214' : 'default', color: formValues.delivery === "Return" ? 'white' : 'default' }}
              />
              
            </Box>
          </FormControl>
          
          <TextField
            select
            label="Packing Type"
            name="packingType"
            value={formValues.packingType}
            onChange={handleChange}
            fullWidth
            required
          >
            {cardsData.map((option) => (
              <MenuItem key={option.title} value={option.title}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>

          {formValues.delivery === "Direct" && (
            <>
              <TextField
                label="Out Spices Quantity"
                name="spicesQuantity"
                type="number"
                value={formValues.spicesQuantity}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Grind Quantity"
                name="grindQuantity"
                type="number"
                value={formValues.grindQuantity}
                onChange={handleChange}
                fullWidth
                required
              />
            </>
          )}

          <TextField
            select
            label="Packet Type"
            name="packetType"
            value={formValues.packetType}
            onChange={handleChange}
            fullWidth
            required
          >
            {packetTypes.map((option) => (
              <MenuItem key={option.title} value={option.title}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Packet Quantity"
            name="packetQuantity"
            type="number"
            value={formValues.packetQuantity}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Remark"
            name="remark"
            value={formValues.remark}
            onChange={handleChange}
            fullWidth
          />
          <DialogActions>
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ backgroundColor: '#A38214', '&:hover': { backgroundColor: '#8A6F12' } }}
            >
              Save
            </Button>
            <Button
              onClick={() => navigate("/PackingStore")}
              variant="contained"
              sx={{ backgroundColor: '#634F0C', '&:hover': { backgroundColor: '#8A6F12' } }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Box>
    {alertVisible && (
      <Box 
        sx={{ 
          position: 'fixed', 
          bottom: '20px', 
          right: '20px', 
          zIndex: 9999 
        }}
      >
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Here is a gentle confirmation that your action was successful.
        </Alert>
      </Box>
    )}
    </>
  );
};

export default PackingIn;
