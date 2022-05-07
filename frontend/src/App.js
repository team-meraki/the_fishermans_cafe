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
import AllGallery from './components/admin/Gallery';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/admin/Login';
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
              <Route exact path="/admin" element={<><Login/></>}/>
              <Route exact path="/admin/all-products" element={<><AllProducts/></>}/>
              <Route exact path="/admin/all-gallery" element={<><AllGallery/></>}/>
          </Routes>
        </Router>

        
      </div>
  );
}

export default App;
