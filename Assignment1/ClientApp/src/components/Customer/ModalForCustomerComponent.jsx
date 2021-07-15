import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const ModalForCustomerComponent = (props) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [nameEmpty, setNameEmpty] = useState(false);
  const [addressEmpty, setAddressEmpty] = useState(false);
  const [nameSpecial, setNameSpecial] = useState(false);

  console.log('createCustomer modal');

  const { open, toggleCreateModal, fetchCustomer, modalFor, selectedCustomer } =
    props;
  const pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;

  useEffect(() => {
    if (selectedCustomer) {
      setName(selectedCustomer.name);
      setAddress(selectedCustomer.address);
    }
  }, [selectedCustomer]);

  const createCustomer = () => {
    if (name.trim() && address.trim()) {
      if (pattern_spc.test(name)) {
        setNameSpecial(true);
      } else {
        if (modalFor === 'create') {
          axios
            .post('/customers/PostCustomer', {
              name: name.trim(),
              address: address.trim(),
            })
            .then((res) => {
              console.log(res.data);
              fetchCustomer();
              toggleCreateModal(false);
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (modalFor === 'edit') {
          axios
            .put(`/customers/PutCustomer/${selectedCustomer.id}`, {
              id: selectedCustomer.id,
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
        resetStates();
      }
    } else {
      if (!name.trim()) {
        setNameEmpty(true);
      }
      if (!address.trim()) {
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

  const resetStates = () => {
    setName('');
    setAddress('');
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
              value={name ? name : ''}
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
              value={address ? address : ''}
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

export default ModalForCustomerComponent;
