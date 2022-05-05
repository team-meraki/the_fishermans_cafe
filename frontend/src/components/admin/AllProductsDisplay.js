import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import '../../styles/admin/AdminTable.scss';
import {formatDate} from '../common.js'

export default class AllProductsDisplay extends Component {
    render() {
      const products = this.props.products;
  
      return (
        <div className='tablewrapper'>
                <Table responsive>
                    <thead>
                        <tr className='text-center'>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Last Modified</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => ( 
                            <tr className='text-center'>
                                <td><img alt='product-img' className="img-content" src={product.image}/></td>
                                <td>{product.name}</td>
                                <td>{"Php " + product.price}</td>
                                <td>{formatDate(product.last_modified)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
      )
    }
  }