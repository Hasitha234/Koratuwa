import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

const cardsData = [
  { title: "Chilli pieces" },
  { title: "Pepper powder" },
  { title: "Yellow powder" },
  { title: "Pepper powder" },
  { title: "Curry powder" },
  { title: "Fried three and five" },
  { title: "Muscari" },
  { title: "Mustard powder" },
  { title: "Mustard seeds" },
  { title: "fenugreek" },
  { title: "Cinnamon" },
  { title: "Snoring" },
  { title: "Tea powder" },
  { title: "Caraway vines" },
  { title: "Cardamom vine" },
  { title: "Suwada hatha" },
];

const packetTypes = [
  { title: "25g" },
  { title: "50g" },
  { title: "100g" },
  { title: "250g" },
  { title: "500g" },
  { title: "1kg" },
];

const PackingOut = () => {
  const [formValues, setFormValues] = useState({
    packingType: "",
    spicesQuantity: "",
    packetType: "",
    packetQuantity: "",
    name: "",
    remark: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      deliveryOrNot: "No",
      storePackingTypeOut: formValues.packingType,
      packetTypeOut: formValues.packetType,
      packetQuantityOut: formValues.packetQuantity,
      nameOut: formValues.name,
      remarkOut: formValues.remark,
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
      navigate('/'); // Navigate back to the main store page
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Store Out
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
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
        <TextField
          label="Spices Quantity"
          name="spicesQuantity"
          type="number"
          value={formValues.spicesQuantity}
          onChange={handleChange}
          fullWidth
          required
        />
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
          <Button onClick={() => navigate('/')} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Box>
  );
};

export default PackingOut;
