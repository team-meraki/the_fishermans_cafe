import React, { useEffect, useState } from 'react'
import SideNavbar from "./SideNavbar";
import { toast, ToastContainer } from 'react-toastify';
import '../../styles/admin/Common.scss';
import 'react-toastify/dist/ReactToastify.css';
import { editCafeInfo, getCafeInfo } from '../../adminAPI';
import { Button, Col, Form, Row } from 'react-bootstrap';

export default function AboutTheCafe() {
 //const [cafeInfo, setCafeInfo] = useState({});

 // Edit cafe details hooks
 const [editedInfo, setEditedCafeInfo] = useState({})

 const handleEditChange = (e) => {
  const { name, value } = e.target;
  setEditedCafeInfo(prevState => ({
      ...prevState,
      [name]: value
  }));
  console.log(editedInfo)
 }

 async function saveEdits() {
  console.log(editedInfo)
  const response = await editCafeInfo(editedInfo)
  console.log(response);

//   if (response.data.status === 200) {
//    toast.success('Successfully saved the changes!');
//    //setRefreshData(!refreshData)
//   }
//   else if (response.data.status === 400) {
//    toast.error('Failed to save changes');
//   }
 }

 // Fetch cafe details
 async function fetchCafeInfo() {
  const response = await getCafeInfo();
  //setCafeInfo(response.data.data);
  console.log(response.data.data)
  setEditedCafeInfo(response.data.data)
  console.log(editedInfo)
 }

 useEffect( () => {
  fetchCafeInfo();
 },[])

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
          <Form.Control type="file" name="logo" onChange={(e) => handleEditChange(e)} />
        </Col>
       </Row>
       <Row className='d-flex align-items-center mb-1'>
        <Col sm="2">Schedule</Col>
        <Col><Form.Control type="text" name="schedule" value={editedInfo.schedule} onChange={(e) => handleEditChange(e)}/></Col>
        <Col sm="2">Location</Col>
        <Col><Form.Control type="text" name="location" value={editedInfo.location} onChange={(e) => handleEditChange(e)}/></Col>
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
