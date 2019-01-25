import React from 'react';
import {mount} from 'enzyme';
import {MemoryRouter as Router} from 'react-router-dom';

import {NavigationItems} from './NavigationItems';
import NavItem from '../NavigationItem/NavigationItem';


describe('<NavigationItems/> Component', () => {
    it('Should render 2 navigation Items', () => {
        const wrapper = mount(<Router><NavigationItems classes={{root: ''}} /></Router>);
        expect(wrapper.find(NavItem).length).toBe(2);
    })
});