import React from 'react';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    products:[],
    prices:[],
    loading:true
}

const reducer = (state = initialState, action) => {
    switch(action.type){
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
                loading:false
            }
        case(actionTypes.FETCH_PRODUCT_FAILED):
            return{
                ...state,
                loading:false

            }
        default:
            return state;
    }
}

export default reducer;