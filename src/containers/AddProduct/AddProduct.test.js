import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter as Router} from 'react-router-dom';
import moment from 'moment';

import {AddProduct} from './AddProduct';
import Form from '../../components/Form/Form';
import Button from '@material-ui/core/Button';


describe('<Form/> Component', () => {
    const onSubmit = jest.fn();
    let wrapper = mount(
        <Router>
            <AddProduct
                lastProductId={2}
                lastPriceId={2}
                onSubmitNewProduct={onSubmit}
                classes={{paper: ''}}/>
        </Router>);
    it('Should render one form', () => {
        
        expect(wrapper.find(Form).length).toBe(1);
    })

    it('Should one Button', () =>{
        expect(wrapper.find(Button).length).toBe(1);
    })

    it('Should run submit funtion', () =>{
        wrapper = mount(
                <AddProduct
                    lastProductId={2}
                    lastPriceId={2}
                    onSubmitNewProduct={onSubmit}
                    classes={{paper: ''}}/>);

        const newPrice = {
                        id: 3,
                        price: 0,
                        date: moment().format()
                    };

        const newProduct = {
                        id: 3,
                        name: '',
                        prices: [newPrice]     
                        
                    };
        
        wrapper.instance().addNewProductHandler({preventDefault: () => {}});
        expect(onSubmit).toHaveBeenCalled();
        expect(onSubmit).toHaveBeenCalledWith(3,3, newProduct, newPrice)
    })
});