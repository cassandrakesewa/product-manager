// This page is use to add new drug and also set new price

import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import * as actions from '../../store/actions/index';
import Form from '../../components/Form/Form';
import { withStyles } from '@material-ui/core';


const styles = {
    paper:{
        width:'60%',
        margin:'0 auto',
        padding:'50px 5px'
    }
}

export class AddProduct extends Component{
    state = {
        name:'',
        price:0,
        isValid:false
    }


    addNewProductHandler = (e) =>{
        e.preventDefault();

        const lastProductId = this.props.lastProductId  +1;
        const lastPriceId = this.props.lastPriceId  +1;

        const newPrice = {
            id: lastPriceId,
            price: +this.state.price,
            date: moment().format()
        };
        const newProduct = {
            id: lastProductId,
            name: this.state.name,
            prices: [newPrice]     
            
        };
        
        this.props.onSubmitNewProduct(lastProductId,lastPriceId,newProduct,newPrice);
        this.setState({
            name:'',
            price:0
        })
    }
    
    // This Validate function checks if price set is greater than zero 
    // and also has only numbers without letter (eg: Price input accepts 1.2 or 5 not 4d or 4,2g or one)
    validateForm = () => {
        let valid = true;
       
        const validnumberinput = /^\d*\.?\d*$/; // returns true if valid(to validate prices to be integer or decimals)
        const validname = this.state.name.trim() !== '';
        const validprice = this.state.price > 0 && validnumberinput.test(this.state.price);
        valid = validname && validprice;
        this.setState({
            isValid:valid
        })
    }

    onNameChangeHandler = (event) => {
        this.setState({
            name: event.target.value,
        },this.validateForm)

    }

    onPriceChangeHandler = (event) => {
        this.setState({
            price: event.target.value,
        },this.validateForm)
    }   
    
    render(){
        const { classes } = this.props;
        return (
            <React.Fragment>
                <h1>Add Drug</h1>
                <Paper className={classes.paper}>
                    <Form 
                    name={this.state.name} 
                    price={this.state.price} 
                    onChangeName={this.onNameChangeHandler}
                    onChangePrice={this.onPriceChangeHandler}
                    error={!this.state.isValid}>
                    <Button variant="contained" color="primary" onClick={this.addNewProductHandler} disabled={!this.state.isValid}> Add Product </Button>
                    </Form>
                </Paper>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        products:state.products,
        prices:state.prices,
        lastProductId:state.lastProductId,
        lastPriceId:state.lastPriceId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitNewProduct: (lastProductId,productIndex,lastPriceId,products, prices) => dispatch(actions.addProduct(lastProductId,productIndex,lastPriceId,products,prices))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddProduct));