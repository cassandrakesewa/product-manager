import React from 'react';
import {shallow} from 'enzyme';

import AddProduct from './AddProduct';
import Form from '../../components/Form/Form'


describe('<Form/> Component', () => {
    it('Should render one form', () => {
        const wrapper = shallow(<AddProduct />);
        expect(wrapper.find(Form).length).toEqual(1);
    })
});