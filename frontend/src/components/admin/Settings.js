import React, { useContext, useEffect, useState } from 'react'
import SideNavbar from "./SideNavbar";
import { ToastContainer, toast } from 'react-toastify';
import '../../styles/admin/Common.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Col, Form, Row } from 'react-bootstrap';
import AuthContext from './context/AuthContext';
// import { updateCredentials } from '../../adminAPI';
import useAxios from './utils/useAxios';

export default function AdminSettings() {
  const { user, loginUser } = useContext(AuthContext)
  
  const initialCredentials = Object.freeze({
    email: user.email,
    username: user.username,
    password: "",
  })
  
  const initialPasswordChange = Object.freeze({
    old_password: "",
    new_password: "",
    confirmed_password: "",
  })
  
  const [ credentials, setCredentials ] = useState(initialCredentials)
  const [ passwordChange, setPasswordChange ] = useState(initialPasswordChange)
  const api = useAxios()
  
  const handleCredentialsChange = (e) => {
    setCredentials(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
    }));
  }

  const handlePasswordChange = (e) => {
    setPasswordChange(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
    }));
  }

  const editCredentials = async () => {
    api.put('/api/user/update/name/', {
      "email" : credentials.email,
      "username": credentials.username,
      "password": credentials.password
    })
    .then(response => {
      if (response.status === 200){
        toast.success('Successfully edited Admin Information!');
        loginUser(credentials.username, credentials.password)
        .then(response => {
          setCredentials(initialCredentials);
        })
        .catch(error => {
          toast.error('Please refresh.');
        })
      }
    })
    .catch(error => {
      if (error.response.status === 400) {
        const errorData = error.response.data
            for (const key in errorData){
              for (const message of errorData[key]){
                toast.error(`Error in ${key.toUpperCase()} field: ${message}`);
              }
            }
      } else {
        toast.error('Failed to edit Admin Information');
      }
    })
  }

  const editPassword = async () => {
    if(passwordChange.new_password && 
      (passwordChange.new_password === passwordChange.confirmed_password)){
      
        api.put('/api/user/update/password/', {
          "old_password" : passwordChange.old_password,
          "new_password": passwordChange.new_password,
          "confirmed_password": passwordChange.confirmed_password
        })
        .then(response => {
          if (response.status === 200){
            setCredentials(initialPasswordChange);
            toast.success('Successfully changed Password!');
          }
        })
        .catch(error => {
          if (error.response.status === 400) {
            const errorData = error.response.data
                for (const key in errorData){
                  for (const message of errorData[key]){
                    toast.error(`Error in ${key.toUpperCase()} field: ${message}`);
                  }
                }
          } else {
            toast.error('Failed to change Password.');
          }
        })
    } else {
      toast.error("The two password fields didn't match.");
    }
  }

  useEffect(() => {
    let mounted = true
    if(mounted)
    setCredentials(prevState => ({
      ...prevState,
      email: user.email,
      username: user.username
    }))
    return () => mounted = false;
  }, [user])

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
        <Col sm="1">Email</Col>
        <Col sm="4" className='d-flex aline-items-center'>
          <Form.Control type="email" name="email" value={credentials.email} onChange={handleCredentialsChange}/>
        </Col>
       </Row>
       <Row className='d-flex justify-content-center mb-1'>
        <Col sm="1">Username</Col>
        <Col sm="4" className='d-flex align-items-center'>
          <Form.Control type='text' name="username" value={credentials.username} onChange={handleCredentialsChange}/>
        </Col>
       </Row>
       <Row>
        <p className='d-flex justify-content-center mb-1'>Enter password to confirm change.</p>
       </Row>
       <Row className='d-flex justify-content-center mb-1'>
        <Col sm="1">Password</Col>
        <Col sm="4" className='d-flex align-items-center'>
          <Form.Control type='password' name="password" value={credentials.password} onChange={handleCredentialsChange}/>
        </Col>
       </Row>
       <div className='d-flex justify-content-center mt-4 '>
        <Button type="submit" onClick={editCredentials} variant="success">Save Changes</Button>
       </div>
    
        <hr></hr>

       <Row>
        <h4 className='d-flex justify-content-center mb-1'>Change Password</h4>
       </Row>
       <Row className='d-flex justify-content-center mb-1'>
        <Col sm="1">Old Password</Col>
        <Col sm="4" className='d-flex aline-items-center'>
          <Form.Control type="password" name="old_password" value={passwordChange.old_password} onChange={handlePasswordChange}/>
        </Col>
       </Row>
       <Row className='d-flex justify-content-center mb-1'>
        <Col sm="1">New Password</Col>
        <Col sm="4" className='d-flex align-items-center'>
          <Form.Control type='password' name="new_password" value={passwordChange.new_password} onChange={handlePasswordChange}/>
        </Col>
       </Row>
       <Row className='d-flex justify-content-center mb-1'>
        <Col sm="1">Confirm Password</Col>
        <Col sm="4" className='d-flex align-items-center'>
          <Form.Control type='password' name="confirmed_password" value={passwordChange.confirmed_password} onChange={handlePasswordChange}/>
        </Col>
       </Row>
       <div className='d-flex justify-content-center mt-4 '>
        <Button type="submit" onClick={editPassword} variant="success">Save Password</Button>
       </div>
     </div>
   </div>
  </div>
 )
}
