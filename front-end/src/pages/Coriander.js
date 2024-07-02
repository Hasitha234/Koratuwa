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

const Coriander = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching data from the API
    fetch(
      "https://diplomatic-beauty-production.up.railway.app/api/main-store/all"
    )
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data
          .filter(
            (item) =>
              item.stockSpicesTypeIn === "Coriander" ||
              item.stockSpicesTypeOut === "Coriander"
          )
          .map((item, index) => ({
            id: index + 1, // Add an id field for DataGrid
            storeType: item.storeType,
            stockSpicesType:
              item.storeType === "IN"
                ? item.stockSpicesTypeIn
                : item.stockSpicesTypeOut,
            storeKeeper:
              item.storeType === "IN"
                ? item.storeKeeperIn
                : item.storeKeeperOut,
            totalPrice: item.storeType === "IN" ? item.totalPriceIn : 0,
            rate: item.storeType === "IN" ? item.rateIn : 0,
            company: item.storeType === "IN" ? item.companyIn : "",
            remark: item.storeType === "IN" ? item.remarkIn : item.remarkOut,
            quantity:
              item.storeType === "IN" ? item.quantityIn : item.quantityOut,
            date: new Date(item.createdAt).toLocaleDateString("en-US"),
          }));
        setData(filteredData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Coriander
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/MainStore")}
      >
        Back to Store
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
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
              <TableRow
                key={row.id}
                sx={{
                  backgroundColor:
                    row.storeType === "IN" ? "#FFFACD" : "#D3D3D3",
                }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.storeType}</TableCell>
                <TableCell>{row.stockSpicesType}</TableCell>
                <TableCell>{row.storeKeeper}</TableCell>
                <TableCell>{row.totalPrice}</TableCell>
                <TableCell>{row.rate}</TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell>{row.remark}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Coriander;
