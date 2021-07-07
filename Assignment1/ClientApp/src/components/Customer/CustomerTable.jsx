import axios from 'axios';
import React, { Component, useState } from 'react';
import { Button, Table } from 'semantic-ui-react';
import EditCustomer from './EditCustomer';

const CustomerTable = (props) => {
  const { customers, fetchCustomer } = props;
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState();

  //function editCustomer(id) {}

  function deleteCustomer(id) {
    axios
      .delete(`/customers/DeleteCustomer/${id}`)
      .then((res) => {
        console.log(res.data);
        fetchCustomer();
      })
      .catch((err) => console.log(err));
  }

  const toggleCreateModal = (value, customer) => {
    setOpen(value);
    customer ? setSelectedCustomer(customer) : console.log('nothing');
  };

  return (
    <div>
      <EditCustomer
        toggleCreateModal={toggleCreateModal}
        open={open}
        fetchCustomer={fetchCustomer}
        selectedCustomer={selectedCustomer}
      />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {customers.map((customer) => (
            <Table.Row key={customer.id}>
              <Table.Cell>{customer.id}</Table.Cell>
              <Table.Cell>{customer.name}</Table.Cell>
              <Table.Cell>{customer.address}</Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color='olive'
                  onClick={() => toggleCreateModal(true, customer)}
                >
                  Edit
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color='red'
                  onClick={() => deleteCustomer(customer.id)}
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

export default CustomerTable;
