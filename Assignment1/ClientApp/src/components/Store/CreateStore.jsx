import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const CreateStore = (props) => {
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  // useEffect(() => {
  //   return () => {
  //     console.log(name);
  //   };
  // }, [name]);
  console.log('createStore modal');

  const { open, toggleCreateModal, fetchStore } = props;

  const createStore = () => {
    console.log(name);
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
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input
              placeholder='Address'
              onChange={(e) => setAddress(e.target.value)}
            />
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
