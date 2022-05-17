import React, { useEffect, useState } from 'react'
import SideNavbar from "./SideNavbar";
import { Modal, Table } from 'react-bootstrap';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

// icons & css
import 'react-toastify/dist/ReactToastify.css';
// icons
import deleteIcon from '../../icons/delete.svg'
import addIcon from '../../icons/add.svg'

// css
import '../../styles/admin/Common.scss';
import { addPhoto, deletePhoto, getAllPhotos } from '../../adminAPI';

export default function Gallery() {
  let [galleryPhotos, setGalleryPhotos] = useState([]);
  let [refreshData, setRefreshData] = useState(false)
  
  // Get all products
  async function fetchAllPhotos() {
    const response = await getAllPhotos();
    return response
  }

  // Add Photo
  const [newPhoto, setNewPhoto] = useState(null);

  const handleAddImage = (e) => {
    setNewPhoto(e.target.files[0]);
  }

  // POST API
  async function addNewPhoto() {
    const response = await addPhoto(newPhoto);
    
    if (response.data.status === 201) {
        setAddShow(false)
        setNewPhoto(null)
        toast.success('Successfully added a photo in gallery!');
        setRefreshData(!refreshData)
      }
      else if (response.data.status === 400) {
        toast.error('Invalid field: Failed to add a photo!');
    }
  }

  const [selected, setSelected] = useState('') // for delete modals

    function onClickDelBtn(id) {
      const str_id = id.toString();
      setSelected(str_id);
      handleDelShow();
    }

    // DELETE API
    async function delPhoto() {
      const response = await deletePhoto(selected);
      setDelShow(false)
      if (response.data.status === 204) {
        setSelected('')
        toast.success('Successfully deleted a photo!');
        setRefreshData(!refreshData)
      }
      if (response.data.status === 400) {
          toast.error('Failed to delete a photo!');
      }
      if (response.data.status === 404) {
          toast.error('Photo not found!');
      }
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
            setGalleryPhotos(response.data.data);
          }
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
                        <tr className='text-center'>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {galleryPhotos.map(gallery => ( 
                            <tr key={gallery.id} className='text-center'>
                                <td>{gallery.id}</td>
                                <td><img alt='galleryimg' className="img-content" src={gallery.image}/></td>
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
