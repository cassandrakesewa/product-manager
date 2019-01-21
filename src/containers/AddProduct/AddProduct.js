import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

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

class AddProduct extends Component{
    state = {
        name:'',
        price:''
    }

    onNameChangeHandler = (event) => {
        this.setState({
            name: event.target.value,
        })
    }

    onPriceChangeHandler = (event) => {
        this.setState({
            price: event.target.value,
        })
    }   
    
    render(){
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.paper}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="name" shrink={true}>Product Name</InputLabel>
                        <Input id="name" value={this.state.name} onChange={this.onNameChangeHandler}/>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="price" shrink={true}>Product Price</InputLabel>
                        <Input id="price" value={this.state.price} onChange={this.onPriceChangeHandler}/>
                    </FormControl><br/>
                    <Button variant="contained" color="primary"> Add Product </Button>
                </Paper>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AddProduct);