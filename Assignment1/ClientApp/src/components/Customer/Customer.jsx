import axios from 'axios';
import React, { Component } from 'react';
import { Button, Select, Label } from 'semantic-ui-react';
import CustomerTable from './CustomerTable';
import CreateCustomer from './ModalForCustomerComponent';

export class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      open: false,
      rows: 3,
      page: 1,
      pages: 1,
      querySet: [],
    };
  }
  componentDidMount() {
    this.fetchCustomer();
  }

  // pagination
  pagination = (querySet, page, rows) => {
    let trimStart = (page - 1) * rows;
    let trimEnd = trimStart + rows;
    let trimmedData = querySet.slice(trimStart, trimEnd);

    let pages = Math.ceil(querySet.length / rows);
    this.setState({
      querySet: trimmedData,
      pages: pages,
    });
  };

  paginationHandler = (data) => {
    // console.log(data);
    this.setState({
      rows: data,
    });
    this.pagination(this.state.customers, this.state.page, data);
  };

  pageHandler = (data) => {
    // console.log(data);
    let currentPage = this.state.page;
    if (data === 'prev') {
      if (currentPage > 1) {
        this.setState({
          page: currentPage - 1,
        });
        this.pagination(this.state.customers, currentPage - 1, this.state.rows);
      }
    } else if (data === 'next') {
      if (currentPage < this.state.pages) {
        this.setState({
          page: currentPage + 1,
        });
        this.pagination(this.state.customers, currentPage + 1, this.state.rows);
      }
    }
  };

  fetchCustomer = () => {
    axios
      .get('/customers/getcustomer')
      .then((cus) => {
        // console.log(cus.data);
        this.setState({
          customers: cus.data,
        });
        this.pagination(cus.data, this.state.page, this.state.rows);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  toggleCreateModal = (value) => {
    this.setState({
      open: value,
    });
    console.log(this.state.pages);
  };

  render() {
    const { querySet, open } = this.state;
    const rowsOptions = [
      { key: 3, text: 3, value: 3 },
      { key: 5, text: 5, value: 5 },
    ];
    return (
      <div>
        <CreateCustomer
          toggleCreateModal={this.toggleCreateModal}
          open={open}
          fetchCustomer={this.fetchCustomer}
          modalFor='create'
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
          customers={querySet}
          fetchCustomer={this.fetchCustomer}
        ></CustomerTable>
        <div className='pagination__container'>
          <Select
            className='rows__selector'
            onChange={(e, data) => {
              this.paginationHandler(data.value);
            }}
            placeholder='3'
            options={rowsOptions}
          />
          <div>
            <Button
              className='circular medium'
              onClick={(e) => {
                this.pageHandler(e.target.value);
              }}
              value='prev'
            >
              Prev
            </Button>
            <Label className='circular large'>{this.state.page}</Label>
            <Button
              className='circular medium'
              onClick={(e) => {
                this.pageHandler(e.target.value);
              }}
              value='next'
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
