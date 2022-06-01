import React from 'react';
import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import SideNavbar from "./SideNavbar";
import { ToastContainer, toast } from 'react-toastify';

// css
import '../../styles/admin/Common.scss';
import 'react-toastify/dist/ReactToastify.css';

import { getApi } from '../../adminAxios';

export default function Reviews(){
    const[testimonial, setTestimonial] = useState([]);
    

    // Getting all reviews
    async function fetchAllReviews(){
        const response = await getApi('api/testimonial');
        return response
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
                                    {/* <th>Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {testimonial.map(testimonial => (
                                    <tr key = {testimonial.id}>
                                        <td>{testimonial.name}</td>
                                        <td>{testimonial.email}</td>
                                        <td>{testimonial.message}</td>
                                        {/* <td> <Button className="btn btn-post" variant="success" onClick={testimonial}>Post</Button></td> */}
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
