import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';

const ExportButton = React.memo(function ExportButton({ data, filename, headers, label }) {
    const handleExport = useCallback(() => {
        // Convert data to CSV format
        const csv = convertArrayOfObjectsToCSV(data, headers);
        if (!csv) return;

        // Create a Blob object with CSV content
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        // Create a temporary link to download the file
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', filename);
        document.body.appendChild(link); // Append to the DOM
        link.click(); // Trigger download
        document.body.removeChild(link); // Clean up
    }, [data, filename, headers]);

    // Function to convert object array to CSV
    const convertArrayOfObjectsToCSV = (dataArray, headersArray) => {
        if (!dataArray.length) return null;

        // Create header row
        const headerRow = headersArray.join(',') + '\n';

        // Create data rows
        const rows = dataArray.map(obj => 
            headersArray.map(header => {
                const value = obj[header] !== undefined ? obj[header] : '';
                return `"${value}"`; // Wrap values in quotes
            }).join(',')
        ).join('\n');

        return headerRow + rows;
    };

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            disabled={!data || data.length === 0}
        >
            {label || 'Export CSV'}
        </Button>
    );
});

// Define types of props for better verification and documentation
ExportButton.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    filename: PropTypes.string,
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.string,
};

// Define default props
ExportButton.defaultProps = {
    filename: 'data.csv',
    label: 'Export CSV',
};

export default ExportButton;
