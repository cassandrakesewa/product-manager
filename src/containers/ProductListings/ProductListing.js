import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from '../../axios';
import { connect } from 'react-redux'
import moment  from 'moment';
import { Redirect } from 'react-router-dom';

import ProductItem from '../../components/ProductItem/ProductItem';
import * as actions from '../../store/actions/index';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import UpdateProductModal from '../../components/Modal/UpdateProductModal';
import ProductDetails from '../../components/ProductDetails/ProductDetails';

export class ProductListing extends Component{
    state={
        openModal:false,
        productId:null,
        productName:'',
        price:null,
        viewProductDetails:false,
        currentPrice:0

    }

    componentWillMount(){
        this.props.onProductFetch();
    }

    onDeleteHandler = (index) => {
        
        this.props.onDeleteProduct(index);
        
    }

    onNameChangeHandler = (event) => {
        this.setState({
            productName: event.target.value,
        })
    }

    onViewProductDetails = (productId) =>{
        const productArray = this.props.products.find(product => product.id === productId);
       
        this.setState({
            viewProductDetails:true,
            productName:productArray.name,
            price:productArray.prices,

        })
    }

    onHideProductDetails = () => {
        this.setState({
            viewProductDetails:!this.state.viewProductDetails,
        })
    }
        

    handleModalClickOpen = (productId,productName,productPrice) => {
      this.setState({
          openModal:true,
          productId:productId,
          productName:productName,
          currentPrice:productPrice
      })
    }

    handleModalClickClose = () => {
        this.setState({
            openModal:false
        })
    }
  


    render(){
        let productData = <p>Products Loading..... </p>
        let updatedRedirect = this.props.updated ? <Redirect to="/" /> : null;
       
        
        if (!this.props.loading && this.props.products) {
            
            const products = this.props.products.map((product,index) => {
                // Using bubble sorting algorithm 
                
                const recentPrice = product.prices.sort((a, b) => {
                    const aDate = new Date(a.date);
                    const bDate = new Date(b.date);
                    return bDate - aDate;
                })[0];
                let date = moment(recentPrice.date).format('MM/DD/YYYY');
                return (
                    <TableRow key={product.id}>
                        <TableCell align="center">{product.id}</TableCell>
                        <TableCell align="center">{product.name}</TableCell>
                        <TableCell align="center">{recentPrice.price.toFixed(2)}</TableCell>
                        <TableCell align="center">{date}</TableCell>
                        <TableCell align="center">
                        <Button color="primary" style={{fontSize:'11px'}} onClick={() => this.onViewProductDetails(product.id)}>
                            View
                        </Button>
                        </TableCell>
                        <TableCell align="center">
                            <Button color="primary" style={{fontSize:'11px'}} onClick={()=> this.handleModalClickOpen(product.id, product.name, recentPrice.price)}>
                             Edit 
                            </Button>
                        </TableCell>
                        <TableCell align="right"><Button color="secondary" style={{fontSize:'11px'}} onClick={()=>this.onDeleteHandler(index)}> Delete </Button></TableCell>
                    </TableRow> 
                );
            });

            productData = (<ProductItem> {products} </ProductItem>);
            
        }
        

        return (
            <React.Fragment>
                {/* {updatedRedirect} */}
                <h1>Drug Listings</h1>
                {productData}
                
                {/* Only show product details when view is clicked */}
                {this.state.viewProductDetails ? 
                <ProductDetails 
                name={this.state.productName} 
                prices={this.state.price}>
                    <Button color="primary" style={{fontSize:'11px',margin:"0 auto"}} onClick={this.onHideProductDetails}>
                        Hide Details
                    </Button>
                </ProductDetails> : null}

                <UpdateProductModal
                productId={this.state.productId}
                name={this.state.productName}
                currentPrice={this.state.currentPrice}
                open={this.state.openModal} 
                close={this.handleModalClickClose}
                changeName={this.onNameChangeHandler}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state =>{
    return{
        products:state.products,
        prices:state.prices,
        loading:state.loading,
        updated:state.updated
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onProductFetch: () => dispatch(actions.fetchProducts()),
        onDeleteProduct: (index) => dispatch(actions.deleteProduct(index)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductListing);