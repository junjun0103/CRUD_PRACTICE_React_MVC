import React, { useState, useEffect, Component } from 'react';
import { Button, Form, Modal, Select } from 'semantic-ui-react';
import axios from 'axios';

export default class CreateSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: null,
      customerId: null,
      storeId: null,
      dateSold: null,
    };
  }
  validator = () => {
    if (
      !this.state.productId ||
      !this.state.customerId ||
      !this.state.storeId ||
      !this.state.dateSold
    ) {
      return false;
    } else {
      return true;
    }
  };
  resetStates = () => {
    this.setState({
      productId: null,
      customerId: null,
      storeId: null,
      dateSold: null,
    });
  };

  render() {
    const { open, toggleCreateModal, fetchSales, products, stores, customers } =
      this.props;
    const productOptions = products.map((pro) => {
      return {
        key: pro.id,
        value: pro.id,
        text: pro.name,
      };
    });
    const customerOptions = customers.map((cus) => {
      return {
        key: cus.id,
        value: cus.id,
        text: cus.name,
      };
    });
    const storeOptions = stores.map((sto) => {
      return {
        key: sto.id,
        value: sto.id,
        text: sto.name,
      };
    });

    const createSales = () => {
      if (this.validator()) {
        axios
          .post('/sales/PostSales', {
            productId: Number(this.state.productId),
            customerId: Number(this.state.customerId),
            storeId: Number(this.state.storeId),
            dateSold: this.state.dateSold,
          })
          .then((res) => {
            console.log(res.data);
            fetchSales();
            toggleCreateModal(false);
            this.resetStates();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    return (
      <Modal open={open}>
        <Modal.Header>Create Sales</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Products</label>
              <Select
                onChange={(e, data) =>
                  this.setState({
                    productId: data.value,
                  })
                }
                placeholder='Select Product'
                options={productOptions}
              />
              <span className='validator'>
                {this.state.productId ? '' : 'Please Select Product'}
              </span>
            </Form.Field>
            <Form.Field>
              <label>Customers</label>
              <Select
                onChange={(e, data) =>
                  this.setState({
                    customerId: data.value,
                  })
                }
                placeholder='Select Customer'
                options={customerOptions}
              />
              <span className='validator'>
                {this.state.customerId ? '' : 'Please Select Customer'}
              </span>
            </Form.Field>
            <Form.Field>
              <label>Stores</label>
              <Select
                onChange={(e, data) =>
                  this.setState({
                    storeId: data.value,
                  })
                }
                placeholder='Select Store'
                options={storeOptions}
              />
              <span className='validator'>
                {this.state.storeId ? '' : 'Please Select Store'}
              </span>
            </Form.Field>
            <Form.Field>
              <label>DateSold</label>
              <input
                onChange={(event) =>
                  this.setState({ dateSold: event.target.value })
                }
                type='date'
                placeholder='DateSold'
              />
              <span className='validator'>
                {this.state.dateSold ? '' : 'Please Enter Date'}
              </span>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => toggleCreateModal(false)}>
            Cancel
          </Button>
          <Button color='blue' onClick={() => createSales()}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
