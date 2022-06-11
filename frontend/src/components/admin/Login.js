import React, { useState, useContext } from 'react'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import '../../styles/admin/Common.scss';
import AuthContext from './context/AuthContext'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

// images
//import logo from '../../images/tfcafe_logo.png'
//import cafeNameImg from '../../images/brand-name.svg'


export default function Login() {
  const initialData = Object.freeze({
    username : '',
    password : '',
  })

  const [formData, setFormData] = useState(initialData)
  const [loading, setLoading] = useState(false)
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
    setLoading(true)
    loginUser(e.target.username.value, e.target.password.value)
    .then(response => {
      setLoading(false)
    })
    .catch(error => {
      if (error.response.status === 401)
        toast.error('Incorrect credentials. Please try again.', { autoClose: 2000, hideProgressBar: true });
      else {
        toast.error('Server error. Request timed out.', { autoClose: 2000, hideProgressBar: true });
      }
      setLoading(false)
    })
  }

  const navigate = useNavigate()
  function onClickToForgotPass() {
    navigate('/forgot-password')
  }

  function onClickBack() {
    navigate('/')
  }

  return (
    user ? <Navigate to={from} replace/> :
    <div>
      <ToastContainer/>
      <Container>
      <Container className='login-wrapper d-flex flex-column align-items-center'>

      <Row className='login-box'>
        <Row classNamee="d-flex justify-content-center">
          <h5 className='login-header'>ADMIN LOGIN</h5>
        </Row>
        
        <Form onSubmit={login}>
          
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={formData.username} name="username" onChange={handleChange} autoFocus required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={formData.password} name="password" onChange={handleChange} required/>
          </Form.Group>

          <Row className='mt-1'>
            <Col >
              <Button className='forgot-pass-title' variant="link" onClick={() => onClickToForgotPass()}>Forgot password?</Button>
            </Col>
          </Row>
        

          <Row sm={12} className='d-flex justify-content-center px-5'>
            <Button variant="warning" className='mt-4 login-btn d-flex justify-content-center align-items-center' type="submit" disabled={loading} >
              {  loading &&
                  <Spinner className='mr-2' animation="border" size="sm" role="status">
                  </Spinner>
              }
              <span className={loading ? "" : "mr-3"}>{loading? "Signing in" : "Sign in"}</span>
            </Button>
          </Row>
            
          
          <Row className='mt-2 d-flex justify-content-center'>
              <Button className='forgot-pass-title' variant="link" onClick={() => onClickBack()}>Back to the website</Button>
          </Row>
          

        </Form>
      </Row>
     </Container>
    </Container>
    </div>
  )
}