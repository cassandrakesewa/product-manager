import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import './NavigationItems.css';
import NavItem from '../NavigationItem/NavigationItem';

const styles = {
    root: {
      backgroundColor: '#f5f5f5',
    }
  };

const navigationItems = (props) => {
    

      const { classes } = props;
    return(
        <AppBar position="static" classes={{ root: classes.root }}>
            <ul>
                <NavItem link="/" exact>Drug Listings</NavItem>
                {/* <NavItem link="/add-drug">Add Drug</NavItem> */}
            </ul>
            
        </AppBar>
    );
}

export default withStyles(styles)(navigationItems);