import React, { useEffect, useState } from 'react'
import SideNavbar from "./SideNavbar";
import { ToastContainer } from 'react-toastify';
import '../../styles/admin/Common.scss';
import 'react-toastify/dist/ReactToastify.css';
import { getCafeInfo } from '../../adminAPI';
import { Button, Col, Form, Row } from 'react-bootstrap';

export default function AboutTheCafe() {
 const [cafeInfo, setCafeInfo] = useState({});

 // Fetch cafe details
 async function fetchCafeInfo() {
  const response = await getCafeInfo();
  setCafeInfo(response.data.data)
 }

 useEffect( () => {
  fetchCafeInfo();
 },[])

 return (
  <div className='main-container'>
   <SideNavbar/>
   <div className='main_content'>
    <ToastContainer />
     {/* HEADER  */}
     <div className='d-flex justify-content-between header'>
         <h2>About the Cafe</h2>
     </div>

     {/* FORM */}
     <div className='content-wrapper'>
      <Form>

       <Row className='d-flex align-items-center mb-1'>
        <Col sm="2">Logo</Col>
        <Col sm="4"><Form.Control type="file" /></Col>
       </Row>
       <Row className='d-flex align-items-center mb-1'>
        <Col sm="2">Schedule</Col>
        <Col><Form.Control type="text" /></Col>
        <Col sm="2">Location</Col>
        <Col><Form.Control type="text" /></Col>
       </Row>
       <Row className='d-flex align-items-center mb-1'>
        <Col sm="2">Contact Number</Col>
        <Col><Form.Control type="text" /></Col>
        <Col sm="2">Facebook Link</Col>
        <Col><Form.Control type="text" /></Col>
       </Row>
       <Row className='d-flex align-items-center mb-1'>
        <Col sm="2">Description</Col>
        <Col><Form.Control as="textarea" /></Col>
       </Row>

       <div className='mt-5'></div>
        <hr></hr>
       <div className='mb-5'></div>

        <Row className='d-flex align-items-center mb-1'>
         <Col sm="2">Announcement</Col>
         <Col><Form.Control as="textarea" /></Col>
        </Row>
        <Row className='d-flex align-items-center mb-1'>
         <Col sm="2">Table Accomodation</Col>
         <Col><Form.Control as="textarea" /></Col>
        </Row>
        <Row className='d-flex align-items-center mb-1'>
         <Col sm="2">Delivery Info</Col>
         <Col><Form.Control as="textarea" /></Col>
        </Row>

       <div className='d-flex justify-content-end mt-4 '>
        <Button type="submit" variant="success" >Save Changes</Button>
       </div>

      </Form>
     </div>
   </div>
  </div>
 )
}
