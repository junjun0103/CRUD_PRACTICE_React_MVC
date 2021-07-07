import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const EditStore = (props) => {
  const { open, toggleCreateModal, fetchStore, selectedStore } = props;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (selectedStore) {
      setName(selectedStore.name);
      setPrice(selectedStore.address);
    }
  }, [selectedStore]);

  const EditStore = () => {
    axios
      .put(`/Stores/PutStore/${selectedStore.id}`, {
        id: selectedStore.id,
        name: name,
        price: Number(price),
      })
      .then((res) => {
        console.log(res.data);
        fetchStore();
        toggleCreateModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal open={open}>
      <Modal.Header>Edit Store</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <input
              placeholder='Price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleCreateModal(false)}>
          Cancel
        </Button>
        <Button color='blue' onClick={() => EditStore()}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditStore;
