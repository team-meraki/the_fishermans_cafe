import React, {useEffect, useState} from 'react'
import SideNavbar from "./SideNavbar";
import AllProductsDisplay from './AllProductsDisplay'
import { DropdownButton, Dropdown, Button, Modal, Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import { addProduct, getAllProducts } from '../../adminAPI';

// icons & css
import addIcon from '../../icons/add.svg'
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/admin/Common.scss';

export default function AllProducts() {
  let [all, setProduct] = useState([]);
  let [meals, setMeals] = useState([]);
  let [desserts, setDesserts] = useState([]);
  let [drinks, setDrinks] = useState([]);
  

  // Monitors state of filter value
  const [value, setValue] = useState('All');
  const handleCategorySelect = (e) => {
    setValue(e)
  }

  const [refreshData, setRefreshData] = useState(false)

  // Get all products
  async function fetchAllProducts() {
    const response = await getAllProducts();
    return response
  }

  // ADD MODAL HANDLER
  const [addShow, setAddShow] = useState(false);
  const handleAddClose = () => {
    setAddShow(false);
    setNewProduct(initialData);
  }
  const handleAddShow = () => setAddShow(true);

    // Add Product
    const initialData = Object.freeze({
      name: "",
      category: "meal",
      price: "",
      image: "",
    })

    const [newProduct, setNewProduct] = useState(initialData);
    
    // Add Product Handler
    const handleAddChange = (e) => {
      const { name, value } = e.target;
      setNewProduct(prevState => ({
          ...prevState,
          [name]: value
      }));
    }
    const handleAddImage = (e) => {
      let newProductWithImg = { ...newProduct };
      newProductWithImg["image"] = e.target.files[0];
      setNewProduct(newProductWithImg);
    }
    
    // POST API
    async function addNewProduct() {
      const response = await addProduct(newProduct);

      if (response.data.status === 201) {
          setAddShow(false)
          setNewProduct(initialData);
          toast.success('Successfully added a product!');
          setRefreshData(!refreshData)
      } 
      else if (response.data.status === 400) {
        const error = JSON.parse(response.data.request.response)
        for (const key in error){
          for (const message of error[key]){
            toast.error(`Error in ${key.toUpperCase()} field: ${message}`);
          }
        }
        //toast.error('Invalid field: Failed to add the product!');
      }  
    }
    
    useEffect(() => {
      let mounted = true
      fetchAllProducts()
      .then(response => {
          if(mounted) {
            setProduct(response.data.data);
            setMeals(response.data.data.filter(product => product.category === 'meal'))
            setDesserts(response.data.data.filter(product => product.category === 'dessert'))
            setDrinks(response.data.data.filter(product => product.category === 'drink'))
          }
      })
      return () => mounted = false
    }, [refreshData])

  return (
    <div className='main-container'>
      <SideNavbar/>
      <div className='main_content'>
      <ToastContainer />
        {/* HEADER  */}
        <div className='d-flex justify-content-between header'>
            <h2>All Products</h2>
            <Button className='add-btn' type="button" variant='success' onClick={handleAddShow}>
                <span><img src={addIcon} alt="add icon"></img></span>
                Add a new product
            </Button>
        </div>
        <div className='content-wrapper'>
          <div className='d-flex align-items-center'>
              <h6>Filter by Category: </h6>
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

        
        <AllProductsDisplay 
            products={
              value === 'All' ? all : 
              (value === 'Meals' ? meals : 
              (value === 'Desserts' ? desserts : drinks))
            }
            refreshData={refreshData} 
            setRefreshData={setRefreshData}
        />

      {/*}
        {(value === 'All') &&
          <AllProductsDisplay 
            products={all} fetchAllProducts={fetchAllProducts}
          />
        }
          
        {(value === 'Meals') && 
          <AllProductsDisplay 
            products={meals} fetchAllProducts={fetchAllProducts}
          />
        }

        {(value === 'Desserts') && 
          <AllProductsDisplay 
            products={desserts} fetchAllProducts={fetchAllProducts}
          />
        }

        {(value === 'Drinks') && 
          <AllProductsDisplay 
            products={drinks} fetchAllProducts={fetchAllProducts}
        />}
      */}    

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
                    name="category"
                    type='radio'
                    id='inline-radio-1'
                    defaultChecked
                    value='meal'
                    onChange={(e) => handleAddChange(e)}
                  />
                  <Form.Check
                    inline
                    label="Dessert"
                    name="category"
                    type='radio'
                    id='inline-radio-2'
                    value='dessert'
                    onChange={(e) => handleAddChange(e)}
                  />
                  <Form.Check
                    inline
                    label="Drinks"
                    name="category"
                    type='radio'
                    id='inline-radio-3'
                    value='drink'
                    onChange={(e) => handleAddChange(e)}
                  />
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="admin-formg1">
                <Form.Label>Product Name *</Form.Label>
                <Form.Control type="text" name="name" required autoComplete="off" onChange={(e) => handleAddChange(e)}></Form.Control>
              </Form.Group>
              <Form.Group className="admin-formg2">
                <Form.Label>Product Price *</Form.Label>
                <Form.Control type="number" name="price" min="0.01" step="0.01" placeholder="Ex. 100.00" required autoComplete="off" onChange={(e) => handleAddChange(e)}></Form.Control>
              </Form.Group>
              <Form.Group className="admin-formg3">
                <Form.Label>Product Image *</Form.Label>
                <Form.Control type="file" name="image" accept="image/*" required onChange={(e) => handleAddImage(e)}></Form.Control>
              </Form.Group>
              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={handleAddClose}>
              Cancel
            </Button>
            <Button variant="success" type="submit" onClick={() => addNewProduct()}>
              Save Product
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}