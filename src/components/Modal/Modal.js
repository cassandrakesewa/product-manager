import React,{Component} from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Form from '../Form/Form';
import moment from 'moment';
import * as actions from '../../store/actions/index';

class Modal extends Component{
  state={
    price:0
  }

  onPriceChangeHandler = (event) => {
    this.setState({
        price: event.target.value,
    })
} 

  
  updateProductHandler = (e) =>{
    e.preventDefault();
    const products = {...this.props.products};
    const productIndex = this.props.products.findIndex(product => product.id === this.props.productId);

    const lastPriceId = this.props.lastPriceId  + 1;

    // Product name can be updated but only new price can be set 
   
    const newPrice = {
        id: lastPriceId,
        price: +this.state.price,
        date: moment().format()
    };
  
    const updatedProduct = {
        id: this.props.productId,
        name: this.props.name,
        prices: products[productIndex].prices.concat(newPrice)
        
    };
    
    products[productIndex] = updatedProduct;
    console.log(products);
    

    
    // this.props.onSubmitUpdatedProduct(lastPriceId,productIndex,updatedProduct,newPrice);
}


  render(){
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Update Drug Information</DialogTitle>
          <DialogContent>
              <Form
                name={this.props.name} 
                price={this.state.price} 
                onChangeName={this.props.changeName}
                onChangePrice={this.onPriceChangeHandler}
                />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.close} autoFocus>
              Cancel
            </Button>
            <Button color="primary" variant="contained" autoFocus onClick={this.updateProductHandler}>
              Update
            </Button>
           
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
        products:state.products,
        prices:state.prices,
        lastPriceId:state.lastPriceId
  }
}

const mapDispatchToProps = dispatch =>{
  return{
        onSubmitUpdatedProduct: (lastPriceId,products,price) => dispatch(actions.updateProduct(lastPriceId,products,price))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);