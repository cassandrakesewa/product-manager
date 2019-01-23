import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import * as actions from '../../store/actions/index';

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
                <h1>Add New Drug</h1>
                <Paper className={classes.paper}>
                    <form>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="name" shrink={true}>Drug Name</InputLabel>
                            <Input id="name" name="name" value={this.state.name} onChange={this.onNameChangeHandler}/>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="price" shrink={true}>Drug Price</InputLabel>
                            <Input id="price" name="price" value={this.state.price} onChange={this.onPriceChangeHandler}/>
                        </FormControl><br/>
                        <Button variant="contained" color="primary" onClick={this.addNewProductHandler}> Add Product </Button>
                    </form>
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
        onSubmitNewProduct: (lastProductId, lastPriceId,products, prices) => dispatch(actions.addProduct(lastProductId, lastPriceId,products,prices))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddProduct));