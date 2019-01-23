import React, {Component} from 'react';
import axios from '../../axios';
import { connect } from 'react-redux'

import ProductItem from '../../components/ProductItem/ProductItem';
import * as actions from '../../store/actions/index';
import TableRowCustom from '../../components/ProductItem/TableRow';


class ProductListing extends Component{
    componentWillMount(){
        this.props.onProductFetch();
    }

    onDeleteHandler = (index) => {
        
        this.props.onDeleteProduct(index);
        console.log(this.props.products);
        
    }

    handleModalClickOpen = () => {
      this.props.onOpenModal();
      console.log("Modal open", this.props.open)
    }
  


    render(){
        let productData = <p>Products Loading.....</p>
       
        
        if (!this.props.loading && this.props.products) {
            
            const products = this.props.products.map((product,index) => {
                // console.log("index", index);

                // Using bubble sorting algorithm 
                const recentPrice = product.prices.sort((a, b) => {
                    const aDate = new Date(a.date);
                    const bDate = new Date(b.date);
                    return bDate - aDate;
                })[0];
                
                return (
                    <TableRowCustom 
                    key={product.id}
                    product={product} 
                    recentPrice ={recentPrice}
                    clickedView ={this.handleModalClickOpen}
                    clickedDelete={()=>this.onDeleteHandler(index)} />
                );
            });

            productData = (<ProductItem> {products} </ProductItem>);
            
        }
        

        return (
            <React.Fragment>
                <h1>Drug Listings with Current Prices</h1>
                {productData}
                
            </React.Fragment>
        );
    }
}

const mapStateToProps = state =>{
    return{
        products:state.products,
        prices:state.prices,
        open:state.open,
        loading:state.loading
    }
    
}

const mapDispatchToProps = dispatch => {
    return{
        onProductFetch: () => dispatch(actions.fetchProducts()),
        onDeleteProduct: (index) => dispatch(actions.deleteProduct(index)),
        onOpenModal: () => dispatch(actions.showModal())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductListing);