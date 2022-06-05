import React, { useEffect, useState } from 'react'
import SideNavbar from "./SideNavbar";
import { toast, ToastContainer } from 'react-toastify';
import '../../styles/admin/Common.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { getApi } from '../../adminAxios';
import useAxios from './utils/useAxios';
import PulseLoader from "react-spinners/PulseLoader";
import ClipLoader from "react-spinners/ClipLoader";

export default function AboutTheCafe() {
  const [clicked, setClicked] = useState(false);

  // Monitor if something has changed
  const [hasChanged, setHasChanged] = useState(false);

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
  setHasChanged(true);
  const { name, value } = e.target;
  setEditedCafeInfo(prevState => ({
      ...prevState,
      [name]: value
  }));
  //console.log(editedInfo)
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
  
    response = await api.put(
      'api/cafeinfo/',
      form_data,
      { headers: {
           "Content-Type": "multipart/form-data",
       },}
     )
        
    return response 
  }

 async function saveEdits() {
  if (clicked===false) {
    setClicked(true);
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
    }).finally(()=>setClicked(false))
  }
 }

 // Fetch cafe details
 async function fetchCafeInfo() {
  const response = await getApi('api/cafeinfo/');
  return response
 }

 const [loading, setLoading] = useState(true);
 useEffect( () => {
  let mounted = true
  fetchCafeInfo()
  .then(response => {
    if (mounted && loading){
      setEditedCafeInfo({
        schedule: response.data.schedule,
        location: response.data.location,
        contact_number: response.data.contact_number,
        facebook: response.data.facebook,
        description: response.data.description,
        announcement: response.data.announcement,
        table_accommodation: response.data.table_accommodation,
        delivery_info: response.data.delivery_info
      });
      setLoading(false);
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

      <div className='d-flex justify-content-between header'>
          <h2>About the Cafe</h2>
      </div>
      
      { loading===false ?
      
        <div className='content-wrapper'>
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

            <div className='d-flex justify-content-end mt-5'>
              {
                (clicked === true) && 
                (
                  <Button variant="success" type="submit" disabled className='loader-btn'>
                    Saving <PulseLoader color="#FFFFFF" size={5} speedMultiplier={0.5} />
                  </Button>
                )
              }
              {
                (clicked === false) && 
                (<div>
                  <Button variant="success" type="submit" onClick={() => saveEdits()} disabled={!hasChanged}>
                    Save changes
                  </Button>
                </div>)
              }
            </div>

        </div>
        
      :

        <div className='d-flex justify-content-center align-item-center mt-5'>
          <ClipLoader color="#274B5F" size={80} />
        </div>

      }

    </div>

  </div>
  )
}
