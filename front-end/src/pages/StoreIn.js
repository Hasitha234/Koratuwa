import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResponsiveAppBar from "../components/Header";
import backgroundImage from "../images/dan-burton-lrHpdJ9r7sQ-unsplash.jpg";

const cardsData = [
  { title: "Dried Chilli" },
  { title: "Dried Turmeric" },
  { title: "Pepper Seeds" },
  { title: "Pepper Powder" },
  { title: "Cinnamon" },
  { title: "Gamboge" },
  { title: "Fennel Seeds" },
  { title: "Heenduru" },
  { title: "Coriander" },
  { title: "Mustard" },
  { title: "Fenugreek" },
  { title: "Cardamom" },
  { title: "Nutmeg Flowers" },
  { title: "Nutmeg" },
  { title: "Cloves" },
  { title: "Cinnamon Sticks" },
  { title: "Ginger" },
  { title: "Dhal" },
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
  const [alertVisible, setAlertVisible] = useState(false);

  const navigate = useNavigate();

  const handleChangeStoreIn = (event) => {
    const { name, value } = event.target;
    setFormValuesStoreIn({ ...formValuesStoreIn, [name]: value });
  };

  const handleSubmitStoreIn = async (event) => {
    event.preventDefault();
    const dataToSend = { storeType: "IN", ...formValuesStoreIn };
    try {
      await axios.post('https://diplomatic-beauty-production.up.railway.app/api/main-store/save', dataToSend);
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
        navigate('/MainStore');
      }, 3000); // Hide the alert after 3 seconds
    } catch (error) {
      console.error("Error saving data to the database:", error);
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
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
            Main Store In
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
              <Button
                onClick={() => navigate('/MainStore')}
                variant="contained"
                sx={{ backgroundColor: '#634F0C', '&:hover': { backgroundColor: '#8A6F12' } }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: '#A38214', '&:hover': { backgroundColor: '#8A6F12' } }}
              >
                Submit
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

export default StoreIn;
