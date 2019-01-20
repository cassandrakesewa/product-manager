import React, {Component} from 'react';
import axios from '../../axios';

import ProductItem from '../../components/ProductItem/ProductItem';

class ProductListing extends Component{
    state = {
        products:null,
        loading:true
    }            

    componentDidMount(){
        axios.get('/5c3e15e63500006e003e9795')
        .then(response => {
            this.setState({
                products:response.data.products,
                loading:false
            })
        }).catch(error => {
            this.setState({
                loading:false
            })
        })

    }


    render(){
        let productData = <p>Products Loading.....</p>
        
        if (!this.state.loading) {
            productData = this.state.products.map(pro => {
                return <ProductItem key={pro.id}/>
            })
           
        
      
        }
        

        return (
            <React.Fragment>
                <p>List of Products</p>
                {productData}
            </React.Fragment>
        );
    }
}

export default ProductListing;