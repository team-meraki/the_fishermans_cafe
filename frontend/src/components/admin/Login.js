import React from 'react'
import { Button, Container, Form, Row } from 'react-bootstrap'
import '../../styles/admin/Common.scss';

export default function Login() {
  return (
    <Container>
     <Container className='login-wrapper'>
      <Row><h1>Admin Login</h1></Row>
      <Row>
       <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" required/>
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
       </Form>
      </Row>
     </Container>
    </Container>
  )
}
