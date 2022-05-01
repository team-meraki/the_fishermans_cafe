import React, {useEffect, useState} from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import SideNavbar from "./SideNavbar";
import AllProductsDisplay from './AllProductsDisplay'
import '../../styles/admin/Body.scss';

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
  
  return (
    <div className='main-container'>
      <SideNavbar/>
      <div className='main_content'>
        <div className='header'>
          <h2>Admin Products</h2>
        </div>
        <div className='content-wrapper'>
          <Tabs defaultActiveKey="meal">
              <Tab eventKey="meal" title="Meals"><AllProductsDisplay products={meals}/></Tab>
              <Tab eventKey="dessert" title="Desserts"><AllProductsDisplay products={desserts}/></Tab>
              <Tab eventKey="drink" title="Drinks"><AllProductsDisplay products={drinks}/></Tab>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
