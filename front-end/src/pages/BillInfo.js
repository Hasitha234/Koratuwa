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
const predefinedReturnOptions = ['Yes', 'No'];

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
    returnOrNot: '',
    products: [
      { product: '', type: '', quantity: 0, rate: 0, price: 0, showDetails: true }
    ],
    returnDetails: [
      { spicesType: '', packetType: '', quantity: 0, rate: 0, price: 0, showDetails: true }
    ],
    showReturnDetails: false // Add a flag to show/hide return details
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

  // Calculate returns whenever return details change
  useEffect(() => {
    const calculateReturns = () => {
      const totalReturns = formData.returnDetails.reduce((acc, detail) => acc + parseFloat(detail.price), 0);
      setFormData(prevState => ({
        ...prevState,
        returns: totalReturns
      }));
    };

    calculateReturns();
  }, [formData.returnDetails]);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    let showReturnDetails = false;
    if (name === 'returnOrNot' && value === 'Yes') {
      showReturnDetails = true;
    }

    setFormData({ ...formData, [name]: value, showReturnDetails });
  };

  const handleProductChange = (index, event) => {
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

  const handleReturnChange = (index, event) => {
    const { name, value } = event.target;
    const updatedReturnDetails = [...formData.returnDetails];
    updatedReturnDetails[index] = { ...updatedReturnDetails[index], [name]: value };

    // Calculate price when quantity or rate changes
    if (name === 'quantity' || name === 'rate') {
      const quantity = parseFloat(updatedReturnDetails[index].quantity);
      const rate = parseFloat(updatedReturnDetails[index].rate);
      updatedReturnDetails[index].price = (quantity * rate).toFixed(2); // Ensure price is rounded to 2 decimal places
    }

    setFormData({ ...formData, returnDetails: updatedReturnDetails });
  };

  const handleTypeChange = (index, event, newValue) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index] = { ...updatedProducts[index], type: newValue };
    setFormData({ ...formData, products: updatedProducts });
  };

  const handleReturnTypeChange = (index, event, newValue) => {
    const updatedReturnDetails = [...formData.returnDetails];
    updatedReturnDetails[index] = { ...updatedReturnDetails[index], packetType: newValue };
    setFormData({ ...formData, returnDetails: updatedReturnDetails });
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

  const handleAddReturnDetail = () => {
    setFormData({
      ...formData,
      returnDetails: [
        ...formData.returnDetails,
        { spicesType: '', packetType: '', quantity: 0, rate: 0, price: 0, showDetails: true }
      ]
    });
  };

  const toggleProductDetails = (index) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index].showDetails = !updatedProducts[index].showDetails;
    setFormData({ ...formData, products: updatedProducts });
  };

  const toggleReturnDetails = (index) => {
    const updatedReturnDetails = [...formData.returnDetails];
    updatedReturnDetails[index].showDetails = !updatedReturnDetails[index].showDetails;
    setFormData({ ...formData, returnDetails: updatedReturnDetails });
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
          returnOrNot: '',
          products: [
            { product: '', type: '', quantity: 0, rate: 0, price: 0, showDetails: true }
          ],
          returnDetails: [
            { spicesType: '', packetType: '', quantity: 0, rate: 0, price: 0, showDetails: true }
          ],
          showReturnDetails: false // Reset showReturnDetails flag
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
      <ResponsiveAppBar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5'
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '32px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Typography
              sx={{ textAlign: 'center', color: '#634F0C' }}
              variant="h4"
              component="h1"
              gutterBottom
            >
              Billing Information
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                margin="normal"
                label="Bill No"
                variant="outlined"
                name="billNo"
                value={formData.billNo}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Sale Reference"
                variant="outlined"
                name="saleRef"
                value={formData.saleRef}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Mobile"
                variant="outlined"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Customer Name"
                variant="outlined"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Address"
                variant="outlined"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <Typography variant="h5" component="h3" sx={{ marginTop: '16px' }}>
                Products
              </Typography>
              {formData.products.map((product, index) => (
                <Box
                  key={index}
                  sx={{
                    marginTop: '16px',
                    marginBottom: '16px',
                    padding: '16px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px'
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    onClick={() => toggleProductDetails(index)}
                    style={{ cursor: 'pointer' }}
                  >
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
                        onChange={(e) => handleProductChange(index, e)}
                      />
                      <Autocomplete
                        freeSolo
                        options={predefinedTypes}
                        value={product.type}
                        onChange={(event, newValue) =>
                          handleTypeChange(index, event, newValue)
                        }
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              variant="outlined"
                              label={option}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Type"
                            variant="outlined"
                            margin="normal"
                          />
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
                        onChange={(e) => handleProductChange(index, e)}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Rate"
                        variant="outlined"
                        type="number"
                        name="rate"
                        value={product.rate}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Price"
                        variant="outlined"
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </>
                  )}
                </Box>
              ))}
              <Button
                sx={{
                  backgroundColor: '#634F0C',
                  '&:hover': {
                    backgroundColor: '#4a3809'
                  }
                }}
                variant="contained"
                color="primary"
                onClick={handleAddProduct}
                style={{ marginTop: '16px' }}
              >
                Add Product
              </Button>
              <Typography
                variant="h5"
                component="h3"
                sx={{ marginTop: '16px' }}
              >
                Returns
              </Typography>
              <Autocomplete
                freeSolo
                options={predefinedReturnOptions}
                value={formData.returnOrNot}
                onChange={(event, newValue) =>
                  handleChange({ target: { name: 'returnOrNot', value: newValue } })
                }
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Return or Not"
                    variant="outlined"
                    margin="normal"
                  />
                )}
              />
              {formData.showReturnDetails && (
                <>
                  {formData.returnDetails.map((detail, index) => (
                    <Box
                      key={index}
                      sx={{
                        marginTop: '16px',
                        marginBottom: '16px',
                        padding: '16px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px'
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h2"
                        onClick={() => toggleReturnDetails(index)}
                        style={{ cursor: 'pointer' }}
                      >
                        Return Detail - {index + 1}{' '}
                        {detail.showDetails ? '▼' : '►'}
                      </Typography>
                      {detail.showDetails && (
                        <>
                          <TextField
                            fullWidth
                            margin="normal"
                            label="Product"
                            variant="outlined"
                            name="spicesType"
                            value={detail.spicesType}
                            onChange={(e) => handleReturnChange(index, e)}
                          />
                          <Autocomplete
                            freeSolo
                            options={predefinedTypes}
                            value={detail.packetType}
                            onChange={(event, newValue) =>
                              handleReturnTypeChange(index, event, newValue)
                            }
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  variant="outlined"
                                  label={option}
                                  {...getTagProps({ index })}
                                />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Packet Type"
                                variant="outlined"
                                margin="normal"
                              />
                            )}
                          />
                          <TextField
                            fullWidth
                            margin="normal"
                            label="Quantity"
                            variant="outlined"
                            type="number"
                            name="quantity"
                            value={detail.quantity}
                            onChange={(e) => handleReturnChange(index, e)}
                          />
                          <TextField
                            fullWidth
                            margin="normal"
                            label="Rate"
                            variant="outlined"
                            type="number"
                            name="rate"
                            value={detail.rate}
                            onChange={(e) => handleReturnChange(index, e)}
                          />
                          <TextField
                            fullWidth
                            margin="normal"
                            label="Price"
                            variant="outlined"
                            type="number"
                            name="price"
                            value={detail.price}
                            onChange={(e) => handleReturnChange(index, e)}
                          />
                        </>
                      )}
                    </Box>
                  ))}
                  
                  <Button
                    sx={{
                      backgroundColor: '#634F0C',
                      '&:hover': {
                        backgroundColor: '#4a3809'
                      }
                    }}
                    variant="contained"
                    color="primary"
                    onClick={handleAddReturnDetail}
                    style={{ marginTop: '16px' }}
                  >
                    Add Return Detail
                  </Button><br/>
                </>
              )}
              <br/>
              <TextField
                fullWidth
                margin="normal"
                label="Total"
                variant="outlined"
                type="number"
                value={formData.total}
                InputProps={{
                  readOnly: true
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Returns"
                variant="outlined"
                type="number"
                value={formData.returns}
                InputProps={{
                  readOnly: true
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Net Total"
                variant="outlined"
                type="number"
                value={formData.netTotal}
                InputProps={{
                  readOnly: true
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Received By"
                variant="outlined"
                name="receivedBy"
                value={formData.receivedBy}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Sales Reference By"
                variant="outlined"
                name="salesRefBy"
                value={formData.salesRefBy}
                onChange={handleChange}
              />
              <Button
                sx={{
                  backgroundColor: '#634F0C',
                  '&:hover': {
                    backgroundColor: '#4a3809'
                  }
                }}
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: '16px' }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BillInfo;
