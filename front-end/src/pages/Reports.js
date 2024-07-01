import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ResponsiveAppBar from '../components/Header';
import backgroundImage from '../images/123.jpg';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

class DownloadCSV extends React.Component {
    downloadCSV = (apiUrl, fileName) => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Convert JSON to CSV format
                const csv = this.convertToCSV(data);

                // Create a blob with the CSV data
                const blob = new Blob([csv], { type: 'text/csv' });

                // Create an <a> element to trigger the download
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = fileName;

                // Append the <a> element to the body and trigger the click event
                document.body.appendChild(a);
                a.click();

                // Clean up
                document.body.removeChild(a);
            })
            .catch(error => console.error('Error downloading CSV:', error));
    };

    convertToCSV = (jsonData) => {
        const header = Object.keys(jsonData[0]).join(',');
        const rows = jsonData.map(obj => Object.values(obj).join(',')).join('\n');
        return header + '\n' + rows;
    };

    render() {
        return (
            <Card sx={{ minWidth: 305,height: '150px', margin: '20px', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Download CSV
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.downloadCSV('https://diplomatic-beauty-production.up.railway.app/api/main-store/all', 'main_store_data.csv')}
                        sx={{ marginLeft: '10px', marginBottom: '10px', backgroundColor: '#634F0C' }}
                    >
                        Download Main Store Data
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => this.downloadCSV('https://diplomatic-beauty-production.up.railway.app/api/packing-store/all', 'packing_store_data.csv')}
                        sx={{ marginLeft: '10px', marginBottom: '10px', backgroundColor: '#634F0C' }}
                    >
                        Download Packing Store Data
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => this.downloadCSV('https://diplomatic-beauty-production.up.railway.app/api/bills/all', 'bills_data.csv')}
                        sx={{ marginLeft: '10px', marginBottom: '10px', backgroundColor: '#634F0C' }}
                    >
                        Download Bills Data
                    </Button>
                </CardContent>
            </Card>
        );
    }
}

const Reports = () => {
    return (
        <>
            <ResponsiveAppBar />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <DownloadCSV />
            </Box>
        </>
    );
};

export default Reports;
