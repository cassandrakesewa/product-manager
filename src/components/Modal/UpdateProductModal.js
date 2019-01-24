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
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class UpdateProductModal extends Component{
  state={
    price:0,
    enablePriceInput:false,
    checked:false
  }

  onPriceChangeHandler = (event) => {
    this.setState({
        price: event.target.value,
    })
  } 

  onCheckSetPrice = () => {
    this.setState({
      checked:!this.state.checked,
      enablePriceInput:!this.state.enablePriceInput
    })
  }

  onModalCancel = () => {
    this.setState({
      enablePriceInput:false,
      checked:false,
      price:0
    })
    this.props.close();
  }
  
  updateProductHandler = (e) =>{
    e.preventDefault();

    const name = this.props.name;
    const price = Number.parseFloat(this.state.price);

    const product = this.props.products.find(product => product.id === this.props.productId);
    const updatedProduct = {
      ...product,
      name
    };

    // Initially set to null so that if there is a price change, we do not have to update
    // the new price.
    let newPrice = null;
    let newLastPriceId = this.props.lastPriceId;

    const priceDiffers = price > 0 &&  price !== Number.parseFloat(this.props.currentPrice);

    if (priceDiffers) {
      newLastPriceId = newLastPriceId + 1;
      newPrice = {
        id: newLastPriceId,
        price: +this.state.price,
        date: moment().format()
      };

      
      updatedProduct.prices.push(newPrice);
    }

    this.props.onSubmitUpdatedProduct(newLastPriceId, updatedProduct, newPrice);

    this.onModalCancel();
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
                enableInput={!this.state.enablePriceInput}>
                
                <FormControlLabel
                  control={
                    <Checkbox 
                    checked={this.state.checked} 
                    onChange={this.onCheckSetPrice} 
                    value="checkedI" color="primary"/>
                  }
                  label="Select to set new price to this product"
                />
                </Form>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.onModalCancel} autoFocus>
              Cancel
            </Button>
            <Button 
              color="primary" 
              variant="contained" 
              autoFocus 
              onClick={this.updateProductHandler}
              disabled = {this.state.enablePriceInput && (this.state.price <= 0)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProductModal);