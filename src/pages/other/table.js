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
import { useSelector } from "react-redux";
import { right } from '@popperjs/core';
import { Fragment } from 'react-is';
import { Link } from 'react-router-dom';



const columns = [
  { id: 'id', label: 'Numero de commande', minWidth: 170 },
  { id: 'date', label: 'Date', minWidth: 170 },
  { id: 'last_name', label: 'Proprietaire', minWidth: 100 },
  // {
  //   id: 'qty',
  //   label: 'Quantité',
  //   minWidth: 170,
  //   align: 'right',
  // },
  {
    id: 'prix',
    label: 'Prix',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toLocaleString('fr-FR'),
  },
  {
    id: 'commune',
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
  // {
  //   id: "action",
  //   label:"Actions",
  //   minWidth:300,
  //   align:'right'
  // }
];

// function createData(id, date, name, qty, price, localisation, status) {
//   return { id, date, name, qty, price, localisation, status };
// }





export default function StickyHeadTable() {


  const {order} = useSelector(state=>state.orderData)



  var objet;
  var final_orders=[];

  for(let i=0; i<order.length; i++){
    objet= order[i];

    const a = {
      "id": objet.id,
      "status": objet.status,
      "last_name": objet.customer_last_name,
      "telephone": objet.customer_phone_number,
      "date": objet.date_created,
      "commune": objet.customer_neighborhood,
      "prix": objet.price,
    }
    final_orders.push(a)

    console.log(final_orders)

    var rows = [];
    rows.push(a)
    // rows.push([createData(final_orders.id, final_orders.date, final_orders.last_name, 3, final_orders.prix, final_orders.commune, final_orders.status)])

    // console.log(rows)
  }

  console.log(final_orders)
  console.log(rows)


  // const rows = [
  //   createData(order[0].id, '01/01/2023', 'Pack 1', 3, 15000, 'Yopougon Maroc', 'Succes'),
  // ];

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
    <Fragment>


    
    {
      final_orders.length < 1 ? (
        <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Aucun Historique<br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        Faire une commande
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
    ):(
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
                              {
                                columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell key={column.id} align={column.align}>
                                      {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                  );
                                })
                              }
                            </TableRow>
                          );
                        })
                        
                        }
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
    )}

    </Fragment>
  );
}


