import axios from 'axios';
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import CustomerTable from './CustomerTable';
import CreateCustomer from './CreateCustomer';

export class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      open: false,
    };
  }
  componentDidMount() {
    this.fetchCustomer();
  }

  fetchCustomer = () => {
    axios
      .get('/customers/getcustomer')
      .then((cus) => {
        // console.log(cus.data);
        this.setState({
          customers: cus.data,
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
    const { customers, open } = this.state;
    return (
      <div>
        <CreateCustomer
          toggleCreateModal={this.toggleCreateModal}
          open={open}
          fetchCustomer={this.fetchCustomer}
        />
        <h1>Customers</h1>
        <Button
          inverted
          color='blue'
          onClick={() => this.toggleCreateModal(true)}
        >
          Create
        </Button>
        <CustomerTable
          customers={customers}
          fetchCustomer={this.fetchCustomer}
        ></CustomerTable>
      </div>
    );
  }
}
