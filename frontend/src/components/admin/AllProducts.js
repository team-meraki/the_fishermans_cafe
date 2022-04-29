import React from 'react'
import SideNavbar from "./SideNavbar";
import '../../styles/admin/Body.scss';

export default function AllProducts() {
  return (
    <div className='main-container'>
      <SideNavbar/>
      <div className='main_content'>
        <div className='header'>
          <h2>ALL PRODUCTS</h2>
        </div>
        <div className='content-wrapper'>
          table goes here
        </div>
      </div>
    </div>
  )
}
