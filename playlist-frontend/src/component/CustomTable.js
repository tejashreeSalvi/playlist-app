import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TablePagination,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  tableContainer: {
    margin: '10px',
    maxWidth: '85%',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',

  },
  tableHeader: {
    background: 'linear-gradient(20deg, #1976d2, #42a5f5)',
    '& th': {
      color: 'white',
      fontWeight: 'bold',
    },
  },
  tableCell: {
    textAlign: 'center',
    fontSize: '14px',
    padding: '4px',
  },
  downloadButton: {
    margin: "10px",
    backgroundColor: "#1976d2",
    color: "white",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
  },
});
const CustomTable = ({ data }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  const [order, setOrder] = useState('asc'); // Sorting order: 'asc' or 'desc'
  const [orderBy, setOrderBy] = useState(''); 

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  const handleSort = (column) => {
    const isAsc = orderBy === column && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(column);
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  //conver data to csv
  const downloadCSV = () => {
    const headers = Object.keys(data[0]).join(","); // Get column headers
    const rows = data.map((row) => Object.values(row).join(",")); // Get row values
    const csvContent = [headers, ...rows].join("\n"); // Combine headers and rows

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "table_data.csv";
    link.click();

    URL.revokeObjectURL(url); // Clean up the URL object
  };

  // Calculate the rows to display based on pagination
  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper className={classes.tableContainer}>
      <Button
        className={classes.downloadButton}
        onClick={downloadCSV}
        variant="contained"
      >
        Download CSV
      </Button>
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table>
        <TableHead className={classes.tableHeader}>
          <TableRow>
            {/* Dynamically generate table headers based on keys of the first row */}
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <TableCell key={key} className={classes.tableCell}>
                  <TableSortLabel
                    active={orderBy === key}
                    direction={orderBy === key ? order : 'asc'}
                    onClick={() => handleSort(key)}
                  >
                    {key.toUpperCase()}
                  </TableSortLabel>
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Dynamically generate table rows and cells */}
          {paginatedData.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={`${rowIndex % 2 === 0 ? "" : classes.tableRowOdd} ${
                classes.tableRowHover
              }`}
            >
              {Object.values(row).map((value, colIndex) => (
                <TableCell key={colIndex} className={classes.tableBodyCell}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Add TablePagination */}
      <TablePagination
        rowsPerPageOptions={[10]} // Options for rows per page
        component="div"
        count={data.length} // Total number of rows
        rowsPerPage={rowsPerPage} // Rows per page
        page={page} // Current page
        onPageChange={handleChangePage} // Handle page change
        onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
        sx={{
          display: 'flex',
          justifyContent: 'flex-start', // Align to the left
          paddingLeft: '16px', // Optional: Add some padding for better spacing
        }}
      />
    </TableContainer>
    </Paper>
  );
};

export default CustomTable;
