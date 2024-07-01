import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../components/Header";
import backgroundImage from "../images/123.jpg";
import TextField from "@mui/material/TextField";
import TableSortLabel from "@mui/material/TableSortLabel";

const cardsData = [
  { title: "Chilli Pieces", path: "/chilli-pieces" },
  { title: "Chilli Powder", path: "/chilli-powder" },
  { title: "Turmeric Powder", path: "/turmeric-powder" },
  { title: "Pepper Powder Pack", path: "/pepper-powder-pack" },
  { title: "Curry Powder", path: "/curry-powder" },
  { title: "Fried Curry Powder", path: "/fried-curry-powder" },
  { title: "Meat Curry Powder", path: "/meat-curry-powder" },
  { title: "Mustard Powder", path: "/mustard-powder" },
  { title: "Mustard Seeds", path: "/mustard-seeds" },
  { title: "Fenugreek Pack", path: "/fenugreek-pack" },
  { title: "Cinnamon Pack", path: "/cinnamon-pack" },
  { title: "Gamboge Pack", path: "/gamboge-pack" },
  { title: "Tea Powder", path: "/tea-powder" },
  { title: "Clove Packs", path: "/clove-packs" },
  { title: "Cardamom Packs", path: "/cardamom-packs" },
  { title: "Suwada Hatha", path: "/suwada-hatha" },
];

const BasicCard = ({ title, onClick }) => (
  <Button
    component={Card}
    sx={{ minWidth: 275, marginBottom: 2, backgroundColor: "white" }}
    onClick={onClick}
  >
    <CardContent>
      <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
        {title}
      </Typography>
    </CardContent>
  </Button>
);

const PackingStore = () => {
  const [packingData, setPackingData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://diplomatic-beauty-production.up.railway.app/api/packing-store/all")
      .then((response) => {
        const data = response.data;

        // Calculate packet quantity
        const processedData = data.map((item) => {
          const { storePackingTypeIn, packetTypeIn, deliveryOrNot, packetQuantityIn } = item;

          const packetQuantity =
            deliveryOrNot === "Direct"
              ? parseFloat(packetQuantityIn)
              : deliveryOrNot === "Return"
              ? parseFloat(packetQuantityIn)
              : -parseFloat(packetQuantityIn);

          return {
            stockSpicesType: storePackingTypeIn,
            packetType: packetTypeIn,
            packetQuantity,
          };
        });

        // Group and sort by stockSpicesType and packetType
        const groupedData = processedData.reduce((acc, item) => {
          const { stockSpicesType, packetType, packetQuantity } = item;
          const key = `${stockSpicesType}-${packetType}`;
          if (!acc[key]) {
            acc[key] = { stockSpicesType, packetType, packetQuantity: 0 };
          }
          acc[key].packetQuantity += packetQuantity;
          return acc;
        }, {});

        // Convert to array and sort
        const sortedData = Object.values(groupedData).sort((a, b) => {
          if (sortConfig.key !== "") {
            if (a[sortConfig.key] < b[sortConfig.key]) {
              return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
              return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
          }
          return 0;
        });

        setPackingData(sortedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [sortConfig]);

  const handleCardClick = (path) => {
    navigate(path);
  };

  const handleSortRequest = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = packingData.filter((row) =>
    `${row.stockSpicesType.toLowerCase()} ${row.packetType.toLowerCase()}`.includes(searchTerm.toLowerCase())
  );

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      zIndex: 0,
    },
  };

  return (
    <>
      <ResponsiveAppBar />
      <div style={{ ...styles.container, paddingTop: "20px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
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
              <Typography variant="h2" sx={{ flexGrow: 1, color: '#634F0C' }} align="center">
                <b>Packing Store</b>
              </Typography>
              
            </Box>
            <br/><br/><br/>

            {/* Cards section */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                maxWidth: "1200px", // You can adjust the maxWidth as needed
              }}
            >
              {cardsData.map((card, index) => (
                <BasicCard
                  key={index}
                  title={card.title}
                  onClick={() => handleCardClick(card.path)}
                />
              ))}
            </Box>
          </Box>

         

          {/* Footer section */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#634F0C", // Setting the button color
              "&:hover": {
                backgroundColor: "#4a3809", // Slightly darker color for the hover effect
              },
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: 1000, // Ensures it's above other elements if there are overlays
            }}
            onClick={() => navigate("/packing-in")}
          >
            Update Packing Store
          </Button>
        </Box>
        
      </div>
      <div>
         {/* Table section */}
         <Box>
          <br/>
         <TextField
         sx={{left: "25px"}}
                label="Search"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={handleSearchChange}
              /> <br/>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === "stockSpicesType"}
                        direction={sortConfig.key === "stockSpicesType" ? sortConfig.direction : "asc"}
                        onClick={() => handleSortRequest("stockSpicesType")}
                      >
                        <b>Stock Spices Type</b>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === "packetType"}
                        direction={sortConfig.key === "packetType" ? sortConfig.direction : "asc"}
                        onClick={() => handleSortRequest("packetType")}
                      >
                        <b>Packet Type</b>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === "packetQuantity"}
                        direction={sortConfig.key === "packetQuantity" ? sortConfig.direction : "asc"}
                        onClick={() => handleSortRequest("packetQuantity")}
                      >
                        <b>Packet Quantity</b>
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.stockSpicesType}</TableCell>
                      <TableCell>{row.packetType}</TableCell>
                      <TableCell>{row.packetQuantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
      </div>
    </>
  );
};

export default PackingStore;
