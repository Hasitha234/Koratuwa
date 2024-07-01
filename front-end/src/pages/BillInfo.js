import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from '../components/Header';

import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';

const predefinedTypes = ['50g', '100g', '200g', '500g', '1kg', '2kg', '5kg', '10kg'];

const BillInfo = () => {
  const [formData, setFormData] = useState({
    billNo: '',
    date: '',
    saleRef: '',
    mobile: '',
    customerName: '',
    address: '',
    total: 0,
    returns: 0,
    netTotal: 0,
    receivedBy: '',
    salesRefBy: '',
    products: [
      { product: '', type: '', quantity: 0, rate: 0, price: 0, showDetails: true }
    ]
  });

  // Calculate total whenever products change
  useEffect(() => {
    const calculateTotal = () => {
      const totalPrice = formData.products.reduce((acc, product) => acc + parseFloat(product.price), 0);
      setFormData(prevState => ({
        ...prevState,
        total: totalPrice
      }));
    };

    calculateTotal();
  }, [formData.products]);

  // Calculate netTotal whenever returns or total changes
  useEffect(() => {
    const calculateNetTotal = () => {
      const netPrice = formData.total - parseFloat(formData.returns);
      setFormData(prevState => ({
        ...prevState,
        netTotal: netPrice
      }));
    };

    calculateNetTotal();
  }, [formData.total, formData.returns]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedProducts = [...formData.products];
    updatedProducts[index] = { ...updatedProducts[index], [name]: value };

    // Calculate price when quantity or rate changes
    if (name === 'quantity' || name === 'rate') {
      const quantity = parseFloat(updatedProducts[index].quantity);
      const rate = parseFloat(updatedProducts[index].rate);
      updatedProducts[index].price = (quantity * rate).toFixed(2); // Ensure price is rounded to 2 decimal places
    }

    setFormData({ ...formData, products: updatedProducts });
  };
  
  const handleTypeChange = (index, event, newValue) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index] = { ...updatedProducts[index], type: newValue };
    setFormData({ ...formData, products: updatedProducts });
  };

  const handleAddProduct = () => {
    setFormData({
      ...formData,
      products: [
        ...formData.products,
        { product: '', type: '', quantity: 0, rate: 0, price: 0, showDetails: true }
      ]
    });
  };

  const toggleProductDetails = (index) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index].showDetails = !updatedProducts[index].showDetails;
    setFormData({ ...formData, products: updatedProducts });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://diplomatic-beauty-production.up.railway.app/api/bills/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Bill saved successfully!');
        setFormData({
          billNo: '',
          date: '',
          saleRef: '',
          mobile: '',
          customerName: '',
          address: '',
          total: 0,
          returns: 0,
          netTotal: 0,
          receivedBy: '',
          salesRefBy: '',
          products: [
            { product: '', type: '', quantity: 0, rate: 0, price: 0, showDetails: true }
          ]
        });
      } else {
        alert('Failed to save bill');
      }
    } catch (error) {
      console.error('Error saving bill:', error);
      alert('An error occurred while saving the bill');
    }
  };

  return (
    <>
      <ResponsiveAppBar /> <br/><br/>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '32px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '600px'
        }}>
          <Typography style={{
            textAlign: 'center',
            color: '#634F0C'
          }} variant="h4" component="h1" gutterBottom>
            Billing Information
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Bill No"
              variant="outlined"
              value={formData.billNo}
              onChange={(e) => setFormData({ ...formData, billNo: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Sale Reference"
              variant="outlined"
              value={formData.saleRef}
              onChange={(e) => setFormData({ ...formData, saleRef: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Mobile"
              variant="outlined"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Customer Name"
              variant="outlined"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Address"
              variant="outlined"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            
            {formData.products.map((product, index) => (
              <div key={index} style={{
                marginTop: '16px',
                marginBottom: '16px',
                padding: '16px',
                border: '1px solid #e0e0e0',
                borderRadius: '8px'
              }}>
                <Typography variant="h6" component="h2" onClick={() => toggleProductDetails(index)} style={{ cursor: 'pointer' }}>
                  Product - {index + 1} {product.showDetails ? '▼' : '►'}
                </Typography>
                {product.showDetails && (
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Product"
                      variant="outlined"
                      name="product"
                      value={product.product}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <Autocomplete
                      freeSolo
                      options={predefinedTypes}
                      value={product.type}
                      onChange={(event, newValue) => handleTypeChange(index, event, newValue)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Type" variant="outlined" margin="normal" />
                      )}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Quantity"
                      variant="outlined"
                      type="number"
                      name="quantity"
                      value={product.quantity}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Rate"
                      variant="outlined"
                      type="number"
                      name="rate"
                      value={product.rate}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Price"
                      variant="outlined"
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </>
                )}
              </div>
            ))}
            <Button
              sx={{
                backgroundColor: "#634F0C",
                "&:hover": {
                  backgroundColor: "#4a3809",
                }
              }}
              variant="contained"
              color="primary"
              onClick={handleAddProduct}
              style={{ marginTop: '16px' }}
            >
              Add Product
            </Button><br/><br/>

            <TextField
              fullWidth
              margin="normal"
              label="Total"
              variant="outlined"
              type="number"
              value={formData.total}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Returns"
              variant="outlined"
              type="number"
              value={formData.returns}
              onChange={(e) => setFormData({ ...formData, returns: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Net Total"
              variant="outlined"
              type="number"
              value={formData.netTotal}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Received By"
              variant="outlined"
              value={formData.receivedBy}
              onChange={(e) => setFormData({ ...formData, receivedBy: e.target.value })}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Sales Reference By"
              variant="outlined"
              value={formData.salesRefBy}
              onChange={(e) => setFormData({ ...formData, salesRefBy: e.target.value })}
            />

            {/* <Button
              sx={{
                backgroundColor: "#634F0C",
                "&:hover": {
                  backgroundColor: "#4a3809",
                }
              }}
              variant="contained"
              color="primary"
              onClick={handleAddProduct}
              style={{ marginTop: '16px' }}
            >
              Add Product
            </Button> */}
            <Button
              sx={{
                backgroundColor: "#634F0C",
                "&:hover": {
                  backgroundColor: "#4a3809",
                }
              }}
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '16px', marginLeft: '16px' }}
            >
              Submit
            </Button>
          </form>
        </div>
        
      </div>
      <br/><br/>
    </>
  );
};

export default BillInfo;
