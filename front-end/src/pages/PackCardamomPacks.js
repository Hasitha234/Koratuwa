import * as React from 'react';
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../components/Header";

const PackCardamomPacks = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://diplomatic-beauty-production.up.railway.app/api/packing-store/all")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter(
          (item) =>
            item.storePackingTypeIn === "Cardamom Packs" ||
            item.storePackingTypeOut === "Cardamom Packs"
        );
        setData(filteredData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderValue = (value) => {
    return value === 0 ? "-" : value;
  };
  
  

  const columns = [
    { field: 'deliveryOrNot', headerName: 'Store Type', width: 150 },
    { field: 'storePackingTypeIn', headerName: 'Stock Spices Type', width: 180 },
    { field: 'outSpicesQuantity', headerName: 'Out Spices Quantity', width: 200, valueFormatter: (params) => renderValue(params.value) },
    { field: 'grindQuantity', headerName: 'Grind Quantity', width: 180, valueFormatter: (params) => renderValue(params.value) },
    { field: 'packetTypeIn', headerName: 'Packet Type', width: 150 },
    { field: 'packetQuantityIn', headerName: 'Packet Quantity', width: 180 },
    { field: 'nameIn', headerName: 'Name', width: 150 },
    { field: 'remarkIn', headerName: 'Remark', width: 150 },
    { field: 'createdAt', headerName: 'Date', width: 150  },
  ];

  return (
    <>
      <ResponsiveAppBar /><br/><br/>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Cardamom Packs
        </Typography><br/><br/>
        <div style={{ height: 400, width: '100%', marginTop: "20px" }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            checkboxSelection
          />
        </div>
      </Box>
    </>
  );
};

export default PackCardamomPacks;
