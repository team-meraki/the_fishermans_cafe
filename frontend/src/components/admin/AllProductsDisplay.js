import React, { Component, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap';
import '../../styles/admin/Common.scss';
import {formatDate} from '../common.js'

// icons
import deleteIcon from '../../icons/delete.svg'
import editIcon from '../../icons/edit.svg'

export default function AllProductsDisplay ({products, handleDelClose, handleDelShow, delShow, handleEditClose, handleEditShow, editShow} ) {

      return (
        <div className='tablewrapper'>
            <Table responsive>
                <thead>
                    <tr className='text-center'>
                        <th></th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Last Modified</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => ( 
                        <tr className='text-center'>
                            <td><img alt='product-img' className="img-content" src={product.image}/></td>
                            <td>{product.name}</td>
                            <td>{"Php " + product.price}</td>
                            <td>{formatDate(product.last_modified)}</td>
                            <td>
                                <Button variant="primary "type="btn" 
                                onClick={handleDelShow}>
                                <img src= {deleteIcon} height="20"/></Button> {" "}

                                <Button variant="primary "type="btn" onClick={handleEditShow}>
                                <img src= {editIcon} height="20"/></Button> {" "}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* DELETE MODAL */}
            <Modal show={delShow} onHide={handleDelClose} className='admin-modal'>
                <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to delete this photo?</Modal.Title>
                </Modal.Header>
                <Modal.Body>You cannot undo this action.</Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={handleDelClose}>
                    Cancel
                </Button>
                <Button variant="outline-success" onClick={handleDelClose}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>

            {/* EDIT MODAL HANDLER */}
            <Modal show={editShow} onHide={handleEditClose} className='admin-modal'>
            <Modal.Header closeButton>
                <Modal.Title>
                Edit Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group className="admin-formg1">
                    <Form.Label>Product Name *</Form.Label>
                    <Form.Control type="text" placeholder="Product Name" autoFocus required></Form.Control>
                </Form.Group>
                <Form.Group className="admin-formg2">
                    <Form.Label>Product Price *</Form.Label>
                    <Form.Control type="price" placeholder="PHP" autoFocus required></Form.Control>
                </Form.Group>
                <Form.Group className="admin-formg3">
                    <Form.Label>Product Image *</Form.Label>
                    <Form.Control type="file" autoFocus></Form.Control>
                </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleEditClose}>
                Close
                </Button>
                <Button variant="sucess">
                Save Changes
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
      )
    
  }