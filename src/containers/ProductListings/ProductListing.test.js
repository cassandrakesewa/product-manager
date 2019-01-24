import React from 'react';
import {shallow} from 'enzyme';

import {ProductListing} from './ProductListing';


describe('Component Test: ProductListing', () => {
    const onProductFetch = jest.fn();

    const component = ( 
                <ProductListing onProductFetch={onProductFetch}/>
    );

    test('renders without crashing', () => {
        expect(shallow(component).exists()).toBeTruthy();
    });
});