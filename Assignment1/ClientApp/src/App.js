import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Product } from './components/Product/Product';
import { Sales } from './components/Sales/Sales';
import { Store } from './components/Store/Store';
import { Customer } from './components/Customer/Customer';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/customer' component={Customer} />
        <Route path='/product' component={Product} />
        <Route path='/sales' component={Sales} />
        <Route path='/store' component={Store} />
      </Layout>
    );
  }
}
