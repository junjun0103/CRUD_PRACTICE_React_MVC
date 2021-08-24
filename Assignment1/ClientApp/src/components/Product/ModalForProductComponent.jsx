import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const ModalForProductComponent = (props) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  // for valiadation
  const [nameEmpty, setNameEmpty] = useState(false);
  const [nameNumber, setNameNumber] = useState(false);
  const [nameSpecial, setNameSpecial] = useState(false);
  const [priceEmpty, setPriceEmpty] = useState(false);
  const [priceMinus, setPriceMinus] = useState(false);
  const [nameValidatorStatus, setNameValidatorStatus] = useState(false);
  const [priceValidatorStatus, setPriceValidatorStatus] = useState(false);

  console.log('createProduct modal');

  const { open, toggleCreateModal, fetchProduct, modalFor, selectedProduct } =
    props;

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setPrice(selectedProduct.price);
    }
  }, [selectedProduct]);

  const IsEmpty = (el) => {
    if (el.length < 1) {
      return true;
    }
    return false;
  };
  const IsNumber = (el) => {
    let arr = el.split('');
    for (let temp of arr) {
      if (!isNaN(temp) && temp !== ' ') {
        return true;
      }
    }
    return false;
  };
  const IsSpecialCaractor = (el) => {
    const pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;
    if (pattern_spc.test(el)) {
      return true;
    }
    return false;
  };
  const IsMinus = (el) => {
    if (el < 0) {
      return true;
    }
    return false;
  };

  const validator = (el, type) => {
    const data = el;
    const isEmpty = IsEmpty(data);
    const isSpecialCaractor = IsSpecialCaractor(data);
    const isNumber = IsNumber(data);
    const isMinus = IsMinus(data);
    if (type === 'name') {
      setNameEmpty(isEmpty);
      setNameSpecial(isSpecialCaractor);
      setNameNumber(isNumber);
      if (isEmpty || isSpecialCaractor || isNumber) {
        setNameValidatorStatus(false);
      } else {
        setNameValidatorStatus(true);
        return true;
      }
    } else if (type === 'price') {
      setPriceEmpty(isEmpty);
      setPriceMinus(isMinus);
      if (isEmpty || isMinus) {
        setPriceValidatorStatus(false);
      } else {
        setPriceValidatorStatus(true);
        return true;
      }
    }
  };

  const createProduct = () => {
    if (nameValidatorStatus && priceValidatorStatus) {
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
        console.log('create!!');
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
        console.log('edit!!');
      }
      resetStates();
      resetValidatorStatus();
    } else {
      validator(name, 'name');
      validator(price, 'price');
    }
  };

  const setProductName = (e) => {
    setName(e);
    validator(e, 'name');
  };

  const setProductPrice = (e) => {
    setPrice(e);
    validator(e, 'price');
  };

  const resetStates = () => {
    setName('');
    setPrice('');
  };
  const resetValidatorStatus = () => {
    setNameEmpty(false);
    setNameSpecial(false);
    setNameNumber(false);
    setPriceEmpty(false);
    setNameValidatorStatus(false);
    setPriceValidatorStatus(false);
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
            <span className='validator'>
              {nameEmpty ? 'Please Enter Name' : ''}
            </span>
            <span className='validator'>
              {nameSpecial ? 'Must not contain special characters' : ''}
            </span>
            <span className='validator'>
              {nameNumber ? 'Must not contain Number' : ''}
            </span>
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <input
              type='number'
              placeholder='Price'
              value={price ? price : ''}
              onChange={(e) => setProductPrice(e.target.value)}
            />
            <span className='validator'>
              {priceEmpty ? 'Please Enter Price' : ''}
            </span>
            <span className='validator'>
              {priceMinus ? 'Please Enter Positive Numbers' : ''}
            </span>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color='black'
          onClick={() => {
            toggleCreateModal(false);
            resetStates();
            resetValidatorStatus();
          }}
        >
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
