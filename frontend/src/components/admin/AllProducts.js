import React, {useEffect, useState} from 'react'
import { DropdownButton, Dropdown, Button, Modal, Form, Row, ButtonGroup } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import PulseLoader from "react-spinners/PulseLoader";

// icons & css
import addIcon from '../../icons/add.svg'
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/admin/Common.scss';

// page imports
import AllProductsDisplay from './AllProductsDisplay'
import SideNavbar from "./SideNavbar";
import { getApi } from '../../adminAxios';
import useAxios from './utils/useAxios';


/* ****************** MAIN ****************** */
export default function AllProducts() {
  let [all, setProduct] = useState([]);
  let [meals, setMeals] = useState([]);
  let [desserts, setDesserts] = useState([]);
  let [drinks, setDrinks] = useState([]);
  const [clicked, setClicked] = useState(false);

  // Monitors state of filter value
  const [value, setValue] = useState('All');
  const handleCategorySelect = (e) => {
    setValue(e)
  }

  const [refreshData, setRefreshData] = useState(false)
  const api = useAxios()

  // Get all products
  async function fetchAllProducts() {
    const response = await getApi('api/product/');
    return response
  }

  const [IdsFeatured, setIdsFeatured] = useState([])
  async function fetchAllFeaturedProducts() {
    const response = await getApi('api/featured-product/')
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

    const addProduct = async (product) => {
      
      let form_data = new FormData();
        if(product.image)
          form_data.append("image", product.image, product.image.name);
        form_data.append("name", product.name);
        form_data.append("price", product.price);
        form_data.append("category", product.category);
     
      const response = await api.post(
        'api/product/',
        form_data,
        { headers: {
          "Content-Type": "multipart/form-data",
        },}
      )
      return response
    }
    
    // POST API
    async function addNewProduct() {
      if (clicked===false) {
        setClicked(true);
        addProduct(newProduct)
        .then(response => {
          if (response.status === 201) {
            setAddShow(false)
            setNewProduct(initialData);
            toast.success('Successfully added a product!', { autoClose: 2000, hideProgressBar: true });
            setRefreshData(!refreshData)
          }
        })
        .catch(error => {
          if (error.response.status === 400) {
            const errorData = error.response.data
            for (const key in errorData){
              for (const message of errorData[key]){
                toast.error(`Error in ${key.toUpperCase()} field: ${message}`, { autoClose: 2000, hideProgressBar: true });
              }
            }
          } else {
              toast.error('Failed to add new product.', { autoClose: 2000, hideProgressBar: true });
          }
        })
        .finally(
          ()=>setClicked(false)
        )
      }
    }
    
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      let mounted = true
      fetchAllProducts()
      .then(response => {
          if(mounted) {
            setProduct(response.data);
            setMeals(response.data.filter(product => product.category === 'meal'))
            setDesserts(response.data.filter(product => product.category === 'dessert'))
            setDrinks(response.data.filter(product => product.category === 'drink'))
            if(loading)
              setLoading(false)
          }
      })
      .catch(error => {
        toast.error('Failed to fetch all Products.', { autoClose: 2000, hideProgressBar: true });
      })

      fetchAllFeaturedProducts()
      .then(response => {
        if(mounted) {
          setIdsFeatured(response.data.map(featured => featured.product_id));
          if(loading)
            setLoading(false)
        }
    })
    .catch(error => {
      toast.error('Failed to fetch all Featured Products.', { autoClose: 2000, hideProgressBar: true });
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
            <h2>Products</h2>
            <Button className='add-btn' type="button" variant='warning' onClick={handleAddShow}>
                <span><img src={addIcon} alt="add icon"></img></span>
                New product
            </Button>
        </div>
        <div className='content-wrapper'>
          <div className='d-flex align-items-center mb-3'>
              <h6>Filter by Category: </h6>
              {/* <Row fluid className='filter-wrapper'> */}
              <ButtonGroup>
                <DropdownButton 
                  id="dropdown-basic-button"
                  className="category-dropdown"
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
              {/* </Row> */}
              </ButtonGroup>
            </div>

            {
              loading ?

              <div className='d-flex justify-content-center align-item-center mt-5'>
                <ClipLoader color="#274B5F" size={80} />
              </div>

              :
              
              <AllProductsDisplay 
              products={
                value === 'All' ? all : 
                (value === 'Meals' ? meals : 
                (value === 'Desserts' ? desserts : drinks))
              }
              IdsFeatured={IdsFeatured}
              refreshData={refreshData} 
              setRefreshData={setRefreshData}
              />

            }
           
           <div>
              <small>Note: You cannot delete featured products. Replace the product first with another one, then try deleting again.</small>
          </div>

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
            {
              (clicked === true) && 
              (
                <Button variant="success" type="submit" disabled className='loader-btn'>
                  Saving <PulseLoader color="#FFFFFF" size={5} speedMultiplier={0.5} />
                </Button>
              )
            }
            {
              (clicked === false) && 
              (<div>
                <Button variant="success" type="submit" onClick={() => addNewProduct()}>
                  Save Product
                </Button>
              </div>)
            }
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}