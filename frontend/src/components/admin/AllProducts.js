import React, {useEffect, useState} from 'react'
import { Tabs, Tab, DropdownButton, Dropdown, Button, Modal, Form } from 'react-bootstrap'
import SideNavbar from "./SideNavbar";
import AllProductsDisplay from './AllProductsDisplay'
import '../../styles/admin/Common.scss';

// icons
import addIcon from '../../icons/add.svg'

export default function AllProducts() {
  let [products, setProduct] = useState([]);

    useEffect(() => {
        let mounted = true
        getProduct()
        .then(products => {
            if(mounted) {
                setProduct(products)
            }
        })
        return () => mounted = false
    }, [])

    let getProduct = async () => {
        let response = await fetch("/api/product/")
        let data = await response.json()
        return data
    }

    // Filter products the belong to meal catgory
    const meals = products.filter(product => product.category === 'meal');

    // Filter products the belong to dessert catgory
    const desserts = products.filter(product => product.category === 'dessert');

    // Filter products the belong to drink catgory
    const drinks = products.filter(product => product.category === 'drink');
    
    // Monitors state of filter value
    const [value, setValue] = useState('category');
    const handleCategorySelect = (e) => {
      setValue(e)
    }


    // ADD MODAL HANDLER
    const [addShow, setAddShow] = useState(false);
    const handleAddClose = () => setAddShow(false);
    const handleAddShow = () => setAddShow(true);

  return (
    <div className='main-container'>
      <SideNavbar/>
      <div className='main_content'>
        <div className='header'>
          <h2>Products</h2>
          <Button className='add-btn' type="button" variant='success' onClick={handleAddShow}>
            <span><img src={addIcon}></img></span>
            Add New Product
          </Button>
        </div>

        <div className='content-wrapper'>
          <div className='d-flex align-items-center'>
            <h6>Filter by: </h6>
            <div>
              <DropdownButton 
                id="dropdown-basic-button" 
                title={value} 
                variant='info'
                size="sm"
                onSelect={handleCategorySelect}
              >
                <Dropdown.Item eventKey="meals">Meals</Dropdown.Item>
                <Dropdown.Item eventKey="desserts">Desserts</Dropdown.Item>
                <Dropdown.Item eventKey="drinks">Drinks</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        
          {(value === 'meals' || value === 'category') && <AllProductsDisplay products={meals}/>}
          {(value === 'desserts') && <AllProductsDisplay products={desserts}/>}
          {(value === 'drinks') && <AllProductsDisplay products={drinks}/>}
          
        </div>

        {/* ADD MODAL HANDLER */}
        <Modal show={addShow} onHide={handleAddClose} className='admin-modal'>
          <Modal.Header closeButton>
            <Modal.Title>
              Add New Product
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
            <Button variant="outline-danger" onClick={handleAddClose}>
              Close
            </Button>
            <Button variant="sucess" onClick={handleAddClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}