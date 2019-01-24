import React from 'react';
import {shallow} from 'enzyme';

import NavigationItems from './NavigationItems';
import NavItem from '../NavigationItem/NavigationItem';


describe('<NavigationItems/> Component', () => {
    it('Should render 2 navigation Items', () => {
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavItem).length).toEqual(2);
    })
});