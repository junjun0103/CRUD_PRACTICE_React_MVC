import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const CreateStore = (props) => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [nameEmpty, setNameEmpty] = useState(false);
  const [addressEmpty, setAddressEmpty] = useState(false);
  const [nameSpecial, setNameSpecial] = useState(false);

  console.log('createStore modal');

  const { open, toggleCreateModal, fetchStore } = props;
  const pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;

  const createStore = () => {
    if (name && address) {
      if (pattern_spc.test(name)) {
        setNameSpecial(true);
      } else {
        axios
          .post('/stores/PostStore', {
            name: name,
            address: address,
          })
          .then((res) => {
            console.log(res.data);
            fetchStore();
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

  const setStoreName = (e) => {
    setName(e);
    setNameEmpty(false);
  };

  const setStoreAddress = (e) => {
    setAddress(e);
    setAddressEmpty(false);
  };

  return (
    <Modal open={open}>
      <Modal.Header>Create Store</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder='Name'
              onChange={(e) => setStoreName(e.target.value)}
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
              onChange={(e) => setStoreAddress(e.target.value)}
            />
            <span>{addressEmpty ? 'Please Enter Address' : ''}</span>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleCreateModal(false)}>
          Cancel
        </Button>
        <Button color='blue' onClick={() => createStore()}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateStore;
