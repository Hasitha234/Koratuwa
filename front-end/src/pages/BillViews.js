import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../components/Header';

const BillViews = () => {
  const [data, setData] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://diplomatic-beauty-production.up.railway.app/api/bills/all')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleRowClick = (params) => {
    setSelectedBill(params.row);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedBill(null);
  };

  const columns = [
    { field: 'billNo', headerName: 'Bill No', width: 250 },
    { field: 'date', headerName: 'Date', width: 280 },
    { field: 'customerName', headerName: 'Customer Name', width: 300 },
    { field: 'mobile', headerName: 'Mobile', width: 280 },
    { field: 'returnOrNot', headerName: 'Return ', width: 280 },
    {
      field: 'viewDetails',
      headerName: 'View Details',
      width: 200,
      renderCell: (params) => (
        <Button sx={{
          backgroundColor: '#634F0C',
          '&:hover': {
            backgroundColor: '#4a3809'
          }
        }} variant="contained" onClick={() => handleRowClick(params)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <>
      <ResponsiveAppBar /><br/><br/>
      <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Bill Information
        </Typography><br/><br/>
        <div style={{ height: 400, width: '100%', marginTop: '50px' }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            checkboxSelection
            getRowId={(row) => row.id}
          />
        </div>
      </Box>
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle><b><h4>Bill Details</h4></b></DialogTitle>
        <DialogContent>
          {selectedBill && (
            <div>
              <Typography variant="body1"><strong>Bill No:</strong> {selectedBill.billNo}</Typography>
              <Typography variant="body1"><strong>Date:</strong> {selectedBill.date}</Typography>
              <Typography variant="body1"><strong>Customer Name:</strong> {selectedBill.customerName}</Typography>
              <Typography variant="body1"><strong>Mobile:</strong> {selectedBill.mobile}</Typography>
              <Typography variant="body1"><strong>Address:</strong> {selectedBill.address}</Typography>
              <Typography variant="body1"><strong>Total:</strong> {selectedBill.total}</Typography>
              <Typography variant="body1"><strong>Returns:</strong> {selectedBill.returns}</Typography>
              <Typography variant="body1"><strong>Net Total:</strong> {selectedBill.netTotal}</Typography>
              <Typography variant="body1"><strong>Received By:</strong> {selectedBill.receivedBy}</Typography>
              <Typography variant="body1"><strong>Sales Ref By:</strong> {selectedBill.salesRefBy}</Typography>
              <Typography variant="body1"><strong>Return Or Not:</strong> {selectedBill.returnOrNot}</Typography><br/>
              <Typography variant="body1"><strong>Products:</strong></Typography>
              <ul>
                {selectedBill.products.map((product, index) => (
                  <li key={index}>
                    {product.product} - {product.type} - {product.quantity} - {product.rate} - {product.price}
                  </li>
                ))}
              </ul>
              <Typography variant="body1"><strong>Return Details:</strong></Typography>
              <ul>
                {selectedBill.returnDetails.map((detail, index) => (
                  <li key={index}>
                    {detail.spicesType} - {detail.packetType} - {detail.quantity} - {detail.rate} - {detail.price}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BillViews;
