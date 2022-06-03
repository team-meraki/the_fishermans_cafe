import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import SideNavbar from './SideNavbar'
import PulseLoader from "react-spinners/PulseLoader";
//css
import '../../styles/admin/Common.scss';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import useAxios from './utils/useAxios';

export default function Featured() {
  const [clicked, setClicked] = useState(false);
  const [products, setProducts] = useState([]);
  const api = useAxios();

  /* EDIT FEATURED PRODUCT HOOKS -- STORES PRODUCT_ID ONLY */
  const [selected, setSelected] = useState('')
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [fourth, setFourth] = useState('');
  const [initial, setInitial] = useState([]);

  async function fetchAllFeaturedProducts() {
    if (clicked===false) {
      setClicked(true);
      axios.get('/api/featured-product/')
      .then(response => {
        response.data[0].product_id && setFirst(response.data[0].product_id)
        response.data[1].product_id && setSecond(response.data[1].product_id)
        response.data[2].product_id && setThird(response.data[2].product_id)
        response.data[3].product_id && setFourth(response.data[3].product_id)
        setInitial([
          response.data[0].product_id, 
          response.data[1].product_id, 
          response.data[2].product_id, 
          response.data[3].product_id])
      }).catch(error => {
        toast.error('Could not fetch Featured Products.', { autoClose: 2000, hideProgressBar: true })
      }).finally(
        ()=>setClicked(false)
      )
    }
  }

  function handleFirst(e) {
    setFirst(e.target.value)
    setSelected(e.target.value)
    setSecond(initial[1])
    setThird(initial[2])
    setFourth(initial[3])
  }
  function handleSecond(e) {
    setSecond(e.target.value)
    setSelected(e.target.value)
    setFirst(initial[0])
    setThird(initial[2])
    setFourth(initial[3])
  }
  function handleThird(e) {
    setThird(e.target.value)
    setSelected(e.target.value)
    setFirst(initial[0])
    setSecond(initial[1])
    setFourth(initial[3])
  }
  function handleFourth(e) {
    setFourth(e.target.value)
    setSelected(e.target.value)
    setFirst(initial[0])
    setSecond(initial[1])
    setThird(initial[2])
  }
  
  const [refreshData, setRefreshData] = useState(false)
  
  const editFeaturedProduct = async (id, product_id) => {
      const response = await api.put('/api/featured-product/' + id + '/', 
      {product_id});
  
      return response
  }

  async function handleEdit(id) {
    editFeaturedProduct(id, selected)
    .then(response => {
      if (response.status === 200) {
        toast.success('Saved!', { autoClose: 2000, hideProgressBar: true });
        setRefreshData(!refreshData)
      }
    })
    .catch(error => {
      if (id === 1)
        setFirst(initial[0])
      else if (id === 2)
        setSecond(initial[1])
      else if (id === 3)
        setThird(initial[2])
      else if (id === 4)
        setFourth(initial[3])

      if (error.request.status === 404) {
        toast.error('Product not found!', { autoClose: 2000, hideProgressBar: true });
      } else if (error.request.status === 400) {
        toast.error('Featured Products must be unique.', { autoClose: 2000, hideProgressBar: true });
      } else {
        toast.error('Failed to update Featured Products.', { autoClose: 2000, hideProgressBar: true });
      }
    })
  }

  async function fetchAllProducts() {
    await axios.get('/api/product/')
    .then(response => {
      setProducts(response.data)
    })
    .catch(error => {
      toast.error('Could not fetch all Products.', { autoClose: 2000, hideProgressBar: true })
    })
  }

  // fetching
  useEffect( () => {
    fetchAllFeaturedProducts();
    fetchAllProducts();
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
            value={first ? first : ''}
            onChange={e => handleFirst(e)}
            required
            > 
              {products.map((product) => {
                return(<option key={product.id} value={product.id}>{product.name}</option>)
              })}
              {!first && <option key={-1} value=''>----</option>}
            </Form.Select>
         </Col>
         <Col>
         {(clicked === true) && 
              (<Button className='add-btn px-0' variant='success' type="button" disabled>
                  <PulseLoader color="#ffff" size={5} speedMultiplier={0.5} />
              </Button>)
          }
          {(clicked === false) && 
              (<Button className='add-btn' variant='success' disabled={!first} type="button" onClick={() => handleEdit(1)}>Save</Button>)
          }
         </Col>
       </Row>
        

       {/* SECOND FEATURED PRODUCT */}
       <Row>
         <Col>
          <Form.Select
            className='featured-select'
            value={second ? second : ''}
            onChange={e => handleSecond(e)}
            required
          > 
            {products.map((product) => {
              return(<option key={product.id} value={product.id}>{product.name}</option>)
            })}
            {!second && <option key={-1} value=''>----</option>}
          </Form.Select>
          </Col>
         <Col>
         {(clicked === true) && 
              (<Button className='add-btn px-0' variant='success' type="button" disabled>
                  <PulseLoader color="#ffff" size={5} speedMultiplier={0.5} />
              </Button>)
          }
          {(clicked === false) && 
              (<Button className='add-btn' variant='success' disabled={!second} type="button" onClick={() => handleEdit(2)}>Save</Button>)
          }
         </Col>
       </Row>


       {/* THIRD FEATURED PRODUCT */}
        <Row>
         <Col>
          <Form.Select
            className='featured-select'
            value={third ? third : ''}
            onChange={e => handleThird(e)}
            required
          > 
            {products.map((product) => {
              return(<option key={product.id} value={product.id}>{product.name}</option>)
            })}
            {!third && <option key={-1} value=''>----</option>}
          </Form.Select>
          </Col>
         <Col>
         {(clicked === true) && 
              (<Button className='add-btn px-0' variant='success' type="button" disabled>
                  <PulseLoader color="#ffff" size={5} speedMultiplier={0.5} />
              </Button>)
          }
          {(clicked === false) && 
              (<Button className='add-btn' variant='success' disabled={!third} type="button" onClick={() => handleEdit(3)}>Save</Button>)
          }
         </Col>
        </Row>


       {/* FOURTH FEATURED PRODUCT */}
       <Row>
         <Col>
          <Form.Select
            className='featured-select'
            value={fourth ? fourth : ''}
            onChange={e => handleFourth(e)}
            required
          > 
            {products.map((product) => {
              return(<option key={product.id} value={product.id}>{product.name}</option>)
            })}
            {!fourth && <option key={-1} value=''>----</option>}
          </Form.Select>
        </Col>
        <Col>
          {(clicked === true) && 
              (<Button className='add-btn px-0' variant='success' type="button" disabled>
                  <PulseLoader color="#ffff" size={5} speedMultiplier={0.5} />
              </Button>)
          }
          {(clicked === false) && 
              (<Button className='add-btn' variant='success' disabled={!fourth} type="button" onClick={() => handleEdit(4)}>Save</Button>)
          }
        </Col>
       </Row>

       </div>
      </Container>
     </div>
    </div>
  )
}
