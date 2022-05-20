import React, { useContext } from 'react'
import { Link } from "react-router-dom";

// styles 
import '../../styles/admin/SideNavbar.scss';

// icons
import productsIcon from '../../icons/products.svg'
import featuredIcon from '../../icons/featured.svg'
import galleryIcon from '../../icons/gallery.svg'
import cafeIcon from '../../icons/about-cafe.svg'
import logoutIcon from '../../icons/logout.svg'
import AuthContext from './context/AuthContext'
import settingsIcon from '../../icons/settings.svg'

import CafeLogoImg from '../../images/tfcafe_logo.png'
import BrandNameImg from '../../images/brand-name.svg'

// main 
export default function SideNavbar() {
  let { logoutUser } = useContext(AuthContext)
  return (
    <div className="wrapper">
      <div className="sidebar">
        <div className='brand-name-wrapper'>
          <img
            src={CafeLogoImg}
            alt="Cafe Logo"
            className='cafe-logo-img'
          />
          <img
            alt="Brand Name"
            src={BrandNameImg}
            className="brand-name-img"
          />{' '}
        </div>
        <hr className='h-line'></hr>
        <ul>
            <li>
              <Link to="/admin/all-products" href="#">
              <span><img src={productsIcon} alt="Products Icon"></img></span>
               All Products</Link>
            </li>
            <li><Link to="/admin/featured"><span><img src={featuredIcon} alt="Featured Icon"></img></span>Featured Products</Link></li>
            <li><Link to="/admin/all-gallery"><span><img src={galleryIcon} alt="Gallery Icon"></img></span>Gallery</Link></li>
            <li><Link to="/admin/cafe"><span><img src={cafeIcon} alt="Cafe Icon"></img></span>About the cafe</Link></li>
        </ul>
        <div className="sidenav-footer">
<<<<<<< Updated upstream
          <ul>
            <li><Link to="/admin/settings"><span><img src={settingsIcon} alt="Settings Icon"></img></span>Settings</Link></li>
            <li><Link to="/admin" replace onClick={logoutUser}><span><img src={logoutIcon} alt="Logout Icon"></img></span>Log out</Link></li>
          </ul>
=======
          <Link to="#" replace onClick={logoutUser}><span><img src={logoutIcon} alt="Logout Icon"></img></span>Log out</Link>
>>>>>>> Stashed changes
        </div>

      </div>
    </div>
  )
}
