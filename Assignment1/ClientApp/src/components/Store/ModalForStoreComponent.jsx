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

  console.log('createStore modal');

  const { open, toggleCreateModal, fetchStore, modalFor, selectedStore } =
    props;
  
  useEffect(() => {
    if (selectedStore) {
      setName(selectedStore.name);
      setAddress(selectedStore.address);
    }
  }, [selectedStore]);

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
 

  const createStore = () => {
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
    }
  };

  const setStoreName = (e) => {
    setName(e);
    setNameEmpty(false);
  };

  const setStoreAddress = (e) => {
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
              onChange={(e) => setStoreAddress(e.target.value)}
            />
            <span className='validator'>{addressEmpty ? 'Please Enter Address' : ''}</span>
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

export default ModalForStoreComponent;
