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

class AddProduct extends Component{
    state = {
        name:'',
        price:0
    }

    componentDidMount(){
        console.log("add prod lastpriceId", this.props.lastPriceId);
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
                <h1>Add Drug</h1>
                <Paper className={classes.paper}>
                    <Form 
                    name={this.state.name} 
                    price={this.state.price} 
                    onChangeName={this.onNameChangeHandler}
                    onChangePrice={this.onPriceChangeHandler}>
                    <Button variant="contained" color="primary" onClick={this.addNewProductHandler}> Add Product </Button>
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
        lastPriceId:state.lastPriceId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitNewProduct: (lastProductId,productIndex,lastPriceId,products, prices) => dispatch(actions.addProduct(lastProductId,productIndex,lastPriceId,products,prices))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddProduct));