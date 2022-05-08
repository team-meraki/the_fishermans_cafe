import React, {useEffect, useState} from 'react'
import { DropdownButton, Dropdown, Button, Modal, Form } from 'react-bootstrap'
import SideNavbar from "./SideNavbar";
import AllProductsDisplay from './AllProductsDisplay'
import '../../styles/admin/Common.scss';

// icons
import addIcon from '../../icons/add.svg'
import { addProduct, getAllProducts } from '../../adminAPI';

export default function AllProducts() {
  let [all, setProduct] = useState([]);
  let [meals, setMeals] = useState([]);
  let [desserts, setDesserts] = useState([]);
  let [drinks, setDrinks] = useState([]);
  //let [loading, setLoading] = useState(true);

  async function fetchAllProducts() {
    const response = await getAllProducts();
    setProduct(response.data.data);
    setMeals(response.data.data.filter(product => product.category === 'meal'))
    setDesserts(response.data.data.filter(product => product.category === 'dessert'))
    setDrinks(response.data.data.filter(product => product.category === 'drink'))
  }

    // Monitors state of filter value
    const [value, setValue] = useState('All');
    const handleCategorySelect = (e) => {
      setValue(e)
    }

    // Add Product
    const [newProduct, setNewProduct] = useState({
      name: "",
      category: "",
      price: "",
      image: "",
    });

    // Add Product Handler
    const handleAddChange = (e) => {
      const { name, value } = e.target;
      setNewProduct(prevState => ({
          ...prevState,
          [name]: value
      }));
    }

    async function addNewProduct() {
      console.log(newProduct)
      const response = await addProduct(newProduct);
      console.log(response);
      if(response.data.data.status === 201) {
          //toast.success(response.data.data.message.success);
          setTimeout(function () {
           // refreshPage();
          }, 3000);
        }
      if(response.data.status === 400) {
          //toast.error(response.data.message[0]);
      }
  }

    // DELETE MODAL HANDLER
    const [delShow, setDelShow] = useState(false);
    const handleDelClose = () => setDelShow(false);
    const handleDelShow = () => setDelShow(true);

    // EDIT MODAL HANDLER
    const [editShow, setEditShow] = useState(false);
    const handleEditClose = () => setEditShow(false);
    const handleEditShow = () => setEditShow(true);

    // ADD MODAL HANDLER
    const [addShow, setAddShow] = useState(false);
    const handleAddClose = () => setAddShow(false);
    const handleAddShow = () => setAddShow(true);

    useEffect(() => {
      fetchAllProducts();
    }, [])

  return (
    <div className='main-container'>
      <SideNavbar/>
      <div className='main_content'>
        {/* HEADER  */}
        <div className='d-flex justify-content-between header'>
            <h2>All Products</h2>
            <Button className='add-btn' type="button" variant='success' onClick={handleAddShow}>
                <span><img src={addIcon}></img></span>
                Add a new product
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
                  <Dropdown.Item eventKey="All">All</Dropdown.Item>
                  <Dropdown.Item eventKey="Meals">Meals</Dropdown.Item>
                  <Dropdown.Item eventKey="Desserts">Desserts</Dropdown.Item>
                  <Dropdown.Item eventKey="Drinks">Drinks</Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
        </div>

        
        {(value === 'All') && 
          <AllProductsDisplay 
            products={all}
            handleDelClose={handleDelClose}
            handleDelShow={handleDelShow}
            delShow={delShow}
            handleEditClose={handleEditClose}
            handleEditShow={handleEditShow}
            editShow={editShow}
          />
        }
          
        {(value === 'Meals') && 
          <AllProductsDisplay 
            products={meals}
            handleDelClose={handleDelClose}
            delShow={delShow}
            handleEditClose={handleEditClose}
            editShow={editShow}
          />
        }

        {(value === 'Desserts') && 
          <AllProductsDisplay 
            products={desserts}
            handleDelClose={handleDelClose}
            delShow={delShow}
            handleEditClose={handleEditClose}
            editShow={editShow}
          />
        }

        {(value === 'Drinks') && 
          <AllProductsDisplay 
            products={drinks}
            handleDelClose={handleDelClose}
            handleDelShow={handleDelShow}
            delShow={delShow}
            handleEditClose={handleEditClose}
            handleEditShow={handleEditShow}
            editShow={editShow}
        />}
          

        {/* ADD MODAL HANDLER */}
        <Modal show={addShow} onHide={handleAddClose} className='admin-modal'>
          <Modal.Header closeButton>
            <Modal.Title>
              Add New Product
            </Modal.Title>
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
                    name="group1"
                    type='radio'
                    id='inline-radio-1'
                  />
                  <Form.Check
                    inline
                    label="Dessert"
                    name="group1"
                    type='radio'
                    id='inline-radio-2'
                  />
                  <Form.Check
                    inline
                    label="Drinks"
                    name="group1"
                    type='radio'
                    id='inline-radio-3'
                  />
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="admin-formg1">
                <Form.Label>Product Name *</Form.Label>
                <Form.Control type="text" required onChange={(e) => handleAddChange(e)}></Form.Control>
              </Form.Group>
              <Form.Group className="admin-formg2">
                <Form.Label>Product Price *</Form.Label>
                <Form.Control type="number" min="0.01" step="0.01" placeholder="Ex. 100" required onChange={(e) => handleAddChange(e)}></Form.Control>
              </Form.Group>
              <Form.Group className="admin-formg3">
                <Form.Label>Product Image *</Form.Label>
                <Form.Control type="file" required onChange={(e) => handleAddChange(e)}></Form.Control>
              </Form.Group>
              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={handleAddClose}>
              Cancel
            </Button>
            <Button variant="success" type="submit" onClick={() => addNewProduct()}>
              Save product
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}