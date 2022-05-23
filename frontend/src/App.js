import LandingNavBar from './components/NavBar';
import NavBar from './components/NavBarWithBgColor';
import Promotional from './components/Promotional';
import FeaturedProducts from './components/FeaturedProducts';
import SuggestionBox from './components/SuggestionBox';
import Menu from './components/menu/Menu';
import Gallery from './components/Gallery';
import About from './components/About';
import Footer from './components/Footer';
import DeliveryBanner from './components/DeliveryBanner';
import AllProducts from './components/admin/AllProducts';
import Featured from './components/admin/Featured';
import AllGallery from './components/admin/Gallery';
import AboutTheCafe from './components/admin/AboutTheCafe';
import Reviews from './components/admin/Reviews';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/admin/Login';
import PrivateRoute from './components/admin/utils/PrivateRoute';
import { AuthProvider } from './components/admin/context/AuthContext';
import AdminSettings from './components/admin/Settings';

function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
              <Route exact path="" element={<><LandingNavBar /><Promotional/><FeaturedProducts/><SuggestionBox/><DeliveryBanner/><Footer /></>}/>
              <Route exact path="/menu" element={<><NavBar/><Menu/><Footer /></>}/>
              <Route exact path="/gallery" element={<><NavBar/><Gallery/><Footer /></>}/>
              <Route exact path="/about" element={<><LandingNavBar/><About/><Footer /></>}/>

              {/* Admin */}
              <Route element={<AuthProvider/>}>
                <Route exact path="/admin" element={<Login/>}/>
                <Route element={<PrivateRoute/>}>
                  <Route exact path="/admin/all-products" element={<AllProducts/>}/>
                  <Route exact path="/admin/featured" element={<Featured/>}/>
                  <Route exact path="/admin/all-gallery" element={<AllGallery/>}/>
                  <Route exact path="/admin/cafe" element={<AboutTheCafe/>}/>
                  <Route exact path="/admin/settings" element={<AdminSettings/>}></Route>
                  <Route exact path="/admin/reviews" element={<Reviews/>}></Route>
              {/*<Route exact path="/admin/all-products" element={<><AllProducts/></>}/>
              <Route exact path="/admin/all-gallery" element={<><AllGallery/></>}/>*/}
                </Route>
              </Route>
          </Routes>
        </Router>

        
      </div>
  );
}

export default App;
