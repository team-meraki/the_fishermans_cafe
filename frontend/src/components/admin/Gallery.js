import React, { useEffect, useState } from 'react'
import SideNavbar from "./SideNavbar";
import { Modal, OverlayTrigger, Table } from 'react-bootstrap';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import {formatDate, renderTooltip} from '../common.js'
import PulseLoader from "react-spinners/PulseLoader";
import ClipLoader from "react-spinners/ClipLoader";

// icons & css
import 'react-toastify/dist/ReactToastify.css';
// icons
import deleteIcon from '../../icons/delete.svg'
import addIcon from '../../icons/add.svg'

// css
import '../../styles/admin/Common.scss';

import useAxios from './utils/useAxios';
import { getApi } from '../../adminAxios';

export default function Gallery() {
  const [clicked, setClicked] = useState(false);
  let [galleryPhotos, setGalleryPhotos] = useState([]);
  let [refreshData, setRefreshData] = useState(false)
  const api = useAxios()

  // Get all products
  async function fetchAllPhotos() {
    const response = await getApi('api/gallery/');
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
      'api/gallery/',
      form_data,
      { headers: {
           "Content-Type": "multipart/form-data",
       },}
     )
      return response;   
   }

  // POST API
  async function addNewPhoto() {
      setClicked(true)
      addPhoto(newPhoto)
      .then(response => {
        if (response.status === 201) {
          setAddShow(false)
          setNewPhoto(null)
          toast.success('Successfully added a photo in gallery!', { autoClose: 2000, hideProgressBar: true });
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
          toast.error('Failed to add a photo.', { autoClose: 2000, hideProgressBar: true });
        }
      }).finally(() => 
        setClicked(false)
      )
    
  }

  const [selected, setSelected] = useState('') // for delete modals

    function onClickDelBtn(id) {
      const str_id = id.toString();
      setSelected(str_id);
      handleDelShow();
    }

    const deletePhoto = async (id) => {
      const response = await api.delete('api/gallery/' + id + '/');
      return response  
    }

    // DELETE API
    async function delPhoto() {
        setClicked(true)
        deletePhoto(selected)
        .then(response => {
          if (response.status === 204) {
            setSelected('')
            toast.success('Successfully deleted a photo!', { autoClose: 2000, hideProgressBar: true });
            setRefreshData(!refreshData)
          }
        })
        .catch(error => {
          if (error.response.status === 404) {
            toast.error('Photo not found.', { autoClose: 2000, hideProgressBar: true });
          } else {
            toast.error('Failed to delete a photo.', { autoClose: 2000, hideProgressBar: true }); 
          }
        })
        .finally(()=>{
          setClicked(false)
          setDelShow(false)
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

    // GET API 
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      let mounted = true
      fetchAllPhotos()
      .then(response => {
        if(mounted) {
          setGalleryPhotos(response.data);
          if(loading)
            setLoading(false)
        }
      })
      .catch(error => {
        toast.error('Could not fetch Gallery photos.', { autoClose: 2000, hideProgressBar: true })
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
            <Button className='add-btn' type="button" variant='warning' onClick={handleAddShow}>
                <span><img src={addIcon} alt="Add Icon"></img></span>
                New photo
            </Button>
        </div>

        
        {/* TABLE */}
        <div className='content-wrapper'>
        {
          loading===false ?
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
                                  <OverlayTrigger
                                      placement="bottom"
                                      delay={{ show: 50, hide: 50 }}
                                      overlay={renderTooltip("Delete")}
                                  >
                                      <Button className="admin-custom-btn" variant="primary "type="btn" onClick={() => onClickDelBtn(gallery.id)}>
                                        <img src={deleteIcon} alt="Delete Icon" height="20"/>
                                      </Button> 
                                  </OverlayTrigger>
                                     {" "}
                                </td>
                            </tr>
                    
                        ))}
                    </tbody>
                </Table>
            </div>
              :
            <div className='d-flex justify-content-center align-item-center mt-5'>
              <ClipLoader color="#274B5F" size={80} />
            </div>
        }
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
          {
              (clicked === true) && 
              (
                <Button variant="warning" type="submit" disabled className='loader-btn add-btn'>
                  Saving <PulseLoader color="#FFFFFF" size={5} speedMultiplier={0.5} />
                </Button>
              )
            }
            {
              (clicked === false) && 
              (<div>
                <Button variant="warning" type="submit" className='add-btn' onClick={() => addNewPhoto()}>
                  Save Photo
                </Button>
              </div>)
            }
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
            {(clicked === true) && 
                (<Button variant="outline-success" disabled className='loader-btn'>
                    Deleting <PulseLoader color="#5cb85c" size={5} speedMultiplier={0.5} />
                </Button>)
            }
            {(clicked === false) && 
                (<Button variant="outline-success" onClick={() => delPhoto()}>
                Delete</Button>)
            }
            </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}
