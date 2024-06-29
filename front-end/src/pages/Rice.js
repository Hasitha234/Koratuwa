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

const Rice = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://diplomatic-beauty-production.up.railway.app/api/main-store/all")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (item) =>
            item.stockSpicesTypeIn === "Rice" ||
            item.stockSpicesTypeOut === "Rice"
        );
        setData(filteredData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Rice
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/MainStore")}>
        Back to Store
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              
              <TableCell>Store Type</TableCell>
              <TableCell>Stock Spices Type</TableCell>
              <TableCell>Store Keeper</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Remark</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                
                <TableCell>{row.storeType}</TableCell>
                <TableCell>
                  {row.storeType === "IN"
                    ? row.stockSpicesTypeIn
                    : row.stockSpicesTypeOut}
                </TableCell>
                <TableCell>
                  {row.storeType === "IN"
                    ? row.storeKeeperIn
                    : row.storeKeeperOut}
                </TableCell>
                <TableCell>
                  {row.storeType === "IN" ? row.totalPriceIn : 0}
                </TableCell>
                <TableCell>
                  {row.storeType === "IN" ? row.rateIn : 0}
                </TableCell>
                <TableCell>
                  {row.storeType === "IN" ? row.companyIn : ""}
                </TableCell>
                <TableCell>
                  {row.storeType === "IN" ? row.remarkIn : row.remarkOut}
                </TableCell>
                <TableCell>
                  {row.storeType === "IN" ? row.quantityIn : row.quantityOut}
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

export default Rice;




