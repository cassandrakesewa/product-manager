import reducer from './reducer';
import * as actionTypes from '../actions/actionTypes';

describe('reducer', () => {
    it('should have intitial state', ()=>{
        expect(reducer(undefined, {})).toEqual({
            products:[],
            prices:[],
            loading:true,
            updated:false
        })
    });

    it('should load data from endpoint to update initial state', () => {
        expect(reducer({
            products:[],
            prices:[],
            loading:true,
            updated:false
        },{
            type:actionTypes.FETCH_PRODUCT_SUCCESS,
            products:'products',
            prices:'prices',
            lastProductId:'lastProductId',
            lastPriceId:'lastPriceId'
        })).toEqual({
            products:'products',
            prices:'prices',
            loading:false,
            updated:false,
            lastProductId:'lastProductId',
            lastPriceId:'lastPriceId'
        })
    })

})