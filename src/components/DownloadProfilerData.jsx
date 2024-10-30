import React from 'react';
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';

function DownloadProfilerData({ profilerData = [] }) {
    // Handle download functionality
    const handleDownload = () => {
        if (!profilerData || profilerData.length === 0) {
            // Alert the user that there is nothing to download
            alert('No profiler data available for download.');
            return;
        }

        // Convert the data to JSON format
        const jsonString = JSON.stringify(profilerData, null, 2);
        // Create a Blob from the JSON string
        const blob = new Blob([jsonString], { type: 'application/json' });
        // Generate a URL for the Blob
        const url = URL.createObjectURL(blob);
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'profilerData.json'; // Set the download file name
        // Append link to the body
        document.body.appendChild(link);
        // Trigger the download
        link.click();
        // Clean up and remove the link
        document.body.removeChild(link);
        URL.revokeObjectURL(url); // Release the Blob URL
    };

    return (
        <Button
            variant="contained"
            color="secondary"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
        >
            Download Profiler Data
        </Button>
    );
}

// Define PropTypes for better verification
DownloadProfilerData.propTypes = {
    profilerData: PropTypes.array.isRequired,
};

export default DownloadProfilerData;