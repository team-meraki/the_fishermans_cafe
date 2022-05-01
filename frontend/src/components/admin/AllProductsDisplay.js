import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import '../../styles/admin/AdminTable.scss';


export default class AllProductsDisplay extends Component {
    render() {
      const products = this.props.products;
  
      return (
        <div className='tablewrapper'>
                <Table responsive className='table-striped table-bordered'>
                    <thead>
                        <tr className='text-center'>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Last Modified</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => ( 
                            <tr className='text-center'>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td><img alt='product-img' className="img-content" src={product.image}/></td>
                                <td>{product.last_modified}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
      )
    }
  }