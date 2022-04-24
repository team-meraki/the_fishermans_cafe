import LandingNavBar from './components/NavBar';
import NavBar from './components/NavBarWithBgColor';
import Promotional from './components/Promotional';
import FeaturedProducts from './components/FeaturedProducts';
import SuggestionBox from './components/SuggestionBox';
import Menu from './components/menu/Menu';
import Gallery from './components/Gallery';
import About from './components/About';
import AllGallery from './components/AllGallery';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
      <div className="App">
        <Router>
          <Routes>
              <Route exact path="" element={<><LandingNavBar /><Promotional/><FeaturedProducts/><SuggestionBox/></>}/>
              <Route exact path="/menu" element={<><NavBar/><Menu/></>}/>
              <Route exact path="/gallery" element={<><NavBar/><Gallery/></>}/>
              <Route exact path="/about" element={<><LandingNavBar/><About/></>}/>
              <Route exact path="/test" element={<><NavBar/><AllGallery/></>}/>
          </Routes>
        </Router>

        <Footer />
      </div>
  );
}

export default App;
