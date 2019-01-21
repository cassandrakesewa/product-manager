import React, {Component} from 'react';
import axios from '../../axios';
import { connect } from 'react-redux'

import ProductItem from '../../components/ProductItem/ProductItem';
import * as actions from '../../store/actions/index';

class ProductListing extends Component{
    // state = {
    //     products:null,
    //     prices:null,
    //     loading:true
    // }            

    componentDidMount(){
        this.props.onProductFetch();
        // axios.get('/5c3e15e63500006e003e9795')
        // .then(response => {
        //     const prices = response.data.products.map(price => {return price});
            
        //     this.setState({
        //         products:response.data.products,
        //         prices:prices,
        //         loading:false
        //     })
        // }).catch(error => {
        //     this.setState({
        //         loading:false
        //     })
        // })

    }


    render(){
        let productData = <p>Products Loading.....</p>
        console.log(this.props.products)
        
        if (!this.props.loading) {
            productData = <ProductItem products={this.props.products}/>
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
        onProductFetch: () => dispatch(actions.fetchProducts())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductListing);