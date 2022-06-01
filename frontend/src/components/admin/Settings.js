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
    api.put('api/user/update/name/', {
      "email" : credentials.email,
      "username": credentials.username,
      "password": credentials.password
    })
    .then(response => {
      if (response.status === 200){
        toast.success('Successfully edited Admin Information!', { autoClose: 2000, hideProgressBar: true });
        loginUser(credentials.username, credentials.password)
        .then(response => {
          setCredentials(initialCredentials);
        })
        .catch(error => {
          toast.error('Please refresh.', { autoClose: 2000, hideProgressBar: true });
        })
      }
    })
    .catch(error => {
      if (error.response.status === 400) {
        const errorData = error.response.data
            for (const key in errorData){
              for (const message of errorData[key]){
                toast.error(`Error in ${key.toUpperCase()} field: ${message}`, { autoClose: 2000, hideProgressBar: true });
              }
            }
      } else {
        toast.error('Failed to edit Admin Information', { autoClose: 2000, hideProgressBar: true });
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
            toast.success('Successfully changed Password!', { autoClose: 2000, hideProgressBar: true });
          }
        })
        .catch(error => {
          if (error.response.status === 400) {
            const errorData = error.response.data
                for (const key in errorData){
                  for (const message of errorData[key]){
                    toast.error(`Error in ${key.toUpperCase()} field: ${message}`, { autoClose: 2000, hideProgressBar: true });
                  }
                }
          } else {
            toast.error('Failed to change Password.', { autoClose: 2000, hideProgressBar: true });
          }
        })
    } else {
      toast.error("The two password fields didn't match.", { autoClose: 2000, hideProgressBar: true });
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
          <Col>
            <Row>
              <h4 className='d-flex justify-content-center mb-1'>Admin Information</h4>
            </Row>
            <Form.Group className='d-flex justify-content-center align-items-center mb-1'> 
              <Row>
                <Form.Label>User Email</Form.Label>
                <Form.Control type="email" name="email" value={credentials.email} onChange={handleCredentialsChange}/>
              </Row>
            </Form.Group> 
            <Form.Group className='d-flex justify-content-center align-items-center mb-1'>
              <Row>
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' name="username" value={credentials.username} onChange={handleCredentialsChange}/>
              </Row>
            </Form.Group>
            <Row>
              <p className='d-flex justify-content-center mt-2 mb-1'>Enter password to confirm change.</p>
            </Row>
            <Form.Group className='d-flex justify-content-center align-items-center mb-1'>
              <Row>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' name="password" value={credentials.password} onChange={handleCredentialsChange}/>
              </Row>
            </Form.Group>
            <div className='d-flex justify-content-center mt-4 '>
              <Button type="submit" onClick={editCredentials} variant="success">Save Changes</Button>
            </div>
          </Col>
          
          <Col>
            <Row>
              <h4 className='d-flex justify-content-center mb-1'>Change Password</h4>
            </Row>
            <Form.Group className='d-flex justify-content-center align-items-center mb-1'>
              <Row>
                <Form.Label>Old Password</Form.Label>
                <Form.Control type="password" name="old_password" value={passwordChange.old_password} onChange={handlePasswordChange}/>
              </Row>
            </Form.Group>
            <Form.Group className='d-flex justify-content-center align-items-center mb-1'>
              <Row>
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" name="new_password" value={passwordChange.new_password} onChange={handlePasswordChange}/>
              </Row>
            </Form.Group>
            <Form.Group className='d-flex justify-content-center align-items-center mb-1'>
              <Row>
                <Form.Label>Verify Password</Form.Label>
                <Form.Control type="password" name="confirmed_password" value={passwordChange.confirmed_password} onChange={handlePasswordChange}/>
              </Row>
            </Form.Group>
            <div className='d-flex justify-content-center mt-4 '>
              <Button type="submit" onClick={editPassword} variant="success">Save Password</Button>
            </div>
            </Col>
        </Row>
      </div>
   </div>
  </div>
 )
}
