import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import Home from "./pages/Home"
import './App.css';
import Basket from './pages/Basket';
import CardAdd from './pages/CardAdd';
import { ContextItem } from './context/ContextItem';
import DetailPage from './pages/DetailPage';

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
      <div>
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container-fluid">
            <strong>E-Commerce</strong>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/cardekle">Kart ekle</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/sepetim">Sepetim</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/product/:id' element={<DetailPage />} />
            <Route path='/cardekle' element={<CardAdd />} />
            <Route path='/sepetim' element={<Basket />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    </ContextItem.Provider>
  );
}

export default App;
