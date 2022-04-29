import React from 'react'

// styles 
import '../../styles/admin/SideNavbar.scss';

// icons
import productsIcon from '../../icons/products.svg'
import featuredIcon from '../../icons/featured.svg'
import galleryIcon from '../../icons/gallery.svg'
import cafeIcon from '../../icons/about-cafe.svg'
import logoutIcon from '../../icons/logout.svg'

// main 
export default function SideNavbar() {
  return (
    <div className="wrapper">
      <div className="sidebar">
        <div className='brand-name-wrapper'>
          <img
            src="/images/tfcafe_logo.png"
            className='cafe-logo-img'
          />
          <img
            alt=""
            src="/images/brand-name.svg"
            className="brand-name-img"
          />{' '}
        </div>
        <hr className='h-line'></hr>
        <ul>
            <li>
              <a href="#">
              <span><img src={productsIcon}></img></span>
               All Products</a>
            </li>
            <li><a href="#"><span><img src={featuredIcon}></img></span>Featured Products</a></li>
            <li><a href="#"><span><img src={galleryIcon}></img></span>Gallery</a></li>
            <li><a href="#"><span><img src={cafeIcon}></img></span>About the cafe</a></li>
        </ul>
        <div class="sidenav-footer">
          <a href="#"><span><img src={logoutIcon}></img></span>Log out</a>
        </div>

      </div>
    </div>
  )
}
