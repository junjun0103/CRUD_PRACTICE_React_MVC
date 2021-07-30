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

  console.log('createCustomer modal');

  const { open, toggleCreateModal, fetchCustomer, modalFor, selectedCustomer } =
    props;
  
  useEffect(() => {
    if (selectedCustomer) {
      setName(selectedCustomer.name);
      setAddress(selectedCustomer.address);
    }
  }, [selectedCustomer]);

  const IsEmpty = (el)=>{
    if(el.length<1){
      return true;
    }
    return false;
  }
  const IsNumber = (el)=>{
    let arr = el.split('');
    for(let temp of arr){
      if(!isNaN(temp)){
        return true;
      }
    }
    return false;
  }
  const IsSpecialCaractor = (el)=>{
    const pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;
    if(pattern_spc.test(el)){
      return true;
    }
    return false;
  } 
 

  const createCustomer = () => {
    resetValidatorStates();
    if(IsEmpty(name.trim())||IsEmpty(address.trim())){
      setNameEmpty(IsEmpty(name.trim()));
      setAddressEmpty(IsEmpty(address.trim()));
    }else if(IsSpecialCaractor(name.trim())||IsSpecialCaractor(address.trim())){
      setAddressSpecial(IsSpecialCaractor(address.trim()));
      setNameSpecial(IsSpecialCaractor(name.trim()));
    }else if(IsNumber(name.trim())){
      setNameNumber(IsNumber(name.trim()));
    }else{
      console.log(nameEmpty +'&&'+ addressEmpty +'&&'+ nameSpecial +'&&'+ addressSpecial +'&&'+ nameNumber);
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
    }
  };

  const setCustomerName = (e) => {
    setName(e);
    setNameEmpty(false);
  };

  const setCustomerAddress = (e) => {
    setAddress(e);
    setAddressEmpty(false);
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
            <span className='validator'>{nameEmpty ? 'Please Enter Name' : ''}</span>
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
            <span className='validator'>{addressEmpty ? 'Please Enter Address' : ''}</span>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => {toggleCreateModal(false);resetStates(); resetValidatorStates();}}>
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
