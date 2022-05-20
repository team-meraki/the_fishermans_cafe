import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import SideNavbar from './SideNavbar'

//css
import '../../styles/admin/Common.scss';
import { Button, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { editFeaturedProduct, getAllProducts, getFeaturedProducts } from '../../adminAPI';

export default function Featured() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  /* EDIT FEATURED PRODUCT HOOKS -- STORES PRODUCT_ID ONLY */
  const [selected, setSelected] = useState('')
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [fourth, setFourth] = useState('');

  async function fetchAllFeaturedProducts() {
    const response = await getFeaturedProducts();
    
    setFirst(response.data.data[0].product_id);
    setSecond(response.data.data[1].product_id);
    setThird(response.data.data[2].product_id);
    setFourth(response.data.data[3].product_id);
  }

  function handleFirst(e) {
    setFirst(e.target.value)
    setSelected(e.target.value)
    console.log(first);
    console.log(selected);
  }
  function handleSecond(e) {
    setSecond(e.target.value)
    setSelected(e.target.value)
    console.log(second);
  }
  function handleThird(e) {
    setThird(e.target.value)
    setSelected(e.target.value)
    console.log(third);
  }
  function handleFourth(e) {
    setFourth(e.target.value)
    setSelected(e.target.value)
    console.log(fourth);
  }
  
  const [refreshData, setRefreshData] = useState(false)
  
  async function handleEdit(id) {
    const response = await editFeaturedProduct(id, selected);
    console.log(response.data)
    if (response.data.status === 200) {
      toast.success('Saved!');
      setRefreshData(!refreshData)
    } else if (response.data.status === 404) {
      toast.error('Product not found!');
    } 
  }

  async function fetchAllProducts() {
    const response = await getAllProducts();
    console.log(response.data.data);
    setProducts(response.data.data);
    
  }

  // fetching
  useEffect( () => {
    fetchAllFeaturedProducts();
    fetchAllProducts();
    setLoading(false);
  }, [refreshData])

  return (
   <div className='main-container'>
   <SideNavbar/>
    <div className='main_content'>
    <ToastContainer />
      {/* HEADER  */}
      <div className='d-flex justify-content-between header'>
         <h2>Featured Products</h2>
      </div>
      {/* BODY CONTENT */}
      <Container className='content-wrapper'>
       <h6 className='mb-4'>
         You can select up to <b>4</b> products to be displayed in featured collection section.
       </h6>
       <div className='featured-wrapper'>
       
       {/* FIRST FEATURED PRODUCT */}
       <Row>
         <Col>
          <Form.Select
            className='featured-select'
            value={first}
            onChange={e => handleFirst(e)}
            required
            > 
              {products.map((product) => {
                return(<option key={product.id} value={product.id}>{product.name}</option>)
              })}
            </Form.Select>
         </Col>
         <Col>
          <Button className='add-btn' type="button" variant='success' onClick={() => handleEdit(1)}>Save</Button>
         </Col>
       </Row>
        

       {/* SECOND FEATURED PRODUCT */}
       <Row>
         <Col>
          <Form.Select
            className='featured-select'
            value={second}
            onChange={e => handleSecond(e)}
            required
          > 
            {products.map((product) => {
              return(<option key={product.id} value={product.id}>{product.name}</option>)
            })}
          </Form.Select>
          </Col>
         <Col>
          <Button className='add-btn' type="button" variant='success' onClick={() => handleEdit(2)}>Save</Button>
         </Col>
       </Row>


       {/* THIRD FEATURED PRODUCT */}
        <Row>
         <Col>
          <Form.Select
            className='featured-select'
            value={third}
            onChange={e => handleThird(e)}
            required
          > 
            {products.map((product) => {
              return(<option key={product.id} value={product.id}>{product.name}</option>)
            })}
          </Form.Select>
          </Col>
         <Col>
          <Button className='add-btn' type="button" variant='success' onClick={() => handleEdit(3)}>Save</Button>
         </Col>
        </Row>


       {/* FOURTH FEATURED PRODUCT */}
       <Row>
         <Col>
          <Form.Select
            className='featured-select'
            value={fourth}
            onChange={e => handleFourth(e)}
            required
          > 
            {products.map((product) => {
              return(<option key={product.id} value={product.id}>{product.name}</option>)
            })}
          </Form.Select>
        </Col>
        <Col>
          <Button className='add-btn' type="button" variant='success' onClick={() => handleEdit(4)}>Save</Button>
        </Col>
       </Row>

       </div>
      </Container>
     </div>
    </div>
  )
}
