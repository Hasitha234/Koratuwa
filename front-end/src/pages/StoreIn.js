import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from 'react-router-dom';

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

const StoreIn = () => {
  const [formValuesStoreIn, setFormValuesStoreIn] = useState({
    spiceType: "",
    storeKeeperName: "",
    quantity: "",
    totalPrice: "",
    rate: "",
    company: "",
    remarks: "",
  });

  const navigate = useNavigate(); // Use the hook

  const handleChangeStoreIn = (event) => {
    const { name, value } = event.target;
    setFormValuesStoreIn({ ...formValuesStoreIn, [name]: value });
  };

  const handleSubmitStoreIn = (event) => {
    event.preventDefault();
    // Handle form submission for Store In here (e.g., send data to API)
    console.log(formValuesStoreIn);
    navigate('/'); // Navigate back to the main store page
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Store In
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmitStoreIn}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          select
          label="Spice Type"
          name="spiceType"
          value={formValuesStoreIn.spiceType}
          onChange={handleChangeStoreIn}
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
          label="Store Keeper Name"
          name="storeKeeperName"
          value={formValuesStoreIn.storeKeeperName}
          onChange={handleChangeStoreIn}
          fullWidth
          required
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          value={formValuesStoreIn.quantity}
          onChange={handleChangeStoreIn}
          fullWidth
          required
        />
        <TextField
          label="Total Price"
          name="totalPrice"
          type="number"
          value={formValuesStoreIn.totalPrice}
          onChange={handleChangeStoreIn}
          fullWidth
          required
        />
        <TextField
          label="Rate"
          name="rate"
          type="number"
          value={formValuesStoreIn.rate}
          onChange={handleChangeStoreIn}
          fullWidth
          required
        />
        <TextField
          label="Company Name"
          name="company"
          value={formValuesStoreIn.company}
          onChange={handleChangeStoreIn}
          fullWidth
          required
        />
        <TextField
          label="Remarks"
          name="remarks"
          value={formValuesStoreIn.remarks}
          onChange={handleChangeStoreIn}
          fullWidth
          required
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

export default StoreIn;
