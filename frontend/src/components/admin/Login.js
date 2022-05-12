import React, { useState, useContext } from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap'
import '../../styles/admin/Common.scss';
import AuthContext from './context/AuthContext'
import { Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

export default function Login() {
  const initialData = Object.freeze({
    username : '',
    password : '',
  })

  const [formData, setFormData] = useState(initialData)

  const handleChange = (e) => {
    setFormData({...formData,
        [e.target.name] : e.target.value
    })     
  }

  let { user, loginUser } = useContext(AuthContext)

  return (
    user ? <Navigate to="/admin/all-products" replace={true}/> :
    <div><ToastContainer/>
    <Container>
     <Container className='login-wrapper'>
      <Row><h1>Admin Login</h1></Row>
      <Row>
       <Form onSubmit={loginUser}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" value={formData.username} name="username" onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" value={formData.password} name="password" onChange={handleChange} required/>
        </Form.Group>
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
