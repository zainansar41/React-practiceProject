import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/about' element={<About />} />
              <Route path="*" element={<h2>page not found</h2>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>


  );
}

export default App;
