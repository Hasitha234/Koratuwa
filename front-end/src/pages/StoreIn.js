import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

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
    stockSpicesTypeIn: "",
    storeKeeperIn: "",
    quantityIn: "",
    totalPriceIn: "",
    rateIn: "",
    companyIn: "",
    remarkIn: "",
  });

  const navigate = useNavigate(); // Use the hook

  const handleChangeStoreIn = (event) => {
    const { name, value } = event.target;
    setFormValuesStoreIn({ ...formValuesStoreIn, [name]: value });
  };

  const handleSubmitStoreIn = async (event) => {
    event.preventDefault();
    // Add storeType to the form data
    const dataToSend = { storeType: "IN", ...formValuesStoreIn };
    try {
      await axios.post('https://diplomatic-beauty-production.up.railway.app/api/main-store/save', dataToSend);
       
    } catch (error) {
      console.error("Error saving data to the database:", error);
      // Handle error appropriately here (e.g., show a message to the user)
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "20px", padding: "40px"}}>
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
            name="stockSpicesTypeIn"
            id="stockSpicesTypeIn"
            value={formValuesStoreIn.stockSpicesTypeIn}
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
            name="storeKeeperIn"
            id="storeKeeperIn"
            value={formValuesStoreIn.storeKeeperIn}
            onChange={handleChangeStoreIn}
            fullWidth
            required
          />
          <TextField
            label="Quantity"
            name="quantityIn"
            id="quantityIn"
            type="number"
            value={formValuesStoreIn.quantityIn}
            onChange={handleChangeStoreIn}
            fullWidth
            required
          />
          <TextField
            label="Total Price"
            name="totalPriceIn"
            id="totalPriceIn"
            type="number"
            value={formValuesStoreIn.totalPriceIn}
            onChange={handleChangeStoreIn}
            fullWidth
            required
          />
          <TextField
            label="Rate"
            name="rateIn"
            id="rateIn"
            type="number"
            value={formValuesStoreIn.rateIn}
            onChange={handleChangeStoreIn}
            fullWidth
            required
          />
          <TextField
            label="Company Name"
            name="companyIn"
            id="companyIn"
            value={formValuesStoreIn.companyIn}
            onChange={handleChangeStoreIn}
            fullWidth
            required
          />
          <TextField
            label="Remarks"
            name="remarkIn"
            id="remarkIn"
            value={formValuesStoreIn.remarkIn}
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
    </div>
  );
};

export default StoreIn;
