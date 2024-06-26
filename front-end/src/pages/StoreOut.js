import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

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

const StoreOut = () => {
  const [formValuesStoreOut, setFormValuesStoreOut] = useState({
    spiceType: "",
    storeKeeperName: "",
    quantity: "",
    remarks: "",
  });

  const navigate = useNavigate(); // Use the hook

  const handleChangeStoreOut = (event) => {
    const { name, value } = event.target;
    setFormValuesStoreOut({ ...formValuesStoreOut, [name]: value });
  };

  const handleSubmitStoreOut = async (event) => {
    event.preventDefault();

    const data = {
      storeType: "OUT",
      stockSpicesTypeOut: formValuesStoreOut.spiceType,
      storeKeeperOut: formValuesStoreOut.storeKeeperName,
      quantityOut: parseInt(formValuesStoreOut.quantity, 10),
      remarkOut: formValuesStoreOut.remarks,
    };

    try {
      const response = await fetch(
        "https://diplomatic-beauty-production.up.railway.app/api/main-store/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
      navigate(); // Navigate back to the main store page
    } catch (error) {
      console.error("Error:", error);
    }
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
        Store Out
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmitStoreOut}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          select
          label="Spice Type"
          name="spiceType"
          value={formValuesStoreOut.spiceType}
          onChange={handleChangeStoreOut}
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
          value={formValuesStoreOut.storeKeeperName}
          onChange={handleChangeStoreOut}
          fullWidth
          required
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          value={formValuesStoreOut.quantity}
          onChange={handleChangeStoreOut}
          fullWidth
          required
        />
        <TextField
          label="Remarks"
          name="remarks"
          value={formValuesStoreOut.remarks}
          onChange={handleChangeStoreOut}
          fullWidth
          required
        />
        <DialogActions>
          <Button onClick={() => navigate()} color="primary">
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

export default StoreOut;
