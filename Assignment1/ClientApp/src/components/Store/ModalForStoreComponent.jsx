import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const ModalForStoreComponent = (props) => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [nameEmpty, setNameEmpty] = useState(false);
  const [addressEmpty, setAddressEmpty] = useState(false);
  const [nameSpecial, setNameSpecial] = useState(false);

  console.log('createStore modal');

  const { open, toggleCreateModal, fetchStore, modalFor, selectedStore } =
    props;
  const pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;

  useEffect(() => {
    if (selectedStore) {
      setName(selectedStore.name);
      setAddress(selectedStore.address);
    }
  }, [selectedStore]);

  const createStore = () => {
    if (name.trim() && address.trim()) {
      if (pattern_spc.test(name)) {
        setNameSpecial(true);
      } else {
        if (modalFor === 'create') {
          axios
            .post('/stores/PostStore', {
              name: name.trim(),
              address: address.trim(),
            })
            .then((res) => {
              console.log(res.data);
              fetchStore();
              toggleCreateModal(false);
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (modalFor === 'edit') {
          axios
            .put(`/Stores/PutStore/${selectedStore.id}`, {
              id: selectedStore.id,
              name: name.trim(),
              address: address.trim(),
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

  const setStoreName = (e) => {
    setName(e);
    setNameEmpty(false);
  };

  const setStoreAddress = (e) => {
    setAddress(e);
    setAddressEmpty(false);
  };

  const resetStates = () => {
    setName('');
    setAddress('');
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
              value={name ? name : ''}
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
              value={address ? address : ''}
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

export default ModalForStoreComponent;
