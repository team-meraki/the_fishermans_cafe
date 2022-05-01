import React, { useEffect, useState } from 'react'
import SideNavbar from "./SideNavbar";
import '../../styles/admin/Body.scss';
import { Table } from 'react-bootstrap';
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
        <div className='header'>
          <h2>Admin Gallery</h2>
        </div>
        <div className='content-wrapper'>
            <div className='tablewrapper'>
                <Table responsive className='table-striped table-bordered'>
                    <thead>
                        <tr className='text-center'>
                            <th>Id</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {galleryAdmin.map(gallery => ( 
                            <tr className='text-center'>
                                <td>{gallery.id}</td>
                                <td><img alt='galleryimg' className="img-content" src={gallery.image}/></td>
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
