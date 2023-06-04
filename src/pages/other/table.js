import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

const columns = [
  { id: 'id', label: '#', minWidth: 170 },
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'name', label: 'Nom Pack', minWidth: 100 },
  {
    id: 'qty',
    label: 'Quantité',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'price',
    label: 'Prix',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('fr-FR'),
  },
  {
    id: 'localisation',
    label: 'Localisation',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'status',
    label: 'Statut',
    minWidth: 170,
    align: 'right',
  },
];

function createData(id, date, name, qty, price, localisation, status) {
  return { id, date, name, qty, price, localisation, status };
}

const rows = [
  createData(1, '01/01/2023', 'Pack 1', 3, 15000, 'Yopougon Maroc', 'Succes'),
  createData(2, '01/01/2023', 'Pack 2', 2, 25000, 'Cocody Angré', 'En cours'),
  createData(3, '01/01/2023', 'Pack 3', 2, 35000, 'Abobo', 'Succes'),
  createData(4, '01/01/2023', 'Pack 4', 4, 45000, 'Treichville', 'En cours'),
  createData(5, '01/01/2023', 'Pack 5', 2, 25000, 'koumassi', 'Succes'),
  createData(6, '01/01/2023', 'Pack 6', 3, 10000, 'Yopougon Maroc', 'Succes'),
  createData(7, '01/01/2023', 'Pack 7', 2, 20500, 'Cocody Angré', 'En cours'),
  createData(8, '01/01/2023', 'Pack 8', 2, 25000, 'Abobo', 'Succes'),
  createData(9, '01/01/2023', 'Pack 9', 4, 25000, 'Treichville', 'En cours'),
  createData(10, '01/01/2023', 'Pack 10', 2, 25000, 'koumassi', 'Succes'),
  createData(11, '01/01/2023', 'Pack 11', 3, 25000, 'Yopougon Maroc', 'Succes'),
  createData(12, '01/01/2023', 'Pack 12', 2, 25000, 'Cocody Angré', 'En cours'),
  createData(13, '01/01/2023', 'Pack 13', 2, 25000, 'Abobo', 'Succes'),
  createData(14, '01/01/2023', 'Pack 14', 4, 25000, 'Treichville', 'En cours'),
  createData(15, '01/01/2023', 'Pack 15', 2, 25000, 'koumassi', 'Succes'),
];

export default function StickyHeadTable() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  

  return (
    <Box sx={{ width: '90%', margin: '0 auto' }}>
        <br/>
        <h3 className="cart-page-title" >Mes historiques de commande</h3>
      <Card>
        <CardContent>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>
    </Box>
  );
}


