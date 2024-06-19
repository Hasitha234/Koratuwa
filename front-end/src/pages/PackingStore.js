// src/App.js
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
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import backgroundImage from "../images/dan-burton-lrHpdJ9r7sQ-unsplash.jpg";
import { useNavigate } from "react-router-dom"; // Ensure this import

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

const BasicCard = ({ title }) => (
  <Button
    component={Card}
    sx={{ minWidth: 275, marginBottom: 2, backgroundColor: "white" }}
  >
    <CardContent>
      <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
        {title}
      </Typography>
    </CardContent>
  </Button>
);

const App = () => {
  const [openStoreIn, setOpenStoreIn] = useState(false);
  const [openStoreOut, setOpenStoreOut] = useState(false);
  const [formValuesStoreIn, setFormValuesStoreIn] = useState({
    delivery: "no",
    packingType: "",
    spicesQuantity: "",
    packetType: "",
    grindQuantity: "",
    packetQuantity: "",
    name: "",
    remark: "",
  });
  const [formValuesStoreOut, setFormValuesStoreOut] = useState({
    packingType: "",
    spicesQuantity: "",
    packetType: "",
    packetQuantity: "",
    name: "",
    remark: "",
  });

  const navigate = useNavigate(); // Use navigate here

  const handleClickOpenStoreIn = () => {
    setOpenStoreIn(true);
  };

  const handleCloseStoreIn = () => {
    setOpenStoreIn(false);
  };

  const handleChangeStoreIn = (event) => {
    const { name, value } = event.target;
    setFormValuesStoreIn({ ...formValuesStoreIn, [name]: value });
  };

  const handleSubmitStoreIn = (event) => {
    event.preventDefault();
    // Handle form submission for Store In here (e.g., send data to API)
    console.log(formValuesStoreIn);
    handleCloseStoreIn();
  };

  const handleClickOpenStoreOut = () => {
    setOpenStoreOut(true);
  };

  const handleCloseStoreOut = () => {
    setOpenStoreOut(false);
  };

  const handleChangeStoreOut = (event) => {
    const { name, value } = event.target;
    setFormValuesStoreOut({ ...formValuesStoreOut, [name]: value });
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
            onClick={() => navigate("/Home")} // Use navigate here
          >
            Home
          </Button>
        </Box>

        {/* Cards section */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {cardsData.map((card, index) => (
            <BasicCard key={index} title={card.title} />
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
            <FormControl component="fieldset">
              <Typography>Delivery</Typography>
              <RadioGroup
                row
                name="delivery"
                value={formValuesStoreIn.delivery}
                onChange={handleChangeStoreIn}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <TextField
              select
              label="Packing Type"
              name="packingType"
              value={formValuesStoreIn.packingType}
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
              label="Spices Quantity"
              name="spicesQuantity"
              type="number"
              value={formValuesStoreIn.spicesQuantity}
              onChange={handleChangeStoreIn}
              fullWidth
              required
            />
            <TextField
              select
              label="Packet Type"
              name="packetType"
              value={formValuesStoreIn.packetType}
              onChange={handleChangeStoreIn}
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
              label="Grind Quantity"
              name="grindQuantity"
              type="number"
              value={formValuesStoreIn.grindQuantity}
              onChange={handleChangeStoreIn}
              fullWidth
              required
            />
            <TextField
              label="Packet Quantity"
              name="packetQuantity"
              type="number"
              value={formValuesStoreIn.packetQuantity}
              onChange={handleChangeStoreIn}
              fullWidth
              required
            />
            <TextField
              label="Name"
              name="name"
              value={formValuesStoreIn.name}
              onChange={handleChangeStoreIn}
              fullWidth
              required
            />
            <TextField
              label="Remark"
              name="remark"
              value={formValuesStoreIn.remark}
              onChange={handleChangeStoreIn}
              fullWidth
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
              label="Packing Type"
              name="packingType"
              value={formValuesStoreOut.packingType}
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
              label="Spices Quantity"
              name="spicesQuantity"
              type="number"
              value={formValuesStoreOut.spicesQuantity}
              onChange={handleChangeStoreOut}
              fullWidth
              required
            />
            <TextField
              select
              label="Packet Type"
              name="packetType"
              value={formValuesStoreOut.packetType}
              onChange={handleChangeStoreOut}
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
              value={formValuesStoreOut.packetQuantity}
              onChange={handleChangeStoreOut}
              fullWidth
              required
            />
            <TextField
              label="Name"
              name="name"
              value={formValuesStoreOut.name}
              onChange={handleChangeStoreOut}
              fullWidth
              required
            />
            <TextField
              label="Remark"
              name="remark"
              value={formValuesStoreOut.remark}
              onChange={handleChangeStoreOut}
              fullWidth
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
