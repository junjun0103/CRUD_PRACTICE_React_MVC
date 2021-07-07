import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const CreateProduct = (props) => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  // useEffect(() => {
  //   return () => {
  //     console.log(name);
  //   };
  // }, [name]);
  console.log('createProduct modal');

  const { open, toggleCreateModal, fetchProduct } = props;

  const createProduct = () => {
    console.log(name);
    axios
      .post('/products/PostProduct', {
        name: name,
        price: Number(price),
      })
      .then((res) => {
        console.log(res.data);
        fetchProduct();
        toggleCreateModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal open={open}>
      <Modal.Header>Create Product</Modal.Header>
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
            <label>Price</label>
            <input
              placeholder='Price'
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleCreateModal(false)}>
          Cancel
        </Button>
        <Button color='blue' onClick={() => createProduct()}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateProduct;
