import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';

const ModalForCustomerComponent = (props) => {
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

  console.log('createCustomer modal');

  const { open, toggleCreateModal, fetchCustomer, modalFor, selectedCustomer } =
    props;

  useEffect(() => {
    if (selectedCustomer) {
      setName(selectedCustomer.name);
      setAddress(selectedCustomer.address);
    }
  }, [selectedCustomer]);

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

  const createCustomer = () => {
    if (nameValidatorStatus && addressValidatorStatus) {
      if (modalFor === 'create') {
        axios
          .post('/customers/PostCustomer', {
            name: name.trim(),
            address: address.trim(),
          })
          .then((res) => {
            console.log(res.data);
            fetchCustomer();
            toggleCreateModal(false);
          })
          .catch((err) => {
            console.log(err);
          });
        console.log('create!!');
      } else if (modalFor === 'edit') {
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
        console.log('edit!!');
      }
      resetStates();
      resetValidatorStates();
    } else {
      validator(name, 'name');
      validator(address, 'address');
    }
  };

  const setCustomerName = (e) => {
    setName(e);
    validator(e, 'name');
  };

  const setCustomerAddress = (e) => {
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
      <Modal.Header>Create Customer</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder='Name'
              value={name ? name : ''}
              onChange={(e) => setCustomerName(e.target.value)}
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
              onChange={(e) => setCustomerAddress(e.target.value)}
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
        <Button color='blue' onClick={() => createCustomer()}>
          Submit
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ModalForCustomerComponent;
