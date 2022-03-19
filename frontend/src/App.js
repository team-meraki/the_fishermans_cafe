import NavBar from './components/NavBar';
import Promotional from './components/Promotional';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from './components/Footer';
import SuggestionBox from './components/SuggestionBox';

function App() {
  return (
      <div className="App">
        <NavBar />
        <Promotional />
        <FeaturedProducts />
        <SuggestionBox />
        <Footer />
      </div>
  );
}

export default App;
