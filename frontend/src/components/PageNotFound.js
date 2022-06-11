import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import not_found_illustration from '../images/not-found.svg'
// css


export default function PageNotFound() {
  return (
    <Container className='page-not-found'>
      <img className='page-not-found-img' src={not_found_illustration}></img>
      <h3 className="oops mt-3">Oops. Page not found!</h3>
      <h5 className="mt-3 mb-3">This may not be the page you are looking for.</h5>
      <Link to='/'>Back to home</Link>
    </Container>
  )
}