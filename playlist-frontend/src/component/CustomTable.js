import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  tableContainer: {
    margin: '50px auto',
    maxWidth: '80%',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
  },
  tableHeader: {
    backgroundColor: '#1976d2',
  },
  tableCell: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '16px',
  },
  tableRowOdd: {
    backgroundColor: '#f5f5f5',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: '#e0f7fa',
    },
  },
  tableBodyCell: {
    textAlign: 'center',
    fontSize: '14px',
    padding: '8px',
  },
  
});
const CustomTable = ({ data }) => {

  const classes = useStyles();
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  // Calculate the rows to display based on pagination
  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table>
        <TableHead className={classes.tableHeader}>
          <TableRow>
            {/* Dynamically generate table headers based on keys of the first row */}
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <TableCell key={key} className={classes.tableCell}>{key.toUpperCase()}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Dynamically generate table rows and cells */}
          {paginatedData.map((row, rowIndex) => (
            <TableRow key={rowIndex}
            className={`${rowIndex % 2 === 0 ? '' : classes.tableRowOdd} ${classes.tableRowHover}`}
            >
              {Object.values(row).map((value, colIndex) => (
                <TableCell key={colIndex} className={classes.tableBodyCell}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Add TablePagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
        component="div"
        count={data.length} // Total number of rows
        rowsPerPage={rowsPerPage} // Rows per page
        page={page} // Current page
        onPageChange={handleChangePage} // Handle page change
        onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
      />
    </TableContainer>
  );
};

export default CustomTable;