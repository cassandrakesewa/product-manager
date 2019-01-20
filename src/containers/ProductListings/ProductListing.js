import React, {Component} from 'react';

import ProductItem from '../../components/ProductItem/ProductItem';

class ProductListing extends Component{
    render(){
        return (
            <React.Fragment>
                <p>List of Products</p>
                <ProductItem />
            </React.Fragment>
        );
    }
}

export default ProductListing;