import axios from 'axios';
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import StoreTable from './StoreTable';
import CreateStore from './CreateStore';

export class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      open: false,
    };
  }
  componentDidMount() {
    this.fetchStore();
  }

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
    this.setState({
      open: value,
    });
  };

  render() {
    const { stores, open } = this.state;
    return (
      <div>
        <CreateStore
          toggleCreateModal={this.toggleCreateModal}
          open={open}
          fetchStore={this.fetchStore}
        />
        <h1>Stores</h1>
        <Button
          inverted
          color='blue'
          onClick={() => this.toggleCreateModal(true)}
        >
          Create
        </Button>
        <StoreTable stores={stores} fetchStore={this.fetchStore}></StoreTable>
      </div>
    );
  }
}
