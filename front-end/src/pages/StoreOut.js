import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../components/Header";
import backgroundImage from "../images/123.jpg"; // import the background image

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

const StoreOut = () => {
  const [formValuesStoreOut, setFormValuesStoreOut] = useState({
    spiceType: "",
    storeKeeperName: "",
    quantity: "",
    remarks: "",
  });
  const [alertVisible, setAlertVisible] = useState(false);

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
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
        navigate("/MainStore"); // Navigate after successful submission
      }, 3000); // Hide the alert after 3 seconds
    } catch (error) {
      console.error("Error:", error);
      // Optionally show an error message to the user
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
          <Typography variant="h4" sx={{ marginBottom: '20px' }}>
            Main Store Out
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmitStoreOut}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
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
              <Button
                onClick={() => navigate("/MainStore")}
                variant="contained"
                sx={{
                  backgroundColor: "#634F0C",
                  "&:hover": { backgroundColor: "#8A6F12" },
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#A38214",
                  "&:hover": { backgroundColor: "#8A6F12" },
                }}
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
            zIndex: 9999,
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

export default StoreOut;
