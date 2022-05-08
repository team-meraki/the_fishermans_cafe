import React, { useEffect, useState } from 'react'
import SideNavbar from "./SideNavbar";
import { Col, Modal, Row, Table } from 'react-bootstrap';
import { Button, Form } from 'react-bootstrap';

// icons
import deleteIcon from '../../icons/delete.svg'
import addIcon from '../../icons/add.svg'

// css
import '../../styles/admin/Common.scss';

export default function Gallery() {
  let [galleryAdmin, setGalleryAdmin] = useState([]);

    useEffect(() => {
        let mounted = true
        getGalleryAdmin()
        .then(galleryAdmin => {
            if(mounted) {
                setGalleryAdmin(galleryAdmin)
            }
        })
        return () => mounted = false
    }, [])

    let getGalleryAdmin = async () => {
        let response = await fetch("/api/gallery/");
        let data = await response.json();
        return data;
    }
    
    // ADD MODAL HANDLER
    const [addShow, setAddShow] = useState(false);
    const handleAddClose = () => setAddShow(false);
    const handleAddShow = () => setAddShow(true);

    
    // DELETE MODAL HANDLER
    const [delShow, setDelShow] = useState(false);
    const handleDelClose = () => setDelShow(false);
    const handleDelShow = () => setDelShow(true);


  
  return (
    <div className='main-container'>
      <SideNavbar/>

      <div className='main_content'>
        
        {/* HEADER  */}
        <div className='d-flex justify-content-between header'>
            <h2>Gallery</h2>
            <Button className='add-btn' type="button" variant='success' onClick={handleAddShow}>
                <span><img src={addIcon}></img></span>
                Add a Photo
            </Button>
        </div>

            {/* <div className='header-add-btn'>
                <Button type="button" variant='success'>
                    <span><img src={addIcon}></img></span>Add a Photo</Button>
                    <Form>
                        <div class="form-group">
                            <label for="inputProductName">Product Name *</label>
                            <input type="name" class="form-control" id="inputProductName" placeholder="Enter product name"></input>
                        </div>
                        <div class="form-group">
                            <label for="inputProductPrice">Product Price *</label>
                            <input type="price" class="form-control" id="inputProductPrice" placeholder="Enter product price"></input>
                        </div>
                        <div class="form-group">
                            <label for="inputProductImg">Product Image</label>
                            <input type="file" class="form-control-file" id="inputProductImg"></input>
                        </div>
                        <Button type="Submit" class="btn btn-primary">Submit</Button>
                    </Form> 
            </div> */}
        
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
                        {galleryAdmin.map(gallery => ( 
                            <tr className='text-center'>
                                <td>{gallery.id}</td>
                                <td><img alt='galleryimg' className="img-content" src={gallery.image}/></td>
                                <td>
                                    <Button variant="primary "type="btn" 
                                    onClick={handleDelShow}>
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
                type="file"
                autoFocus
              />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleAddClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleAddClose}>
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
            <Button variant="outline-success" onClick={handleDelClose}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}
