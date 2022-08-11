import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';
import Home from "./pages/Home"
import './App.css';
import Basket from './pages/Basket';
import CardAdd from './pages/CardAdd';
import { ContextItem } from './context/ContextItem';
import DetailPage from './pages/DetailPage';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {

 
  const [addItem, setAddItem] = useState([]);
  const [ifAdd, setIfAdd] = useState(false);
  const [info, setInfo] = useState([]);
  const [detailItem, setDetailItem] = useState([]);


  const productItem = {
    ifAdd,
    setIfAdd,
    addItem,
    setAddItem,
    info,
    setInfo,
    detailItem,
    setDetailItem
  }
  return (
    <ContextItem.Provider value={productItem}>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid container">
            Navbar
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cardekle">Kart ekle</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sepetim">
                  sepetim
                  </Link>
                </li>
              </ul>
              <li className="d-flex nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="d-flex nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </div>
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/product/:id' element={<DetailPage />} />
            <Route path='/cardekle' element={<CardAdd />} />
            <Route path='/sepetim' element={<Basket />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ContextItem.Provider>
  );
}

export default App;
