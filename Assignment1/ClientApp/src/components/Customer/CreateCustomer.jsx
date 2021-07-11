import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const CreateCustomer = (props) => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [nameEmpty, setNameEmpty] = useState(false);
  const [addressEmpty, setAddressEmpty] = useState(false);
  const [nameSpecial, setNameSpecial] = useState(false);

  console.log('createCustomer modal');

  const { open, toggleCreateModal, fetchCustomer } = props;
  const pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;

  const createCustomer = () => {
    if (name && address) {
      if (pattern_spc.test(name)) {
        setNameSpecial(true);
      } else {
        axios
          .post('/customers/PostCustomer', {
            name: name,
            address: address,
          })
          .then((res) => {
            console.log(res.data);
            fetchCustomer();
            toggleCreateModal(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      if (!name) {
        setNameEmpty(true);
      }
      if (!address) {
        setAddressEmpty(true);
      }
    }
  };

  const setCustomerName = (e) => {
    setName(e);
    setNameEmpty(false);
  };

  const setCustomerAddress = (e) => {
    setAddress(e);
    setAddressEmpty(false);
  };

  return (
    <Modal open={open}>
      <Modal.Header>Create Customer</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder='Name'
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <span>{nameEmpty ? 'Please Enter Name' : ''}</span>
            <span>
              {nameSpecial ? 'Must not contain special characters' : ''}
            </span>
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input
              placeholder='Address'
              onChange={(e) => setCustomerAddress(e.target.value)}
            />
            <span>{addressEmpty ? 'Please Enter Address' : ''}</span>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleCreateModal(false)}>
          Cancel
        </Button>
        <Button color='blue' onClick={() => createCustomer()}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateCustomer;
