import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../components/Header"; // Import the header 

const Dhal = () => {
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
              item.stockSpicesTypeIn === "Dhal" ||
              item.stockSpicesTypeOut === "Dhal"
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

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'storeType', headerName: 'Store Type', width: 130 },
    { field: 'stockSpicesType', headerName: 'Stock Spices Type', width: 180 },
    { field: 'storeKeeper', headerName: 'Store Keeper', width: 150 },
    { field: 'totalPrice', headerName: 'Total Price', width: 130 },
    { field: 'rate', headerName: 'Rate', width: 90 },
    { field: 'company', headerName: 'Company', width: 160 },
    { field: 'remark', headerName: 'Remark', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    { field: 'date', headerName: 'Date', width: 120 },
  ];

  return (
    <>
      <ResponsiveAppBar />
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Dhal
      </Typography>
      {/* <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/MainStore")}
      >
        Back to Store
      </Button> */}
      <Box sx={{ height: 400, width: '100%', marginTop: "20px" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSizeOptions={[5, 10]}
          getRowClassName={(params) =>
            params.row.storeType === "IN" ? "row-in" : "row-out"
          }
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
        />
      </Box>
      <style>{`
        .row-in {
          background-color: #FFFACD;
        }
        .row-out {
          background-color: #D3D3D3;
        }
      `}</style>
    </Box>
    </>
  );
};

export default Dhal;
