import axios from 'axios';
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import SalesTable from './SalesTable';
import CreateSales from './CreateSales';

export class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sales: [],
      customers: [],
      products: [],
      stores: [],
      open: false,
    };
  }
  componentDidMount() {
    this.fetchSales();
    this.fetchCustomer();
    this.fetchProduct();
    this.fetchStore();
  }

  fetchSales = () => {
    axios
      .get('/sales/getSales')
      .then((sale) => {
        // console.log(cus.data);
        this.setState({
          sales: sale.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchCustomer = () => {
    axios
      .get('/customers/getcustomer')
      .then((cus) => {
        this.setState({
          customers: cus.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchProduct = () => {
    axios
      .get('/products/getProduct')
      .then((cus) => {
        // console.log(cus.data);
        this.setState({
          products: cus.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  fetchStore = () => {
    axios
      .get('/stores/getStore')
      .then((sto) => {
        // console.log(cus.data);
        this.setState({
          stores: sto.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  toggleCreateModal = (value) => {
    console.log('This is Test');
    this.setState({
      open: value,
    });
  };

  render() {
    const { sales, open, customers, products, stores } = this.state;
    return (
      <div>
        <CreateSales
          toggleCreateModal={this.toggleCreateModal}
          open={open}
          fetchSales={this.fetchSales}
          customers={customers}
          products={products}
          stores={stores}
        />
        <h1>Sales</h1>
        <Button
          inverted
          color='blue'
          onClick={() => this.toggleCreateModal(true)}
        >
          Create
        </Button>
        <SalesTable
          sales={sales}
          fetchSales={this.fetchSales}
          customers={customers}
          products={products}
          stores={stores}
        ></SalesTable>
      </div>
    );
  }
}
