import React, { useEffect, useState } from 'react'
import SideNavbar from "./SideNavbar";
import { toast, ToastContainer } from 'react-toastify';
import '../../styles/admin/Common.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import useAxios from './utils/useAxios';

export default function AboutTheCafe() {
 //const [cafeInfo, setCafeInfo] = useState({});

 // Edit cafe details hooks
 const initialData = Object.freeze({
  schedule: "",
  location: "",
  contact_number: "",
  facebook: "",
  description: "",
  announcement: "",
  table_accommodation: "",
  delivery_info: ""
})

 const [editedInfo, setEditedCafeInfo] = useState(initialData)
 let [refreshData, setRefreshData] = useState(false)
  const api = useAxios()

 const handleEditChange = (e) => {
  const { name, value } = e.target;
  setEditedCafeInfo(prevState => ({
      ...prevState,
      [name]: value
  }));
  //console.log(editedInfo)
 }

  const handleEditImage = (e) => {
    let editedImg = { ...editedInfo };
    editedImg[e.target.name] = e.target.files[0];
    setEditedCafeInfo(editedImg);
  }

  const editCafeInfo = async (editedInfo) => {
    let response;
    let form_data = new FormData();
    form_data.append("schedule", editedInfo.schedule);
    form_data.append("location", editedInfo.location);
    form_data.append("contact_number", editedInfo.contact_number);
    form_data.append("facebook", editedInfo.facebook);
    form_data.append("description", editedInfo.description);
    form_data.append("announcement", editedInfo.announcement);
    form_data.append("table_accommodation", editedInfo.table_accommodation);
    form_data.append("delivery_info", editedInfo.delivery_info);
  
    if (editedInfo.logo){
      form_data.append("logo", editedInfo.logo, editedInfo.logo.name);

      response = await api.put(
        'api/cafeinfo/',
        form_data,
        { headers: {
             "Content-Type": "multipart/form-data",
         },}
       )
        
    }
    else {
      response = await api.patch(
        'api/cafeinfo/',
        form_data,
        { headers: { 
             "Content-Type": "multipart/form-data",
         },}
      )

    }
    return response 
  }

 async function saveEdits() {
  editCafeInfo(editedInfo)
  .then(response => {
    if (response.status === 200) {
      toast.success('Successfully saved the changes!', { autoClose: 2000, hideProgressBar: true });
      setRefreshData(!refreshData)
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
      toast.error('Failed to edit a product.', { autoClose: 2000, hideProgressBar: true });
    }
  })
 }

 // Fetch cafe details
 async function fetchCafeInfo() {
  const response = await axios.get('/api/cafeinfo/');
  return response
 }

 useEffect( () => {
  let mounted = true
  fetchCafeInfo()
  .then(response => {
    if (mounted){
      setEditedCafeInfo({
        schedule: response.data.schedule,
        location: response.data.location,
        contact_number: response.data.contact_number,
        facebook: response.data.facebook,
        description: response.data.description,
        announcement: response.data.announcement,
        table_accommodation: response.data.table_accommodation,
        delivery_info: response.data.delivery_info
      })
    }
  })
  .catch(error => {
    toast.error('Failed to fetch Cafe Info.');
  })
  return () => mounted = false
 },[refreshData])

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
      {/* <Form onSubmit={() => saveEdits()}> */}
       <Row className='d-flex align-items-center mb-1'>
        <Col sm="2">Logo</Col>
        <Col sm="4" className='d-flex align-items-center'>
          <Form.Control type="file" name="logo" accept="image/*" onChange={(e) => handleEditImage(e)} />
        </Col>
       </Row>
       <Row className='d-flex align-items-center mb-1'>
        <Col sm="2">Schedule</Col>
        <Col><Form.Control as="textarea" name="schedule" value={editedInfo.schedule} onChange={(e) => handleEditChange(e)}/></Col>
        <Col sm="2">Location</Col>
        <Col><Form.Control as="textarea" name="location" value={editedInfo.location} onChange={(e) => handleEditChange(e)}/></Col>
       </Row>
       <Row className='d-flex align-items-center mb-1'>
        <Col sm="2">Contact Number</Col>
        <Col><Form.Control type="text" name="contact_number" value={editedInfo.contact_number} onChange={(e) => handleEditChange(e)}/></Col>
        <Col sm="2">Facebook Link</Col>
        <Col><Form.Control type="text" name="facebook" value={editedInfo.facebook} onChange={(e) => handleEditChange(e)}/></Col>
       </Row>
       <Row className='mb-1'>
        <Col sm="2">Description</Col>
        <Col><Form.Control as="textarea" name="description" value={editedInfo.description} onChange={(e) => handleEditChange(e)} rows={4}/></Col>
       </Row>

       <div className='mt-5'></div>
        <hr></hr>
       <div className='mb-5'></div>

        <Row className='d-flex align-items-center mb-1'>
         <Col sm="2">Announcement</Col>
         <Col><Form.Control as="textarea" name="announcement" value={editedInfo.announcement} onChange={(e) => handleEditChange(e)} rows={1}/></Col>
        </Row>
        <Row className='d-flex align-items-center mb-1'>
         <Col sm="2">Table Accomodation</Col>
         <Col><Form.Control as="textarea" name="table_accommodation" value={editedInfo.table_accommodation} onChange={(e) => handleEditChange(e)} rows={1}/></Col>
        </Row>
        <Row className='d-flex align-items-center mb-1'>
         <Col sm="2">Delivery Info</Col>
         <Col><Form.Control as="textarea" name="delivery_info" value={editedInfo.delivery_info} onChange={(e) => handleEditChange(e)} rows={1}/></Col>
        </Row>

       <div className='d-flex justify-content-end mt-4 '>
        <Button type="submit" variant="success" onClick={() => saveEdits()}>Save Changes</Button>
       </div>

      {/* </Form> */}
     </div>
   </div>
  </div>
 )
}
