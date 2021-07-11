import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';

const DeleteModal = (props) => {
  console.log('DeleteModal modal');

  const { open, toggleDeleteModal, fetchData, deleteSelectedItem, selectedId } =
    props;

  const deleteItem = () => {
    deleteSelectedItem(selectedId);
    console.log('test');
    fetchData();
    toggleDeleteModal(false);
  };

  return (
    <Modal open={open}>
      <Modal.Header>Delete</Modal.Header>
      <Modal.Content>
        <p>Do you really want to delete?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => toggleDeleteModal(false)}>
          Cancel
        </Button>
        <Button color='blue' onClick={() => deleteItem()}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteModal;
