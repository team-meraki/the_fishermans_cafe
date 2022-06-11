import React, { useEffect, useState } from 'react'
import { Container, Tab, Tabs, Button, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import ProductsDisplay from './ProductsDisplay'
import { getApi } from '../../adminAxios';

import '../../styles/Menu.scss';

export default function Menu() {
  
    // Get all products from the database
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
        let response = await getApi("api/product/")
        return response.data
    }

    // Filter products the belong to meal catgory
    const meals = products.filter(product => product.category === 'meal');

    // Filter products the belong to dessert catgory
    const desserts = products.filter(product => product.category === 'dessert');

    // Filter products the belong to drink catgory
    const drinks = products.filter(product => product.category === 'drink');


    return (
      <Container className='menu-wrapper'>
        <h1 className='menu-title'>Our Menu</h1>
        <Container className='menu-tab d-flex justify-content-center flex-column'>
          <Tabs defaultActiveKey="meal">
            <Tab eventKey="meal" title="Meals">
              <ProductsDisplay products={meals} />
            </Tab>
            <Tab eventKey="desssert" title="Desserts">
              <ProductsDisplay products={desserts} />
            </Tab>
            <Tab eventKey="drink" title="Drinks">
              <ProductsDisplay products={drinks} />
            </Tab>
          </Tabs>
          <div>
            <Row className="d-flex justify-content-center mb-2 mt-5"><h4>Order Here</h4></Row>
            <Row className="d-flex justify-content-center">
              <Button target={"_blank"} rel={"noreferrer"} href="https://play.google.com/store/apps/details?id=com.foxcity.foxcitycustomer&hl=en&gl=US" data-testid='order-button' variant='light'><FontAwesomeIcon icon={ faCartShopping }/></Button>
            </Row>
          </div>
        </Container>
      </Container>
    )
  
}
