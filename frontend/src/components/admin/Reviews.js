import React from 'react';
import { Table, Button, OverlayTrigger } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import SideNavbar from "./SideNavbar";
import { ToastContainer, toast } from 'react-toastify';
import ClipLoader from "react-spinners/ClipLoader";
import { renderTooltip } from '../common'; 
// css
import '../../styles/admin/Common.scss';
import 'react-toastify/dist/ReactToastify.css';
// icons
import useAxios from './utils/useAxios';
import { getApi } from '../../adminAxios';
import deleteIcon from '../../icons/delete.svg'

export default function Reviews(){
    const[testimonial, setTestimonial] = useState([]);
    const[featured, setFeatured] = useState([]);
    const[idsFeatured, setIdsFeatured] = useState([]);
    
    

    // Getting all reviews
    async function fetchAllReviews(){
        const response = await getApi('api/testimonial/');
        return response
    }
    // Getting all featured reviews
    async function fetchAllFeaturedReviews(){
        const response = await getApi('api/featured-review/');
        return response
    }

    const [refreshData, setRefreshData] = useState(false)
  
    const postCustomerReview = async (review_id) => {
        const response = await api.post('/api/featured-review/', 
        {review_id});
        return response
    }

    // Post reviews
    const api = useAxios();
    async function postReview(id) {
        postCustomerReview(id)
        .then(response => {
          if (response.status === 201) {
            toast.success('Posted a review!', { autoClose: 2000, hideProgressBar: true });
            setRefreshData(!refreshData)
          }
        })
        .catch(error => {
          if (error.request.status === 404) {
            toast.error('Review not found!', { autoClose: 2000, hideProgressBar: true });
          } else if (error.request.status === 400) {
            toast.error(error.response.data.message, { autoClose: 2000, hideProgressBar: true });
          } else {
            toast.error('Failed to post a review.', { autoClose: 2000, hideProgressBar: true });
          }
        })
    }

    const findReview = id => featured.find(obj => obj.review_id === id).id

    const unpostReview = async (featured_id) => {
        api.delete('/api/featured-review/' + featured_id + '/')
        .then(response => {
            if (response.status === 204) {
                toast.success('Unposted a review!', { autoClose: 2000, hideProgressBar: true });
                setRefreshData(!refreshData)
            }
        })
        .catch(error => {
            if (error.request.status === 404) {
              toast.error('Review not found!', { autoClose: 2000, hideProgressBar: true });
            } else if (error.request.status === 400) {
                toast.error(error.response.data.message, { autoClose: 2000, hideProgressBar: true });
            } else {
              toast.error('Failed to unpost a review.', { autoClose: 2000, hideProgressBar: true });
            }
        })
    }

    // delete review

    const deleteCustomerReview = async (review_id) => {
        const response = await api.delete('/api/testimonial/' + review_id + '/');
        return response;
    }

    async function delReview (review_id) {
        deleteCustomerReview(review_id).then(response => {
          if (response.status === 204) {
            toast.success('Deleted a review!', { autoClose: 2000, hideProgressBar: true });
            setRefreshData(!refreshData)
          }
        })
        .catch(error => {
          if (error.request.status === 404) {
            toast.error('Review not found!', { autoClose: 2000, hideProgressBar: true });
          } else if (error.request.status === 400) {
            toast.error(error.response.data.message, { autoClose: 2000, hideProgressBar: true });
          } else {
            toast.error('Failed to delete a review.', { autoClose: 2000, hideProgressBar: true });
          }
        })
    }

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        let mounted = true
        // all reviews
        fetchAllReviews()
        .then(response => {
            if(mounted) {
                setTestimonial(response.data);
                setLoading(false);
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
                setIdsFeatured(response.data.map(featured => featured.review_id));
            }
        })
        .catch(error => {
            toast.error('Could not fetch any featured reviews.', { autoClose: 2000, hideProgressBar: true })
        })
        //console.log(idsFeatured);
        return () => mounted = false
    },[refreshData])

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

                {
                loading===false ?
                <>
                    <div className='content-wrapper'>
                        <h6>You have <b>{featured.length}</b> customer reviews currently posted on the cafe website.</h6>
                    </div>

                {/* TABLE */}
                     <div className='content-wrapper'>
                
                        <div className='tablewrapper'>
                            
                            <Table id='reviews-tbl'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Message</th>
                                        <th className='actions'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {testimonial.map(testimonial => (
                                        <tr key = {testimonial.id}>
                                            <td >{testimonial.name || '(Anonymous)' }</td>
                                            <td>{testimonial.email}</td>
                                            <td>{testimonial.message}</td>
                                            <td> 
                                            {
                                                (idsFeatured.includes(testimonial.id)) ?
                                                
                                                <div className="btn-wrapper">
                                                     <OverlayTrigger
                                                    placement="bottom"
                                                    delay={{ show: 50, hide: 50 }}
                                                    overlay={renderTooltip("Unpost review")}
                                                    >
                                                        <label className="switch">
                                                            <input defaultChecked type="checkbox" onClick={()=>unpostReview(findReview(testimonial.id))}/>
                                                            <span className="slider"></span>
                                                        </label>
                                                    </OverlayTrigger>
                                                
                                                    <Button className="not-allowed admin-custom-btn" variant="primary "type="btn" disabled>
                                                        <img src={deleteIcon} alt="Delete Icon" height="20"/>
                                                    </Button> 
                                                </div>
                                                :
                                                
                                                <div className="btn-wrapper">
                                                    <OverlayTrigger
                                                    placement="bottom"
                                                    delay={{ show: 50, hide: 50 }}
                                                    overlay={renderTooltip("Post review")}
                                                    >
                                                        <label className="switch">
                                                            <input type="checkbox" onChange={()=>postReview(testimonial.id)}/>
                                                            <span className="slider"></span>
                                                        </label>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger
                                                        placement="bottom"
                                                        delay={{ show: 50, hide: 200 }}
                                                        overlay={renderTooltip("Remove forever")}
                                                    >
                                                        {/* <Button variant="primary" type="button" onClick={()=>delReview(testimonial.id)}>
                                                        <img alt="Delete Icon" src="https://img.icons8.com/glyph-neue/30/undefined/delete-forever.png"/>
                                                        </Button> */}

                                                        <Button className="admin-custom-btn" variant="primary "type="btn" onClick={()=>delReview(testimonial.id)}>
                                                            <img src={deleteIcon} alt="Delete Icon" height="20"/>
                                                        </Button> 
                                                    </OverlayTrigger>
                                                </div>
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
                </>
                    :
                    <div className='d-flex justify-content-center align-item-center mt-5'>
                      <ClipLoader color="#274B5F" size={80} />
                    </div>
                }
                
                   
                
            </div>
        </div>
    )
}
