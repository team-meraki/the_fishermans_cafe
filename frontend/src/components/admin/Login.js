import React, { useState, useContext } from 'react'
import { Button, Col, Container, Form, Nav, Row } from 'react-bootstrap'
import '../../styles/admin/Common.scss';
import AuthContext from './context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
  const initialData = Object.freeze({
    username : '',
    password : '',
  })

  const [formData, setFormData] = useState(initialData)
  const location = useLocation()
  const from = location.state?.from?.pathname || "/admin/all-products";

  const handleChange = (e) => {
    setFormData({...formData,
        [e.target.name] : e.target.value
    })     
  }

  let { user, loginUser } = useContext(AuthContext)

  const login = async (e) => {
    e.preventDefault()
    loginUser(e.target.username.value, e.target.password.value)
    .catch(error => {
      if (error.response.status === 401)
        toast.error('Incorrect credentials. Please try again.');
      else {
        toast.error('Server error. Request timed out.');
      }
    })
  }

  const [forgotPass, setForgotPassword] = useState(false)
  function onClickToForgotPass() {
    setForgotPassword(true);
  }

  if (forgotPass === true) {
    var link = '/forgot-password';
    return (
        <Navigate to={link}/>
    )
  }

  return (
    user ? <Navigate to={from} replace/> :
    <div><ToastContainer/>
    <Container>
     <Container className='login-wrapper'>
      <Row><h1>Admin Login</h1></Row>
      <Row>
       <Form onSubmit={login}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={formData.username} name="username" onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={formData.password} name="password" onChange={handleChange} required/>
        </Form.Group>

        <Row className='mb-4'>
          <Col>
            <Button variant="link" onClick={() => onClickToForgotPass()}>Forgot password?</Button>
          </Col>
        </Row>

        <Button variant="success" type="submit" >
          Login
        </Button>
        
       </Form>
      </Row>
     </Container>
    </Container>
    </div>
  )
}
