import React, { useEffect, useState } from 'react'
import SideNavbar from "./SideNavbar";
import { Col, Row, Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

// icons
import editIcon from '../../icons/edit.svg'
import deleteIcon from '../../icons/delete.svg'
import addIcon from '../../icons/add.svg'

// css
import '../../styles/admin/Body.scss';
import '../../styles/admin/AdminTable.scss';

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
  
  return (
    <div className='main-container'>
      <SideNavbar/>
      <div className='main_content'>
        <div className='d-flex justify-content-between header'>
            <div>
                <h2>Gallery</h2>
            </div>
            
            <div className='header-add-btn'>
                <Button variant='success'>
                    <span><img src={addIcon}></img></span>Add a photo
                </Button>
            </div>
        </div>
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
                                    <Button variant="primary" type="btn btn-primary" data-toggle="modal" data-target="#sampleModal"
                                    onClick={() => (gallery.id)}>Edit 
                                    <img src= {editIcon} height="20"/></Button> {" "}
                                    <Button variant="primary "type="btn btn-primary" data-toggle="modal" data-target="#sampleModal"
                                    onClick={() => (gallery.id)}>Delete
                                    <img src= {deleteIcon} height="20"/></Button> {" "}
                                </td>
                            </tr>
                    
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
      </div>
    </div>
  )
}
