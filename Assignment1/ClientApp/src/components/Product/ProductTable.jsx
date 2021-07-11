import axios from 'axios';
import React, { Component, useState } from 'react';
import { Button, Table } from 'semantic-ui-react';
import EditProduct from './EditProduct';
import DeleteModal from '../ShareComponents/DeleteModal';

const ProductTable = (props) => {
  const { products, fetchProduct } = props;
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedId, setSelectedId] = useState();

  //function editCustomer(id) {}

  function deleteProduct(id) {
    axios
      .delete(`/products/DeleteProduct/${id}`)
      .then((res) => {
        console.log(res.data);
        fetchProduct();
      })
      .catch((err) => console.log(err));
  }

  const toggleCreateModal = (value, product) => {
    setOpen(value);
    product ? setSelectedProduct(product) : console.log('nothing');
  };

  const toggleDeleteModal = (value, productId) => {
    setOpenDeleteModal(value);
    productId ? setSelectedId(productId) : console.log('nothing');
  };

  return (
    <div>
      <EditProduct
        toggleCreateModal={toggleCreateModal}
        open={open}
        fetchProduct={fetchProduct}
        selectedProduct={selectedProduct}
      />
      <DeleteModal
        toggleDeleteModal={toggleDeleteModal}
        open={openDeleteModal}
        fetchData={fetchProduct}
        deleteSelectedItem={deleteProduct}
        selectedId={selectedId}
      />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {products.map((product) => (
            <Table.Row key={product.id}>
              <Table.Cell>{product.id}</Table.Cell>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color='olive'
                  onClick={() => toggleCreateModal(true, product)}
                >
                  Edit
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  inverted
                  color='red'
                  onClick={() => toggleDeleteModal(true, product.id)}
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

export default ProductTable;
