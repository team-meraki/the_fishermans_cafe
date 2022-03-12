import NavBar from './components/NavBar';
import Promotional from './components/Promotional';
import Recommendation from './components/Recommendation';
import './App.css';


function App() {
  return (
    <div className="App">
      <NavBar />
      
      <Promotional />
      <Recommendation />
    </div>
  );
}

export default App;
