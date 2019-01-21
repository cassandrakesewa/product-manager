import * as actionTypes from './actionTypes';
import axios from '../../axios'

export const fetchProductStart = () => {
    return {
        type:actionTypes.FETCH_PRODUCT_START,
    }
}

export const fetchProductSuccess = (products, prices) => {
    return {
        type:actionTypes.FETCH_PRODUCT_SUCCESS,
        products:products,
        prices:prices
    }
}

export const fetchProductFailed = (error) => {
    return {
        type:actionTypes.FETCH_PRODUCT_FAILED,
        error:error
    }
}

export const fetchProducts = () => {
    return dispatch => {
        dispatch(fetchProductStart());
        axios.get('/5c3e15e63500006e003e9795')
        .then(response => {
            console.log("from action");
            const products = response.data.products;
            const prices = response.data.products.map(product => {return product.prices});
            dispatch(fetchProductSuccess(products,prices));
        }).catch(error => {
            dispatch(fetchProductFailed(error))
        })
    }
}

export const deleteProduct = (index) => {
    return{
        type:actionTypes.DELETE_PRODUCT,
        index
    }
}