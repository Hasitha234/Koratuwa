import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import backgroundImage from "../images/dan-burton-lrHpdJ9r7sQ-unsplash.jpg"; // Adjust the path as per your project structure

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

const App = () => {
  const [openStoreIn, setOpenStoreIn] = useState(false);
  const [openStoreOut, setOpenStoreOut] = useState(false);
  const [formValuesStoreIn, setFormValuesStoreIn] = useState({
    spiceType: "",
    storeKeeperName: "",
    quantity: "",
    totalPrice: "",
    rate: "",
    company: "",
    remarks: "",
  });

  const [formValuesStoreOut, setFormValuesStoreOut] = useState({
    spiceType: "",
    storeKeeperName: "",
    quantity: "",
    remarks: "",
  });

  const navigate = useNavigate(); // Use the hook

  const handleClickOpenStoreIn = () => {
    setOpenStoreIn(true);
  };

  const handleClickOpenStoreOut = () => {
    setOpenStoreOut(true);
  };

  const handleCloseStoreIn = () => {
    setOpenStoreIn(false);
  };

  const handleCloseStoreOut = () => {
    setOpenStoreOut(false);
  };

  const handleChangeStoreIn = (event) => {
    const { name, value } = event.target;
    setFormValuesStoreIn({ ...formValuesStoreIn, [name]: value });
  };

  const handleChangeStoreOut = (event) => {
    const { name, value } = event.target;
    setFormValuesStoreOut({ ...formValuesStoreOut, [name]: value });
  };

  const handleSubmitStoreIn = (event) => {
    event.preventDefault();
    // Handle form submission for Store In here (e.g., send data to API)
    console.log(formValuesStoreIn);
    handleCloseStoreIn();
  };

  const handleSubmitStoreOut = (event) => {
    event.preventDefault();
    // Handle form submission for Store Out here (e.g., send data to API)
    console.log(formValuesStoreOut);
    handleCloseStoreOut();
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
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Spice Store
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/Home')} // Use navigate
          >
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
        <Button
          variant="contained"
          color="primary"
          sx={{ marginRight: "10px" }}
          onClick={handleClickOpenStoreIn}
        >
          Store In
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickOpenStoreOut}
        >
          Store Out
        </Button>
      </Box>

      {/* Store In Dialog */}
      <Dialog open={openStoreIn} onClose={handleCloseStoreIn}>
        <DialogTitle>Store In</DialogTitle>
        <DialogContent>
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
              <Button onClick={handleCloseStoreIn} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Store Out Dialog */}
      <Dialog open={openStoreOut} onClose={handleCloseStoreOut}>
        <DialogTitle>Store Out</DialogTitle>
        <DialogContent>
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
              <Button onClick={handleCloseStoreOut} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default App;
