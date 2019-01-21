import React, {Component} from 'react';
import axios from '../../axios';
import { connect } from 'react-redux'

import ProductItem from '../../components/ProductItem/ProductItem';
import * as actions from '../../store/actions/index';
import TableRowCustom from '../../components/ProductItem/TableRow';

class ProductListing extends Component{
    componentDidMount(){
        this.props.onProductFetch();
    }

    onDeleteHandler = (ind) => {
        
        this.props.onDeleteProduct(ind);
        console.log(this.props.products);
        
    }


    render(){
        let productData = <p>Products Loading.....</p>
       
        
        if (!this.props.loading) {
            
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
                    clickedDelete={(ind)=>this.onDeleteHandler(index)} />
                );
            });

            productData = (<ProductItem> {products} </ProductItem>);
            
        }
        

        return (
            <React.Fragment>
                <p>Drug Listings and Prices</p>
                {productData}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state =>{
    return{
        products:state.products,
        prices:state.prices
    }
    
}

const mapDispatchToProps = dispatch => {
    return{
        onProductFetch: () => dispatch(actions.fetchProducts()),
        onDeleteProduct: (index) => dispatch(actions.deleteProduct(index))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductListing);