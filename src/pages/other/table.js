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
import { Link as RouterLink , useHistory } from 'react-router-dom';
import {makeStyles} from '@mui/styles';
import { Button } from '@mui/material';
// import useHistor




const useStyles = makeStyles({
  tableContainer: {
    marginBottom: '20px',
  },
  tableHeadCell: {
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
  },
  imageCell: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxWidth: '100px',
    maxHeight: '100px',
    borderRadius: '50%',
  },
});


const columns = [
  { id: 'image', label: 'Image', align: 'left', isImageColumn: true, align:'center' },
  { id: 'id', label: 'Numero de commande', minWidth: 170, align:'center' },
  { id: 'date', label: 'Date', minWidth: 170, align:'center' },
  { id: 'full_name', label: 'Proprietaire', minWidth: 100, align:'center' },
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
    align: 'center',
    format: (value) => value.toLocaleString('fr-FR'),
  },
  {
    id: 'adresse',
    label: 'Localisation',
    minWidth: 170,
    align: 'center',
  },
  {
    id: 'status',
    label: 'Statut',
    minWidth: 170,
    align: 'center',
  },
  {
    id: "actions",
    label:"Actions",
    minWidth:120,
    align:'right'
  }
];

// function createData(id, date, name, qty, price, localisation, status) {
//   return { id, date, name, qty, price, localisation, status };
// }





export default function StickyHeadTable() {

  const classes = useStyles();



  const {order} = useSelector(state=>state.orderData)

console.log(order)
console.log(objet)

  var objet;
  var final_orders=[];

  for(let i=0; i<order.length; i++){
    objet= order[i];

    const date = new Date(objet.date_created);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const a = {
      "image": objet.gift[0].image,
      "id": objet.id,
      "status": objet.status,
      "full_name": objet.customer_full_name,
      "telephone": objet.customer_phone_number,
      "date": formattedDate,
      "adresse": objet.delivery_address,
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
                      <RouterLink to={process.env.PUBLIC_URL + "/"}>
                        Faire une commande
                      </RouterLink>
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
                <TableContainer className={classes.tableContainer}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }} className={classes.tableHeadCell}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {final_orders
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
                                    <TableCell key={column.id} align={column.align} className={column.id === 'image' ? classes.imageCell : null} >
                                      {
                                      
                                      column.isImageColumn ? (
                                          <img src={value} alt='Img' style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                      ) : (
                                        column.format && typeof value === 'number'
                                        ? column.format(value) : column.id === 'actions' ? (
                                          <Button variant="contained" color="primary" component={RouterLink} to={`/product/${row.id}`}
                                          >
                                            Voir
                                          </Button>)
                                        :  value
                                      ) 

                                      }
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
                  labelRowsPerPage="Nombre d'éléments par page"
                />
              </CardContent>
            </Card>
          </Box>
    )}

    </Fragment>
  );
}


