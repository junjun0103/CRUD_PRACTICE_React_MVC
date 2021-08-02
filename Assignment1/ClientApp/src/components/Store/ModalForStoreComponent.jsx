import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const ModalForStoreComponent = (props) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  // for valiadation
  const [nameEmpty, setNameEmpty] = useState(false);
  const [nameNumber, setNameNumber] = useState(false);
  const [nameSpecial, setNameSpecial] = useState(false);
  const [addressSpecial, setAddressSpecial] = useState(false);
  const [addressEmpty, setAddressEmpty] = useState(false);
  const [nameValidatorStatus, setNameValidatorStatus] = useState(false);
  const [addressValidatorStatus, setAddressValidatorStatus] = useState(false);

  console.log('createStore modal');

  const { open, toggleCreateModal, fetchStore, modalFor, selectedStore } =
    props;

  useEffect(() => {
    if (selectedStore) {
      setName(selectedStore.name);
      setAddress(selectedStore.address);
    }
  }, [selectedStore]);

  const IsEmpty = (el) => {
    if (el.length < 1) {
      return true;
    }
    return false;
  };
  const IsNumber = (el) => {
    let arr = el.split('');
    for (let temp of arr) {
      if (!isNaN(temp)) {
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

  const validator = (el, type) => {
    const data = el;
    const isEmpty = IsEmpty(data);
    const isSpecialCaractor = IsSpecialCaractor(data);
    const isNumber = IsNumber(data);
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
    } else if (type === 'address') {
      setAddressEmpty(isEmpty);
      setAddressSpecial(isSpecialCaractor);
      if (isEmpty || isSpecialCaractor) {
        setAddressValidatorStatus(false);
      } else {
        setAddressValidatorStatus(true);
        return true;
      }
    }
  };

  const createStore = () => {
    if (nameValidatorStatus && addressValidatorStatus) {
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
        console.log('create!!');
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
        console.log('edit!!');
      }
      resetStates();
      resetValidatorStates();
    } else {
      validator(name, 'name');
      validator(address, 'address');
    }
  };

  const setStoreName = (e) => {
    setName(e);
    validator(e, 'name');
  };

  const setStoreAddress = (e) => {
    setAddress(e);
    validator(e, 'address');
  };

  const resetStates = () => {
    setName('');
    setAddress('');
  };
  const resetValidatorStates = () => {
    setNameEmpty(false);
    setNameSpecial(false);
    setNameNumber(false);
    setAddressEmpty(false);
    setAddressSpecial(false);
    setNameValidatorStatus(false);
    setAddressValidatorStatus(false);
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
            <label>Address</label>
            <input
              placeholder='Address'
              value={address ? address : ''}
              onChange={(e) => setStoreAddress(e.target.value)}
            />
            <span className='validator'>
              {addressEmpty ? 'Please Enter Address' : ''}
            </span>
            <span className='validator'>
              {addressSpecial ? 'Must not contain special characters' : ''}
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
            resetValidatorStates();
          }}
        >
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
