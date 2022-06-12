import React, { useContext, useEffect, useState } from 'react'
import SideNavbar from "./SideNavbar";
import { ToastContainer, toast } from 'react-toastify';
import '../../styles/admin/Common.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Col, Form, Row } from 'react-bootstrap';
import AuthContext from './context/AuthContext';
// import { updateCredentials } from '../../adminAPI';
import useAxios from './utils/useAxios';
import PulseLoader from "react-spinners/PulseLoader";

export default function AdminSettings() {
  const { user, loginUser } = useContext(AuthContext)
  const [clickedCreds, setClickedCreds] = useState(false);
  const [clicked, setClicked] = useState(false);

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
    if (clickedCreds===false) {
      setClickedCreds(true);
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
          toast.error('Failed to edit admin credentials', { autoClose: 2000, hideProgressBar: true });
        }
      })
      .finally(
        ()=>setClickedCreds(false)
      )
    }
  }

  const editPassword = async () => {
    if (clicked===false) {
      setClicked(true);
      if(passwordChange.new_password && 
        (passwordChange.new_password === passwordChange.confirmed_password)){
        
          api.put('/api/user/update/password/', {
            "old_password" : passwordChange.old_password,
            "new_password": passwordChange.new_password,
            "confirmed_password": passwordChange.confirmed_password
          })
          .then(response => {
            if (response.status === 200){
              setCredentials(initialCredentials);
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
          .finally(
            ()=>setClicked(false)
          )
      } else {
        toast.error("The two password fields didn't match.", { autoClose: 2000, hideProgressBar: true });
        setClicked(false);
      }
      setPasswordChange(initialPasswordChange)
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
         <h2>Account Settings</h2>
     </div>

     {/* FORM */}
     
      <div className='content-wrapper mt-5'>
        <Row>
          <Col sm={12} md={6} className='admin-col mb-5'>
            <Row className='d-flex justify-content-center mb-1'>
              <h4 className='settings-header'>Admin Information</h4>
            </Row>
              <Row>
                <Form.Group> 
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={credentials.email} onChange={handleCredentialsChange}/>
                </Form.Group> 
              </Row>
              <Row>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' name="username" value={credentials.username} onChange={handleCredentialsChange}/>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' name="password" placeholder='Enter password to confirm change' value={credentials.password} onChange={handleCredentialsChange}/>
                </Form.Group>
              </Row>
            
            {
              (clickedCreds === true) && 
              (<div className='d-flex justify-content-center mt-4'>
                  <Button variant="success" type="submit" disabled className='loader-btn'>
                    Saving <PulseLoader color="#FFFFFF" size={5} speedMultiplier={0.5} />
                  </Button>
                </div>
              )
            }
            {
              (clickedCreds === false) && 
              (<div className='d-flex justify-content-center mt-4'>
                <Button variant="success" type="submit" onClick={() => editCredentials()}>
                  Save Changes
                </Button>
              </div>)
            }
          </Col>
          
          <Col className='admin-col'>
            <Row className='d-flex justify-content-center mb-1'>
              <h4 className='settings-header'>Change Password</h4>
            </Row>
              <Row>
            <Form.Group>
                <Form.Label>Old Password</Form.Label>
                <Form.Control type="password" name="old_password" value={passwordChange.old_password} onChange={handlePasswordChange}/>
            </Form.Group>
              </Row>
              <Row>
            <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" name="new_password" value={passwordChange.new_password} onChange={handlePasswordChange}/>
            </Form.Group>
              </Row>
              <Row>
            <Form.Group>
                <Form.Label>Verify Password</Form.Label>
                <Form.Control type="password" name="confirmed_password" value={passwordChange.confirmed_password} onChange={handlePasswordChange}/>
            </Form.Group>
              </Row>


            {
              (clicked === true) && 
              (<div className='d-flex justify-content-center mt-4'>
                  <Button variant="success" type="submit" disabled className='loader-btn'>
                    Changing <PulseLoader color="#FFFFFF" size={5} speedMultiplier={0.5} />
                  </Button>
                </div>
              )
            }
            {
              (clicked === false) && 
              (<div className='d-flex justify-content-center mt-4'>
                <Button variant="success" type="submit" onClick={() => editPassword()}>
                  Change password
                </Button>
              </div>)
            }

            </Col>
        </Row>
      </div>
   </div>
  </div>
 )
}
