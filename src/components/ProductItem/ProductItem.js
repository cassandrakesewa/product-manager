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
    button: {
        fontSize:'11px',
      }
  });
  
const productItem = (props) => {
    const { classes } = props;
    
    
    return(
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                    <TableCell align="center">id</TableCell>
                    <TableCell align="center">name</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">View</TableCell>
                    <TableCell align="center">Edit</TableCell>
                    <TableCell align="center">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{props.children}</TableBody>
            </Table>
        </Paper>
    );
}

export default withStyles(styles)(productItem);