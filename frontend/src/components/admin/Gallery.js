import React, { useEffect, useState } from 'react'
import SideNavbar from "./SideNavbar";
import { Modal, Table } from 'react-bootstrap';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { reloadPage } from '../common';

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

  // Get all products
  async function fetchAllPhotots() {
    const response = await getAllPhotos();
    setGalleryPhotos(response.data.data);
  }

  // Add Photo
  const [newPhoto, setNewPhoto] = useState({
    image: "",
  });

  const handleAddImage = (e) => {
    let img = { ...newPhoto };
    img["image"] = e.target.files[0];
    setNewPhoto(img);
  }

  // POST API
  async function addNewPhoto() {
    console.log(newPhoto)
    const response = await addPhoto(newPhoto);
    console.log(response);
    if (response.data.status === 201) {
        toast.success('Successfully added a photo in gallery!');
        setTimeout(function () {
          reloadPage();
        }, 2000);
      }
    if (response.data.status === 400) {
        toast.error('Invalid field: Failed to add a photo!');
    }
  }

  const [selected, setSelected] = useState('') // for delete modals

    function onClickDelBtn(id) {
        handleDelShow();
        const str_id = id.toString();
        setSelected(str_id);
    }

    // DELETE API
    async function delPhoto() {
      const response = await deletePhoto(selected);
      console.log(response)
      if (response.data.status === 204) {
      toast.success('Successfully deleted a photo!');
      setTimeout(function () {
          reloadPage();
      }, 2000);
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
    const handleAddClose = () => setAddShow(false);
    const handleAddShow = () => setAddShow(true);

    // DELETE MODAL HANDLER
    const [delShow, setDelShow] = useState(false);
    const handleDelClose = () => setDelShow(false);
    const handleDelShow = () => setDelShow(true);

    useEffect(() => {
      fetchAllPhotots();
    }, [])
  
  return (
    <div className='main-container'>
      <SideNavbar/>

      <div className='main_content'>
        <ToastContainer/>
        {/* HEADER  */}
        <div className='d-flex justify-content-between header'>
            <h2>Gallery</h2>
            <Button className='add-btn' type="button" variant='success' onClick={handleAddShow}>
                <span><img src={addIcon}></img></span>
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
                            <tr className='text-center'>
                                <td>{gallery.id}</td>
                                <td><img alt='galleryimg' className="img-content" src={gallery.image}/></td>
                                <td>
                                    <Button variant="primary "type="btn" 
                                    onClick={() => onClickDelBtn(gallery.id)}>
                                    <img src= {deleteIcon} height="20"/></Button> {" "}
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
                type="file" name="image" required onChange={(e) => handleAddImage(e)}
                autoFocus
              />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleAddClose}>
            Close
          </Button>
          <Button variant="success" type="submit" onClick={() => addNewPhoto()}>
            Save Changes
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
