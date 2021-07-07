import axios from 'axios';
import React, { Component, useState } from 'react';
import { Button, Table } from 'semantic-ui-react';
import EditSales from './EditSales';
import Moment from 'react-moment';
import moment from 'moment';

const SalesTable = (props) => {
  const { sales, fetchSales, customers, products, stores } = props;
  const [open, setOpen] = useState(false);
  const [selectedSales, setSelectedSales] = useState();

  function deleteSales(id) {
    axios
      .delete(`/sales/DeleteSales/${id}`)
      .then((res) => {
        // console.log(res.data);
        fetchSales();
      })
      .catch((err) => console.log(err));
  }

  const toggleCreateModal = (value, sales) => {
    setOpen(value);
    sales ? setSelectedSales(sales) : console.log('nothing');
  };

  // console.log(sales);

  return (
    <div>
      <EditSales
        toggleCreateModal={toggleCreateModal}
        open={open}
        fetchSales={fetchSales}
        selectedSales={selectedSales}
        sales={sales}
        customers={customers}
        products={products}
        stores={stores}
      />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>SalesId</Table.HeaderCell>
            <Table.HeaderCell>Products</Table.HeaderCell>
            <Table.HeaderCell>Customers</Table.HeaderCell>
            <Table.HeaderCell>Stores</Table.HeaderCell>
            <Table.HeaderCell>DateSold</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sales.map((sale) => (
            <Table.Row key={sale.id}>
              <Table.Cell>{sale.id}</Table.Cell>
              <Table.Cell>
                {sale.product.name ? sale.product.name : ''}
              </Table.Cell>
              <Table.Cell>
                {sale.customer.name ? sale.customer.name : ''}
              </Table.Cell>
              <Table.Cell>{sale.store.name ? sale.store.name : ''}</Table.Cell>
              <Table.Cell>
                {sale.dateSold
                  ? moment(sale.dateSold).format('YYYY-MM-DD')
                  : ''}
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color='olive'
                  onClick={() => toggleCreateModal(true, sale)}
                >
                  Edit
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color='red'
                  onClick={() => deleteSales(sale.id)}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default SalesTable;
