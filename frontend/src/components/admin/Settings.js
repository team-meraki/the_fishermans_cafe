import React, { useEffect, useState } from 'react'
import SideNavbar from "./SideNavbar";
import { ToastContainer } from 'react-toastify';
import '../../styles/admin/Common.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Col, Form, Row } from 'react-bootstrap';

export default function AdminSettings() {

 return (
  <div className='main-container'>
   <SideNavbar/>
   <div className='main_content'>
    <ToastContainer />
     {/* HEADER  */}
     <div className='d-flex justify-content-center header'>
         <h2>Admin Credentials</h2>
     </div>

     {/* FORM */}
     <div className='content-wrapper'>
       <Row>
        <h4 className='d-flex justify-content-center mb-1'>Admin Information</h4>
       </Row>
       <Row className='d-flex justify-content-center mb-1'>
        <Col sm="1">E-Mail</Col>
        <Col sm="4" className='d-flex aline-items-center'>
          <Form.Control type="email" name="e-mail"/>
        </Col>
       </Row>
       <Row className='d-flex justify-content-center mb-1'>
        <Col sm="1">Username</Col>
        <Col sm="4" className='d-flex align-items-center'>
          <Form.Control type='username' name="username"/>
        </Col>
       </Row>
       <Row>
        <p className='d-flex justify-content-center mb-1'>Enter password to confirm change.</p>
       </Row>
       <Row className='d-flex justify-content-center mb-1'>
        <Col sm="1">Password</Col>
        <Col sm="4" className='d-flex align-items-center'>
          <Form.Control type='password' name="password"/>
        </Col>
       </Row>
       <div className='d-flex justify-content-center mt-4 '>
        <Button type="submit" variant="success">Save Changes</Button>
       </div>
    
        <hr></hr>

       <Row>
        <h4 className='d-flex justify-content-center mb-1'>Change Password</h4>
       </Row>
       <Row className='d-flex justify-content-center mb-1'>
        <Col sm="1">Current Password</Col>
        <Col sm="4" className='d-flex aline-items-center'>
          <Form.Control type="password" name="e-mail"/>
        </Col>
       </Row>
       <Row className='d-flex justify-content-center mb-1'>
        <Col sm="1">New Password</Col>
        <Col sm="4" className='d-flex align-items-center'>
          <Form.Control type='password' name="username"/>
        </Col>
       </Row>
       <Row className='d-flex justify-content-center mb-1'>
        <Col sm="1">Confirm Password</Col>
        <Col sm="4" className='d-flex align-items-center'>
          <Form.Control type='password' name="password"/>
        </Col>
       </Row>
       <div className='d-flex justify-content-center mt-4 '>
        <Button type="submit" variant="success">Save Password</Button>
       </div>
     </div>
   </div>
  </div>
 )
}
