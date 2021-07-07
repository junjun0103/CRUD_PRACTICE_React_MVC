import axios from 'axios';
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import ProductTable from './ProductTable';
import CreateProduct from './CreateProduct';

export class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      open: false,
    };
  }
  componentDidMount() {
    this.fetchProduct();
  }

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

  toggleCreateModal = (value) => {
    this.setState({
      open: value,
    });
  };

  render() {
    const { products, open } = this.state;
    return (
      <div>
        <CreateProduct
          toggleCreateModal={this.toggleCreateModal}
          open={open}
          fetchProduct={this.fetchProduct}
        />
        <h1>Products</h1>
        <Button
          inverted
          color='blue'
          onClick={() => this.toggleCreateModal(true)}
        >
          Create
        </Button>
        <ProductTable
          products={products}
          fetchProduct={this.fetchProduct}
        ></ProductTable>
      </div>
    );
  }
}
