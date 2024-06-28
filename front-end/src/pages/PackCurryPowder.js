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

const PackCurryPowder = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://diplomatic-beauty-production.up.railway.app/api/packing-store/all")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (item) =>
            item.storePackingTypeIn === "Curry Powder" ||
            item.storePackingTypeOut === "Curry Powder"
        );
        setData(filteredData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Curry Powder
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/PackingStore")}>
        Back to Store
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Delivery Or Not</TableCell>
              <TableCell>Stock Spices Type</TableCell>
              <TableCell>Out Spices Quantity</TableCell>
              <TableCell>Packet Type</TableCell>
              <TableCell>Grind Quantity</TableCell>
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
                  {row.deliveryOrNot === "No"||"Yes" ? row.outSpicesQuantity : row.outSpicesQuantity}
                </TableCell>
                <TableCell>
                  {row.deliveryOrNot === "No"||"Yes" ? row.packetTypeIn : row.packetTypeOut}
                </TableCell>
                <TableCell>
                  {row.deliveryOrNot === "No"||"Yes" ? row.grindQuantity : 0}
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
                  {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "Invalid Date"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PackCurryPowder;
