import React, { useContext } from 'react'
import { useLocation, NavLink, Link } from "react-router-dom";
// styles 
import '../../styles/admin/SideNavbar.scss';

// icons
import productsIcon from '../../icons/products.svg'
import featuredIcon from '../../icons/featured.svg'
import galleryIcon from '../../icons/gallery.svg'
import cafeIcon from '../../icons/about-cafe.svg'
import logoutIcon from '../../icons/logout.svg'
import settingsIcon from '../../icons/settings.svg'
import reviewsIcon from '../../icons/review.svg'
import cafeLogo from '../../images/admin-logo.svg'

import AuthContext from './context/AuthContext'

// main 
export default function SideNavbar() {
  let { logoutUser } = useContext(AuthContext);
  const location = useLocation();
  const { pathname } = location;
  const loc = pathname.split("/");

  return (
    <div className="wrapper">
      <div className="sidebar">
        <div className='brand-name-wrapper'>
          <img
            alt="Cafe Brand Name"
            src={cafeLogo}
            className="brand-name-img"
          />{' '}
        </div>
        <hr className='h-line'></hr>
        <ul id="options">
            <li className={loc[1] === "admin/all-products" ? "active" : ""} id="products-tab">
              <NavLink className="isActive" to="/admin/all-products">
                <span><img src={productsIcon} alt="Products Icon"></img></span>
                <span className='sidenav-name'>Products</span>
              </NavLink>
            </li>
            <li className={loc[1] === "admin/featured" ? "active" : ""} id="feat-prod-tab">
              <NavLink className="isActive" to="/admin/featured">
                <span><img src={featuredIcon} alt="Featured Icon"></img></span>
                <span className='sidenav-name'>Featured Products</span>
              </NavLink>
            </li>
            <li className={loc[1] === "admin/all-gallery" ? "active" : ""} id="gallery-tab">
              <NavLink className="isActive" to="/admin/all-gallery">
                <span><img src={galleryIcon} alt="Gallery Icon"></img></span>
                <span className='sidenav-name'>Gallery</span>
              </NavLink>
            </li>
            <li className={loc[1] === "admin/reviews" ? "active" : ""} id="reviews-tab">
              <NavLink className="isActive" to="/admin/reviews">
                <span><img src={reviewsIcon} alt="Reviews Icon"></img></span>
                <span className='sidenav-name'>Reviews</span>
              </NavLink>
            </li>
            <li className={loc[1] === "admin/cafe" ? "active" : ""} id="cafe-tab">
              <NavLink className="isActive" to="/admin/cafe">
                <span><img src={cafeIcon} alt="Cafe Icon"></img></span>
                <span className='sidenav-name'>About the cafe</span>
              </NavLink>
            </li>
            <li className={loc[1] === "admin/settings" ? "active" : ""} id="settings-tab">
              <NavLink className="isActive" to="/admin/settings">
                <span><img src={settingsIcon} alt="Settings Icon"></img></span>
                <span className='sidenav-name'>Settings</span>
                </NavLink>
            </li>
            <li className="logout-btn">
              <Link to="/admin" replace onClick={logoutUser}>
                <span><img src={logoutIcon} alt="Logout Icon"></img></span>
                <span className='sidenav-name'>Log out</span>
              </Link>
            </li>
            
        </ul>
      </div>
    </div>
  )
}
