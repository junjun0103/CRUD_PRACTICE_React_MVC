import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const ModalForProductComponent = (props) => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [nameEmpty, setNameEmpty] = useState(false);
  const [priceEmpty, setPriceEmpty] = useState(false);
  const [nameSpecial, setNameSpecial] = useState(false);

  console.log('createProduct modal');

  const { open, toggleCreateModal, fetchProduct, modalFor, selectedProduct } =
    props;
  const pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setPrice(selectedProduct.price);
    }
  }, [selectedProduct]);

  const createProduct = () => {
    if (name.trim() && price) {
      if (pattern_spc.test(name)) {
        setNameSpecial(true);
      } else {
        if (modalFor === 'create') {
          axios
            .post('/products/PostProduct', {
              name: name.trim(),
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
        } else if (modalFor === 'edit') {
          axios
            .put(`/products/PutProduct/${selectedProduct.id}`, {
              id: selectedProduct.id,
              name: name.trim(),
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
        resetStates();
      }
    } else {
      if (!name.trim()) {
        setNameEmpty(true);
      }
      if (!price.trim()) {
        setPriceEmpty(true);
      }
    }
  };
  const setProductName = (e) => {
    setName(e);
    setNameEmpty(false);
  };

  const setProductPrice = (e) => {
    setPrice(e);
    setPriceEmpty(false);
  };

  const resetStates = () => {
    setName('');
    setPrice('');
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
              value={name ? name : ''}
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
              value={price ? price : ''}
              onChange={(e) => setProductPrice(e.target.value)}
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

export default ModalForProductComponent;
