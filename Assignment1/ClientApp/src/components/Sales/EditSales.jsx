import React, { Component } from 'react';
import { Button, Form, Modal, Select } from 'semantic-ui-react';
import axios from 'axios';
import moment from 'moment';

export default class EditSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: null,
      customerId: null,
      storeId: null,
      dateSold: null,
    };
  }

  render() {
    const {
      open,
      toggleCreateModal,
      selectedSales,
      products,
      stores,
      customers,
    } = this.props;

    const productOptions = products.map((pro) => {
      return {
        key: pro.id,
        value: pro.id,
        text: pro.name,
      };
    });
    const customerOptions = customers.map((cus) => {
      return {
        key: cus.id,
        value: cus.id,
        text: cus.name,
      };
    });
    const storeOptions = stores.map((sto) => {
      return {
        key: sto.id,
        value: sto.id,
        text: sto.name,
      };
    });

    const editSales = () => {
      let putProductId = this.state.productId
        ? this.state.productId
        : selectedSales.product.id;
      let putCustomerId = this.state.customerId
        ? this.state.customerId
        : selectedSales.customer.id;
      let putStoreId = this.state.storeId
        ? this.state.storeId
        : selectedSales.store.id;
      let putDateSoldId = moment(
        this.state.dateSold ? this.state.dateSold : selectedSales.dateSold
      ).format('YYYY-MM-DD');
      console.log('putProductId' + putProductId);
      console.log('putCustomerId' + putCustomerId);
      console.log('putStoreId' + putStoreId);
      console.log('putDateSoldId' + putDateSoldId);

      axios
        .put(`/sales/PutSales/${selectedSales.id}`, {
          id: selectedSales.id,
          productId: Number(putProductId),
          customerId: Number(putCustomerId),
          storeId: Number(putStoreId),
          dateSold: putDateSoldId,
        })
        .then((res) => {
          // console.log(res.data);
          this.props.fetchSales();
          this.props.toggleCreateModal(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <Modal open={open}>
        <Modal.Header>Edit Sales</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Products</label>
              <Select
                onChange={(e, data) =>
                  this.setState({
                    productId: data.value,
                  })
                }
                placeholder={selectedSales ? selectedSales.product.name : null}
                options={productOptions}
              />
            </Form.Field>
            <Form.Field>
              <label>Customers</label>
              <Select
                onChange={(e, data) =>
                  this.setState({
                    customerId: data.value,
                  })
                }
                placeholder={selectedSales ? selectedSales.customer.name : null}
                options={customerOptions}
              />
            </Form.Field>
            <Form.Field>
              <label>Stores</label>
              <Select
                onChange={(e, data) =>
                  this.setState({
                    storeId: data.value,
                  })
                }
                placeholder={selectedSales ? selectedSales.store.name : null}
                options={storeOptions}
              />
            </Form.Field>
            <Form.Field>
              <label>DateSold</label>
              <input
                onChange={(event) =>
                  this.setState({ dateSold: event.target.value })
                }
                type='date'
                placeholder='DateSold'
                defaultValue={
                  selectedSales
                    ? moment(selectedSales.dateSold).format('YYYY-MM-DD')
                    : null
                }
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => toggleCreateModal(false)}>
            Cancel
          </Button>
          <Button color='blue' onClick={() => editSales()}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
