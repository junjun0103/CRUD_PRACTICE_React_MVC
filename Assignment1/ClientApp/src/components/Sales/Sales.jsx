import axios from 'axios';
import React, { Component } from 'react';
import { Button, Select, Label } from 'semantic-ui-react';
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
      rows: 3,
      page: 1,
      pages: 1,
      querySet: [],
    };
  }
  componentDidMount() {
    this.fetchSales();
    this.fetchCustomer();
    this.fetchProduct();
    this.fetchStore();
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
    this.pagination(this.state.sales, this.state.page, data);
  };

  pageHandler = (data) => {
    // console.log(data);
    let currentPage = this.state.page;
    if (data === 'prev') {
      if (currentPage > 1) {
        this.setState({
          page: currentPage - 1,
        });
        this.pagination(this.state.sales, currentPage - 1, this.state.rows);
      }
    } else if (data === 'next') {
      if (currentPage < this.state.pages) {
        this.setState({
          page: currentPage + 1,
        });
        this.pagination(this.state.sales, currentPage + 1, this.state.rows);
      }
    }
  };

  fetchSales = () => {
    axios
      .get('/sales/getSales')
      .then((sale) => {
        // console.log(cus.data);
        this.setState({
          sales: sale.data,
        });
        this.pagination(sale.data, this.state.page, this.state.rows);
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
    const { querySet, open, customers, products, stores } = this.state;
    const rowsOptions = [
      { key: 3, text: 3, value: 3 },
      { key: 5, text: 5, value: 5 },
    ];
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
          sales={querySet}
          fetchSales={this.fetchSales}
          customers={customers}
          products={products}
          stores={stores}
        ></SalesTable>
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
