import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const EditCustomer = (props) => {
  const { open, toggleCreateModal, fetchCustomer, selectedCustomer } = props;

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (selectedCustomer) {
      setName(selectedCustomer.name);
      setAddress(selectedCustomer.address);
    }
  }, [selectedCustomer]);

  const EditCustomer = () => {
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
  };

  return (
    <Modal open={open}>
      <Modal.Header>Edit Customer</Modal.Header>
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
            <label>Address</label>
            <input
              placeholder='Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleCreateModal(false)}>
          Cancel
        </Button>
        <Button color='blue' onClick={() => EditCustomer()}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditCustomer;
