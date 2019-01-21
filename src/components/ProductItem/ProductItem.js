import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
      width: '95%',
      marginTop: theme.spacing.unit * 3,
      marginLeft:'auto',
      marginRight:'auto',
      overflowX: 'auto',
    },
    table: {
      width: '100%',
    },
  });
  
const productItem = (props) => {
    const { classes } = props;
    const pricedate = [];
    
    
    const products = props.products.map(product => {

        // Using bubble sorting algorithm 
        const recentPrice = product.prices.sort((a, b) => {
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            return bDate - aDate;
        })[0];
        
        return (
            <TableRow key={product.id}>
                        <TableCell align="right">{product.id}</TableCell>
                        <TableCell align="right">{product.name}</TableCell>
                        <TableCell align="right">{recentPrice.price}</TableCell>
                        <TableCell align="left">{recentPrice.date}</TableCell>
                        <TableCell align="right">View</TableCell>
                        <TableCell align="right">Edit</TableCell>
                        <TableCell align="right">Delete</TableCell>
            </TableRow> 
        );
    })
    return(
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                    <TableCell align="right">id</TableCell>
                    <TableCell align="right">name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="right">View</TableCell>
                    <TableCell align="right">Edit</TableCell>
                    <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default withStyles(styles)(productItem);