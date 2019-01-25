import React,{ Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = {
    paper:{
        width:'60%',
        margin:'0 auto',
        padding:'50px 5px'
    },
    formControl:{
        width:'70%',
        marginBottom:'20px',
    }
}

const form = (props) => {
        const { classes } = props;
        return(
            <form>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="name" shrink={true}>Drug Name</InputLabel>
                    <Input id="name" name="name" value={props.name} onChange={props.onChangeName}/>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="price" shrink={true}>Drug Price</InputLabel>
                    <Input id="price" name="price" 
                    value={props.price} 
                    onChange={props.onChangePrice} 
                    disabled={props.enableInput}/>
                
                </FormControl><br/>
                {props.children}
                
            </form>
            
        );
}
form.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(form);