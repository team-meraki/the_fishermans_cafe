import React, { useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap';
import '../../styles/admin/Common.scss';
import {formatDate} from '../common.js'
import { toast } from 'react-toastify';
import useAxios from './utils/useAxios';
import PulseLoader from "react-spinners/PulseLoader";

// icons & css
import 'react-toastify/dist/ReactToastify.css';

// icons
import deleteIcon from '../../icons/delete.svg'
import editIcon from '../../icons/edit.svg'

export default function AllProductsDisplay ({products, refreshData, setRefreshData}) {
    const [clicked, setClicked] = useState(false);
    const initialData = Object.freeze({
        id: "",
        name: "",
        category: "",
        price: ""
    })
    const [selected, setSelected] = useState(initialData) // for edit and delete modals
    const api = useAxios()

    // DELETE MODAL HANDLER
    const [delShow, setDelShow] = useState(false);
    const handleDelClose = () => {
        setDelShow(false);
        setSelected(initialData)
    }
    const handleDelShow = () => setDelShow(true);

    // EDIT MODAL HANDLER
    const [editShow, setEditShow] = useState(false);
    const handleEditClose = () => {
        setEditShow(false); 
        setEditedProduct(initialData)
    }
    const handleEditShow = () => setEditShow(true);

    // Edited Product
    const [editedProduct, setEditedProduct] = useState(initialData);
    
    function onClickDelBtn(id) {
        const str_id = id.toString();
        setSelected(str_id);
        handleDelShow();
    }


    function onClickEditBtn(product) {
        setSelected({
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
        })
        setEditedProduct({
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
        })
        handleEditShow();
        
        //const str_id = id.toString();
        //setSelected(product);
    }
    
    
  
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
        editedImg[e.target.name] = e.target.files[0];
        setEditedProduct(editedImg);
      }
    
    
    const updateProduct = async (product) => {
        
        let response;
        let form_data = new FormData();
        form_data.append("name", product.name);
        form_data.append("price", product.price);
        form_data.append("category", product.category);
    
        if (product.image){
        form_data.append("image", product.image, product.image.name);
    
        response = await api.put(
            'api/product/' + product.id +'/',
            form_data,
            { headers: {
                "Content-Type": "multipart/form-data",
            },}
        )
        }
        else {
        response = await api.patch(
            'api/product/' + product.id +'/',
            form_data,
            { headers: {
                "Content-Type": "multipart/form-data",
            },}
        )
        }
    
        return response
    }

    // EDIT API
    async function editProduct() {
        if (clicked===false) {
            setClicked(true);
            updateProduct(editedProduct)
            .then(response => {
                if (response.status === 200) {
                    setEditShow(false)
                    setSelected(initialData)
                    setEditedProduct(initialData)
                    toast.success('Successfully edited a product!', { autoClose: 2000, hideProgressBar: true });
                    setRefreshData(!refreshData)
                }
            })
            .catch(error => {
                if (error.response.status === 400) {
                    setEditedProduct(selected)
                    const errorData = error.response.data
                    for (const key in errorData){
                    for (const message of errorData[key]){
                        toast.error(`Error in ${key.toUpperCase()} field: ${message}`, { autoClose: 2000, hideProgressBar: true });
                    }
                    }
                } else {
                    toast.error('Failed to edit a product.', { autoClose: 2000, hideProgressBar: true });
                }
            })
            .finally(
                setClicked(false)
            )
        }
    }

    const deleteProduct = async (id) => {
        const response = await api.delete('api/product/' + id);
        return response 
    }

    // DELETE API
    async function delProduct() {
        setDelShow(false)
        deleteProduct(selected)
        .then(response => {
            if (response.status === 204) {
                setSelected(initialData)
                toast.success('Successfully deleted a product!', { autoClose: 2000, hideProgressBar: true });
                setRefreshData(!refreshData)
            }
        })
        .catch(error => {
            if (error.response.status === 404) {
                toast.error('Product not found.', { autoClose: 2000, hideProgressBar: true });
            } else {
                toast.error('Failed to delete a product.', { autoClose: 2000, hideProgressBar: true })
            }
        })
    }

    

      return (
        <div className='tablewrapper'>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Last Modified</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => ( 
                        <tr key={product.id}>
                            <td className='img-cell'><img alt='product-img' className="img-content" src={product.image}/></td>
                            <td>{product.name}</td>
                            <td>{"Php " + product.price}</td>
                            <td>{formatDate(product.last_modified)}</td>
                            <td>
                                <Button variant="primary "type="btn" 
                                onClick={() => onClickDelBtn(product.id)}>
                                <img src= {deleteIcon} alt="Delete Icon" height="20"/></Button> {" "}

                                <Button variant="primary "type="btn" onClick={() => onClickEditBtn(product)}>
                                <img src= {editIcon} alt="Edit Icon" height="20"/></Button> {" "}
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
                {(clicked === true) && 
                    (<Button variant="outline-success" type="submit" disabled className='loader-btn'>
                        Deleting <PulseLoader color="#5cb85c" size={5} speedMultiplier={0.5} />
                    </Button>)
                }
                {(clicked === false) && 
                    (<Button variant="outline-success" type="submit" onClick={() => delProduct()}>
                    Delete</Button>)
                }
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
                        checked={editedProduct.category === 'meal' ? true : false}
                        onChange={(e) => handleEditChange(e)}
                    />
                    <Form.Check
                        inline
                        label="Dessert"
                        name="category"
                        type='radio'
                        id='inline-radio-2'
                        value='dessert'
                        checked={editedProduct.category === 'dessert' ? true : false}
                        onChange={(e) => handleEditChange(e)}
                    />
                    <Form.Check
                        inline
                        label="Drinks"
                        name="category"
                        type='radio'
                        id='inline-radio-3'
                        value='drink'
                        checked={editedProduct.category === 'drink' ? true : false}
                        onChange={(e) => handleEditChange(e)}
                    />
                    </div>
                    </div>
                </Form.Group>
                <Form.Group className="admin-formg1">
                    <Form.Label>Product Name *</Form.Label>
                    <Form.Control type="text" name="name" required autoComplete="off" value={editedProduct.name} onChange={(e) => handleEditChange(e)}></Form.Control>
                </Form.Group>
                <Form.Group className="admin-formg2">
                    <Form.Label>Product Price *</Form.Label>
                    <Form.Control type="number" name="price" min="0.01" step="0.01" placeholder="Ex. 100" required autoComplete="off" value={editedProduct.price} onChange={(e) => handleEditChange(e)}></Form.Control>
                </Form.Group>
                <Form.Group className="admin-formg3">
                    <Form.Label>Product Image *</Form.Label>
                    <Form.Control type="file" name="image" accept="image/*" required onChange={(e) => handleEditImage(e)}></Form.Control>
                </Form.Group>
                
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleEditClose}>
                Cancel
                </Button>
                {(clicked === true) && 
                    (<Button variant="success" type="submit" disabled className='loader-btn'>
                        Updating <PulseLoader color="#FFFFFF" size={5} speedMultiplier={0.5} />
                    </Button>)
                }
                {(clicked === false) && 
                    (<Button variant="success" type="submit" onClick={() => editProduct()}>
                    Save changes</Button>)
                }
            </Modal.Footer>
            </Modal>
            
        </div>
      )
    
  }