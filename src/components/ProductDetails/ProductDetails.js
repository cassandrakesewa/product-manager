// This component shows the drug information with historical prices
// at the bottom of the product listing page


import React from 'react';
import moment  from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CardActions } from '@material-ui/core';

const styles = {
    card: {
      width: '60%',
      margin:'50px auto'
    },
    title: {
      fontSize: 17,
    },
    pos: {
      marginBottom: 12,
    },
    divider:{
        width:'30%',
        margin:'0 auto'
    }
  };
  


const productDetails = (props) =>{
    const { classes } = props;
    
    const prices = props.prices.map(price => {
        let date = moment(price.date).format('MM/DD/YYYY');
        return (
            <TableRow key={price.id}>
                <TableCell align="left">{date}</TableCell>
                <TableCell align="left">{price.price}</TableCell>
            </TableRow>
        )
    })


    return(
    <Card className={classes.card}>
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
            Historical Prices for <strong>{props.name}</strong>
            </Typography>
            
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {prices}
                </TableBody>
            </Table>
            
        </CardContent>
        <CardActions>
            {props.children}
        </CardActions>
    </Card>
    );
}

export default withStyles(styles)(productDetails);