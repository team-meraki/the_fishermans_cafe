import React, { useEffect, useState } from 'react'
import SideNavbar from "./SideNavbar";
import { Modal, Table } from 'react-bootstrap';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import {formatDate} from '../common.js'

// icons & css
import 'react-toastify/dist/ReactToastify.css';
// icons
import deleteIcon from '../../icons/delete.svg'
import addIcon from '../../icons/add.svg'

// css
import '../../styles/admin/Common.scss';

import useAxios from './utils/useAxios';
import axios from 'axios';

export default function Gallery() {
  let [galleryPhotos, setGalleryPhotos] = useState([]);
  let [refreshData, setRefreshData] = useState(false)
  const api = useAxios()

  // Get all products
  async function fetchAllPhotos() {
    const response = await axios.get('/api/gallery/');
    return response
  }

  // Add Photo
  const [newPhoto, setNewPhoto] = useState(null);

  const handleAddImage = (e) => {
    setNewPhoto(e.target.files[0]);
  }

  const addPhoto = async (newPhoto) => {
    let form_data = new FormData();
    if (newPhoto)
      form_data.append("image", newPhoto, newPhoto.name);
  
    const response = await api.post(
      '/api/gallery/',
      form_data,
      { headers: {
           "Content-Type": "multipart/form-data",
       },}
     )
      return response;   
   }

  // POST API
  async function addNewPhoto() {
    addPhoto(newPhoto)
    .then(response => {
      if (response.status === 201) {
        setAddShow(false)
        setNewPhoto(null)
        toast.success('Successfully added a photo in gallery!');
        setRefreshData(!refreshData)
      }
    })
    .catch(error => {
      if (error.response.status === 400) {
        const errorData = error.response.data
        for (const key in errorData){
          for (const message of errorData[key]){
            toast.error(`Error in ${key.toUpperCase()} field: ${message}`);
          }
        }
      } else {
        toast.error('Failed to add a photo.');
      }
    })
  }

  const [selected, setSelected] = useState('') // for delete modals

    function onClickDelBtn(id) {
      const str_id = id.toString();
      setSelected(str_id);
      handleDelShow();
    }

    const deletePhoto = async (id) => {
      const response = await api.delete('/api/gallery/' + id + '/');
      return response  
    }

    // DELETE API
    async function delPhoto() {
      setDelShow(false)
      deletePhoto(selected)
      .then(response => {
        if (response.status === 204) {
          setSelected('')
          toast.success('Successfully deleted a photo!');
          setRefreshData(!refreshData)
        }
      })
      .catch(error => {
        if (error.response.status === 404) {
          toast.error('Photo not found.');
        } else {
          toast.error('Failed to delete a photo.'); 
        }
      })
  }

    // ADD MODAL HANDLER
    const [addShow, setAddShow] = useState(false);
    const handleAddClose = () => {
      setAddShow(false);
      setNewPhoto(null)
    }
    const handleAddShow = () => setAddShow(true);

    // DELETE MODAL HANDLER
    const [delShow, setDelShow] = useState(false);
    const handleDelClose = () => {
      setDelShow(false);
      setSelected(null)
    }
    const handleDelShow = () => setDelShow(true);

    useEffect(() => {
      let mounted = true
      fetchAllPhotos()
      .then(response => {
        if(mounted) {
          setGalleryPhotos(response.data);
        }
      })
      .catch(error => {
        toast.error('Could not fetch Gallery photos.')
      })
      return () => mounted = false
    }, [refreshData])
  
  return (
    <div className='main-container'>
      <SideNavbar/>

      <div className='main_content'>
        <ToastContainer/>
        {/* HEADER  */}
        <div className='d-flex justify-content-between header'>
            <h2>Gallery</h2>
            <Button className='add-btn' type="button" variant='success' onClick={handleAddShow}>
                <span><img src={addIcon} alt="Add Icon"></img></span>
                Add a Photo
            </Button>
        </div>

        
        {/* TABLE */}
        <div className='content-wrapper'>
            <div className='tablewrapper'>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Date Added</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {galleryPhotos.map(gallery => ( 
                            <tr key={gallery.id}>
                                <td>{gallery.id}</td>
                                <td><img alt='galleryimg' className="img-content" src={gallery.image}/></td>
                                <td>{formatDate(gallery.last_modified)}</td>
                                <td>
                                    <Button variant="primary "type="btn" 
                                    onClick={() => onClickDelBtn(gallery.id)}>
                                    <img src={deleteIcon} alt="Delete Icon" height="20"/></Button> {" "}
                                </td>
                            </tr>
                    
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>

        {/* ADD MODAL */}
        <Modal show={addShow} onHide={handleAddClose} className='admin-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Add a photo to display</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
              <Form.Label>Upload a file</Form.Label>
              <Form.Control
                type="file" name="image" accept="image/*" required onChange={(e) => handleAddImage(e)}
                autoFocus
              />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleAddClose}>
            Close
          </Button>
          <Button variant="success" type="submit" onClick={() => addNewPhoto()}>
            Save Photo
          </Button>
        </Modal.Footer>
        </Modal>

        {/* DELETE MODAL */}
        <Modal show={delShow} onHide={handleDelClose} className='admin-modal'>
            <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete this photo?</Modal.Title>
            </Modal.Header>
            <Modal.Body>You cannot undo this action.</Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={handleDelClose}>
                Cancel
            </Button>
            <Button variant="outline-success" onClick={()=>delPhoto()}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}
