import React, { useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap';
import '../../styles/admin/Common.scss';
import {formatDate} from '../common.js'
import { toast } from 'react-toastify';
import { deleteProduct, updateProduct } from '../../adminAPI';
import { reloadPage } from '../common';

// icons & css
import 'react-toastify/dist/ReactToastify.css';

// icons
import deleteIcon from '../../icons/delete.svg'
import editIcon from '../../icons/edit.svg'

export default function AllProductsDisplay ({products}) {
    
    const [selected, setSelected] = useState('') // for edit and delete modals
    
    // DELETE MODAL HANDLER
    const [delShow, setDelShow] = useState(false);
    const handleDelClose = () => setDelShow(false);
    const handleDelShow = () => setDelShow(true);

    // EDIT MODAL HANDLER
    const [editShow, setEditShow] = useState(false);
    const handleEditClose = () => setEditShow(false);
    const handleEditShow = () => setEditShow(true);


    function onClickDelBtn(id) {
        handleDelShow();
        const str_id = id.toString();
        setSelected(str_id);
    }

    function onClickEditBtn(id) {
        handleEditShow();
        const str_id = id.toString();
        setSelected(str_id);
    }
    
    // Edited Product
    const [editedProduct, setEditedProduct] = useState({
        name: "",
        category: "",
        price: "",
        image: "",
      });
  
      // Edit Product Handler
      const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
      }
      const handleEditImage = (e) => {
        let editedImg = { ...editedProduct };
        editedImg["image"] = e.target.files[0];
        setEditedProduct(editedImg);
      }

    // EDIT API
    async function editProduct() {
        const response = await updateProduct(selected, editedProduct);
        console.log(response)
        if (response.data.status === 200) {
        toast.success('Successfully edited a product!');
        setTimeout(function () {
            reloadPage();
        }, 2000);
        }
        if (response.data.status === 400) {
            toast.error('Failed to edit a product!');
        }
    }

    // DELETE API
    async function delProduct() {
        const response = await deleteProduct(selected);
        console.log(response)
        if (response.data.status === 204) {
        toast.success('Successfully deleted a product!');
        setTimeout(function () {
            reloadPage();
        }, 2000);
        }
        if (response.data.status === 400) {
            toast.error('Failed to delete a product!');
        }
        if (response.data.status === 404) {
            toast.error('Product not found!');
        }
    }

    

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
                        <tr key={product.id} className='text-center'>
                            <td><img alt='product-img' className="img-content" src={product.image}/></td>
                            <td>{product.name}</td>
                            <td>{"Php " + product.price}</td>
                            <td>{formatDate(product.last_modified)}</td>
                            <td>
                                <Button variant="primary "type="btn" 
                                onClick={() => onClickDelBtn(product.id)}>
                                <img src= {deleteIcon} height="20"/></Button> {" "}

                                <Button variant="primary "type="btn" onClick={() => onClickEditBtn(product.id)}>
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
                <Button variant="outline-success" type="submit" onClick={()=>delProduct()}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>

            {/* EDIT MODAL HANDLER */}
            <Modal show={editShow} onHide={handleEditClose} className='admin-modal'>
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group key='inline-radio' className="admin-formg4">
                    <div className='d-flex justify-content-between align-items-center'>
                    <Form.Label className='form-label-category'>Category</Form.Label>
                    <div>
                    <Form.Check
                        inline
                        label="Meal"
                        name="category"
                        type='radio'
                        id='inline-radio-1'
                        value='meal'
                        defaultChecked
                        onChange={(e) => handleEditChange(e)}
                    />
                    <Form.Check
                        inline
                        label="Dessert"
                        name="category"
                        type='radio'
                        id='inline-radio-2'
                        value='dessert'
                        onChange={(e) => handleEditChange(e)}
                    />
                    <Form.Check
                        inline
                        label="Drinks"
                        name="category"
                        type='radio'
                        id='inline-radio-3'
                        value='drink'
                        onChange={(e) => handleEditChange(e)}
                    />
                    </div>
                    </div>
                </Form.Group>
                <Form.Group className="admin-formg1">
                    <Form.Label>Product Name *</Form.Label>
                    <Form.Control type="text" name="name" required onChange={(e) => handleEditChange(e)}></Form.Control>
                </Form.Group>
                <Form.Group className="admin-formg2">
                    <Form.Label>Product Price *</Form.Label>
                    <Form.Control type="number" name="price" min="0.01" step="0.01" placeholder="Ex. 100" required onChange={(e) => handleEditChange(e)}></Form.Control>
                </Form.Group>
                <Form.Group className="admin-formg3">
                    <Form.Label>Product Image *</Form.Label>
                    <Form.Control type="file" name="image" required onChange={(e) => handleEditImage(e)}></Form.Control>
                </Form.Group>
                
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleEditClose}>
                Cancel
                </Button>
                <Button variant="success" type="submit" onClick={() => editProduct()}>
                Save changes
                </Button>
            </Modal.Footer>
            </Modal>
            
        </div>
      )
    
  }