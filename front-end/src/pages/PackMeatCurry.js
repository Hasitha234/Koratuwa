// src/DriedChilli.js
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
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

const PackChilliPieces = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://diplomatic-beauty-production.up.railway.app/api/packing-store/all")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (item) =>
            item.storePackingTypeIn === "Meat Curry Powder" ||
            item.storePackingTypeOut === "Meat Curry Powder"
        );
        setData(filteredData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderValue = (value) => {
    return value === 0 ? "-" : value;
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
      Meat Curry Powder
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/PackingStore")}>
        Back to Store
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Store Type</TableCell>
              <TableCell>Stock Spices Type</TableCell>
              <TableCell>Out Spices Quantity</TableCell>
              <TableCell>Grind Quantity</TableCell>
              <TableCell>Packet Type</TableCell>
              <TableCell>Packet Quantity</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Remark</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.deliveryOrNot}</TableCell>
                <TableCell>
                  {row.deliveryOrNot === "No"||"Yes" ? row.storePackingTypeIn : row.storePackingTypeOut}
                </TableCell>
                <TableCell>
                  {row.outSpicesQuantity ? renderValue(row.grindQuantity) : "-"}
                </TableCell>
                <TableCell>
                  {row.deliveryOrNot === "No"||"Yes" ? renderValue(row.grindQuantity) : "-"}
                </TableCell>
                <TableCell>
                  {row.deliveryOrNot === "No"||"Yes" ? row.packetTypeIn : row.packetTypeOut}
                </TableCell>
                
                <TableCell>
                  {row.deliveryOrNot === "No"||"Yes" ? row.packetQuantityIn : row.packetQuantityOut}
                </TableCell>
                <TableCell>
                  {row.deliveryOrNot === "No"||"Yes" ? row.nameIn : row.nameOut}
                </TableCell>
                <TableCell>
                  {row.deliveryOrNot === "No"||"Yes" ? row.remarkIn : row.remarkOut}
                </TableCell>
                <TableCell>
  {new Date(row.createdAt).toLocaleDateString('en-US')}
</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PackChilliPieces;
