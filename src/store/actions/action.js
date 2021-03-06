import * as actionTypes from './actionTypes';
import axios from '../../axios'
import {loadState} from '../../localStorage';

export const addProduct = (lastProductId,lastPriceId,products,price) => {
    
    return {
        type:actionTypes.ADD_PRODUCT,
        products:products,
        prices:price,
        lastProductId:lastProductId,
        lastPriceId:lastPriceId
    }
}

export const updateProduct = (lastPriceId,product,price) => {
    
    return {
        type:actionTypes.UPDATE_PRODUCT,
        product:product,
        price:price,
        lastPriceId:lastPriceId,
    }
}

export const fetchProductStart = () => {
    return {
        type:actionTypes.FETCH_PRODUCT_START,
    }
}


export const fetchProductSuccess = (lastProductId,lastPriceId, products, prices) => {
    return {
        type:actionTypes.FETCH_PRODUCT_SUCCESS,
        products:products,
        prices:prices,
        lastProductId:lastProductId,
        lastPriceId:lastPriceId
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
        const currentState = loadState();
        
        if(Object.keys(currentState).length !== 0){
            return;
        }
        dispatch(fetchProductStart());
        axios.get('/5c3e15e63500006e003e9795')
        .then(response => {
            const products = response.data.products;
            const lastProduct = products[products.length - 1];
            const lastProductId = lastProduct.id 
            
            const prices = products.reduce((prices, currentProduct) => {
                prices = prices.concat(currentProduct.prices)
                return prices
                }, []) 
                const lastPrice = prices[prices.length - 1];
                const lastPriceId = lastPrice.id 
            dispatch(fetchProductSuccess(lastProductId,lastPriceId,products,prices));
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

