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
        width:'60%',
        marginBottom:'20px',
    }
}

class Form extends Component{
    render(){
        const { classes } = this.props;
        return(
            <form>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="name" shrink={true}>Drug Name</InputLabel>
                    <Input id="name" name="name" value={this.props.name} onChange={this.props.onChangeName}/>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="price" shrink={true}>Drug Price</InputLabel>
                    <Input id="price" name="price" value={this.props.price} onChange={this.props.onChangePrice}/>
                </FormControl><br/>
                {this.props.children}
                
            </form>
            
        );
    }
}
Form.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Form);