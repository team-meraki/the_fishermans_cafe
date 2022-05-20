import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import SideNavbar from './SideNavbar'

//css
import '../../styles/admin/Common.scss';
import { Container, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { getAllProducts, getFeaturedProducts } from '../../adminAPI';

export default function Featured() {

  const [featured, setFeatured] = useState([]);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleChange(e) {
    const [name, value] = e.target
  }


  async function fetchAllFeaturedProducts() {
    const response = await getFeaturedProducts();
    console.log(response.data.data);
    setFeatured(response.data.data);
    
    var featuredProductsID = [];
    response.data.data.map(id => {
      console.log(id)
      console.log(id.product.id)
      console.log(id.product.name)
      featuredProductsID.push({id: id.product.id, name: id.product.name});
    })

    console.log(featuredProductsID);
    setSelected(featuredProductsID);
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
  }, [])

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
       
         { (loading === false) ?
           
          //  selected.map( (index) => {
          //   return (
          //     <Form.Select
          //       name="featured"
          //       value={index.name}
          //       className='featured-select'
          //       onChange={ (e) => handleChange(e, index) }
          //       required
          //     > 
          //       {products.map((product) => {
          //         return(<option key={product.id} value={product.id}>{product.name}</option>)
          //       })
          //       }
          //     </Form.Select>
          //   )
          //  })

              (<Form.Select
                name="featured-0"
                defaultValue={selected[0].name}
                className='featured-select'
                //onChange={ (e) => handleChange(e, index) }
                required
              > 
                {products.map((product) => {
                  return(<option key={product.id} value={product.id}>{product.name}</option>)
                })}
              </Form.Select>)

              (<Form.Select
                name="featured-1"
                defaultValue={selected[1].name}
                className='featured-select'
                //onChange={ (e) => handleChange(e) }
                required
              > 
                {products.map((product) => {
                  return(<option key={product.id} value={product.id}>{product.name}</option>)
                })}
              </Form.Select>)
          
          :

            <div>Loading...</div>
         }
     
       </div>
      </Container>
     </div>
    </div>
  )
}
