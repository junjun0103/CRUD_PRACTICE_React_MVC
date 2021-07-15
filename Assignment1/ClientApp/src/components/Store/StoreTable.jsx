import axios from 'axios';
import React, { useState } from 'react';
import { Button, Table } from 'semantic-ui-react';
import EditStore from './ModalForStoreComponent';
import DeleteModal from '../ShareComponents/DeleteModal';

const StoreTable = (props) => {
  const { stores, fetchStore } = props;
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState();
  const [selectedId, setSelectedId] = useState();

  //function editCustomer(id) {}

  function deleteStore(id) {
    axios
      .delete(`/stores/DeleteStore/${id}`)
      .then((res) => {
        console.log(res.data);
        fetchStore();
      })
      .catch((err) => console.log(err));
  }

  const toggleCreateModal = (value, store) => {
    setOpen(value);
    store ? setSelectedStore(store) : console.log('nothing');
  };
  const toggleDeleteModal = (value, customerId) => {
    setOpenDeleteModal(value);
    customerId ? setSelectedId(customerId) : console.log('nothing');
  };

  return (
    <div>
      <EditStore
        toggleCreateModal={toggleCreateModal}
        open={open}
        fetchStore={fetchStore}
        modalFor='edit'
        selectedStore={selectedStore}
      />
      <DeleteModal
        toggleDeleteModal={toggleDeleteModal}
        open={openDeleteModal}
        fetchData={fetchStore}
        deleteSelectedItem={deleteStore}
        selectedId={selectedId}
      />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {stores.map((store) => (
            <Table.Row key={store.id}>
              <Table.Cell>{store.id}</Table.Cell>
              <Table.Cell>{store.name}</Table.Cell>
              <Table.Cell>{store.address}</Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color='olive'
                  onClick={() => toggleCreateModal(true, store)}
                >
                  Edit
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color='red'
                  onClick={() => toggleDeleteModal(true, store.id)}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default StoreTable;
