import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const CreateProduct = (props) => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [nameEmpty, setNameEmpty] = useState(false);
  const [priceEmpty, setPriceEmpty] = useState(false);
  const [nameSpecial, setNameSpecial] = useState(false);

  console.log('createProduct modal');

  const { open, toggleCreateModal, fetchProduct } = props;
  const pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;

  const createProduct = () => {
    if (name && price) {
      if (pattern_spc.test(name)) {
        setNameSpecial(true);
      } else {
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
      }
    } else {
      if (!name) {
        setNameEmpty(true);
      }
      if (!price) {
        setPriceEmpty(true);
      }
    }
  };
  const setProductName = (e) => {
    setName(e);
    setNameEmpty(false);
  };

  const setProductAddress = (e) => {
    setPrice(e);
    setPriceEmpty(false);
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
              onChange={(e) => setProductName(e.target.value)}
            />
            <span>{nameEmpty ? 'Please Enter Name' : ''}</span>
            <span>
              {nameSpecial ? 'Must not contain special characters' : ''}
            </span>
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <input
              placeholder='Price'
              onChange={(e) => setProductAddress(e.target.value)}
            />
            <span>{priceEmpty ? 'Please Enter Price' : ''}</span>
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
