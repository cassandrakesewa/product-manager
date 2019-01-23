import React from 'react';
import moment  from 'moment';

import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Modal from '../../components/Modal/Modal';

const styles = theme => ({
    button: {
        fontSize:'11px',
      }
  });

const tableRow = (props) => {
    const { classes } = props;
    let date = moment(props.recentPrice.date).format('MM/DD/YYYY');
    return(
            <TableRow>
                <TableCell align="center">{props.product.id}</TableCell>
                <TableCell align="right">{props.product.name}</TableCell>
                <TableCell align="right">{props.recentPrice.price}</TableCell>
                <TableCell align="left">{date}</TableCell>
                <TableCell align="center"><Button color="primary" className={classes.button} onClick={props.clickedView}> View </Button></TableCell>
                <TableCell align="center"><Button color="primary" className={classes.button}> Edit </Button></TableCell>
                <TableCell align="right"><Button color="secondary" className={classes.button} onClick={props.clickedDelete}> Delete </Button></TableCell>
            </TableRow> 
        
    );
}

export default withStyles(styles)(tableRow);