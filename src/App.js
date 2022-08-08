import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Navbar from './Navbar';
import History from './History';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>

      <Route path="/" exact element={<Home />} />
      <Route path="/history" exact element={<History />} />
      </Routes>
    </BrowserRouter>

  
    </>
  );
}

export default App;
