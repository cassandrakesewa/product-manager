import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout/Layout';
import ProductListing from './containers/ProductListings/ProductListing';
import AddProduct from './containers/AddProduct/AddProduct';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Switch>
            <Route  path='/add-drug'  component={AddProduct} />
            <Route  path='/'  component={ProductListing} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
