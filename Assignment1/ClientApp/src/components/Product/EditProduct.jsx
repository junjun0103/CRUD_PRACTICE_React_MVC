import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const EditProduct = (props) => {
  const { open, toggleCreateModal, fetchProduct, selectedProduct } = props;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setPrice(selectedProduct.price);
    }
  }, [selectedProduct]);

  const EditProduct = () => {
    axios
      .put(`/products/PutProduct/${selectedProduct.id}`, {
        id: selectedProduct.id,
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
      <Modal.Header>Edit Product</Modal.Header>
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
        <Button color='blue' onClick={() => EditProduct()}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditProduct;
