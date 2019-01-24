import React from 'react';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    products:[],
    prices:[],
    loading:true,
    updated:false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.ADD_PRODUCT):
            return{
                ...state,
                products:state.products.concat(action.products),
                prices:state.prices.concat(action.prices),
                lastProductId:action.lastProductId,
                lastPriceId:action.lastPriceId
            }
        case(actionTypes.UPDATE_PRODUCT):
            const newProductState = state.products.map(product => {
                if(product.id === action.product.id){
                    return action.product
                }
                return product
            })
            
            const newPrice = state.prices;
            if (action.price) {
                newPrice.push(action.price);
            }
            return{
                ...state,
                products:newProductState,
                prices:newPrice,
                lastPriceId:action.lastPriceId,
                updated:true
            }
        case(actionTypes.FETCH_PRODUCT_START):
            return{
                ...state,
                loading:true
            }
        case(actionTypes.FETCH_PRODUCT_SUCCESS):
            return{
                ...state,
                products:action.products,
                prices:action.prices,
                loading:false,
                lastProductId:action.lastProductId,
                lastPriceId:action.lastPriceId
            }
        case(actionTypes.FETCH_PRODUCT_FAILED):
            return{
                ...state,
                loading:false

            }
        case(actionTypes.DELETE_PRODUCT):
            const newProducts = [...state.products];
            newProducts.splice(action.index, 1); 
            return{
                ...state,
                products:newProducts
            }
        case(actionTypes.SHOW_MODAL):
            return{
                ...state,
            }
        default:
            return state;
    }
}

export default reducer;