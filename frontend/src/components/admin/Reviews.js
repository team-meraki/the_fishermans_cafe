import React from 'react';
import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import SideNavbar from "./SideNavbar";
import { ToastContainer, toast } from 'react-toastify';

// css
import '../../styles/admin/Common.scss';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import useAxios from './utils/useAxios';
import { getApi } from '../../adminAxios';

export default function Reviews(){
    const[testimonial, setTestimonial] = useState([]);
    

    // Getting all reviews
    async function fetchAllReviews(){
        const response = await getApi('api/testimonial');
        return response
    }

    const [refreshData, setRefreshData] = useState(false)
  
    const postCustomerReview = async (id, review_id) => {
        const response = await api.put('/api/featured-review/' + id + '/', 
        {review_id});
    
        return response
    }

    // Post reviews
    const api = useAxios();
    async function postReview(id, reviewObj) {
        postCustomerReview(id, reviewObj)
        .then(response => {
          if (response.status === 200) {
            toast.success('Posted a review!', { autoClose: 2000, hideProgressBar: true });
            setRefreshData(!refreshData)
          }
        })
        .catch(error => {
          if (error.request.status === 404) {
            toast.error('Review not found!', { autoClose: 2000, hideProgressBar: true });
          } else {
            toast.error('Failed to post a review.', { autoClose: 2000, hideProgressBar: true });
          }
        })
      }

    useEffect(() => {
        let mounted = true
        fetchAllReviews()
        .then(response => {
            if(mounted) {
                setTestimonial(response.data);
            }
        })
        .catch(error => {
            toast.error('Could not fetch any testimonials.', { autoClose: 2000, hideProgressBar: true })
        })
        return () => mounted = false
    },[])

    // Post API


    return (
        <div className='main-container'>
            <SideNavbar/>

            <div className='main_content'>
                <ToastContainer />
                {/* HEADER  */}
                <div className='d-flex justify-content-between header'>
                    <h2>Reviews</h2>
                </div>
                <div className='content-wrapper'>
                    <h6>There are <b> {testimonial.length} </b> reviews in the database. </h6>
                </div>

                {/* TABLE */}
                <div className='content-wrapper'>
                    <div className='tablewrapper'>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Message</th>
                                    <th>Action/s</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonial.map(testimonial => (
                                    <tr key = {testimonial.id}>
                                        <td>{testimonial.name}</td>
                                        <td>{testimonial.email}</td>
                                        <td>{testimonial.message}</td>
                                        <td> <Button className="btn btn-post" variant="success" onClick={()=>postReview(testimonial.id, testimonial)}>Post</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}
