import React from 'react';
import { Table, Button } from 'react-bootstrap';
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
    const[featured, setFeatured] = useState([]);
    const[idsFeatured, setIdsFeatured] = useState([]);
    

    // Getting all reviews
    async function fetchAllReviews(){
        const response = await getApi('api/testimonial');
        return response
    }
    // Getting all featured reviews
    async function fetchAllFeaturedReviews(){
        const response = await getApi('api/featured-review');
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
    async function postReview(id) {
        postCustomerReview(id)
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
        // all reviews
        fetchAllReviews()
        .then(response => {
            if(mounted) {
                setTestimonial(response.data);
            }
        })
        .catch(error => {
            toast.error('Could not fetch any testimonials.', { autoClose: 2000, hideProgressBar: true })
        })

        // featured reviews
        fetchAllFeaturedReviews()
        .then(response => {
            if(mounted) {
                setFeatured(response.data);
                setIdsFeatured(response.data.map( (id) => {return id.review_id} ));
            }
        })
        .catch(error => {
            toast.error('Could not fetch any featured reviews.', { autoClose: 2000, hideProgressBar: true })
        })
        //console.log(idsFeatured);
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
                    <h6>You need to have at least <b>2</b> customer reviews currently posted on the cafe website.</h6>
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
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonial.map(testimonial => (
                                    <tr key = {testimonial.id}>
                                        <td>{testimonial.name || '(Anonymous)' }</td>
                                        <td>{testimonial.email}</td>
                                        <td>{testimonial.message}</td>
                                        <td className=''> 
                                        {
                                            (idsFeatured.includes(testimonial.id)) ?

                                             <Button className="btn btn-post" variant="outline-danger" onClick={()=>postReview(testimonial.id)}>Unpost</Button>

                                             :
                                            
                                             <Button className="btn btn-post" variant="outline-success" onClick={()=>postReview(testimonial.id)}>Post</Button>

                                        }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    <div className='mt-2 ml-1'>
                        <h6>{testimonial.length} reviews found</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}
