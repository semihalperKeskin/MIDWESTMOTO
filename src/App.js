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
import Header from './component/Header';
import { Toaster } from 'react-hot-toast';
import Error from './pages/Error';

function App() {


  const [addItem, setAddItem] = useState([]);
  const [ifAdd, setIfAdd] = useState(false);
  const [info, setInfo] = useState([]);
  const [detailItem, setDetailItem] = useState([]);
  const [loginControl, setLoginControl] = useState(false);
  const [basketCount, setBasketCount] = useState(0);


  var userCheck = localStorage.getItem("user")

  const productItem = {
    ifAdd,
    setIfAdd,
    addItem,
    setAddItem,
    info,
    setInfo,
    detailItem,
    setDetailItem,
    loginControl,
    setLoginControl,
    basketCount, 
    setBasketCount

  }
  return (
    <ContextItem.Provider value={productItem}>
      <Toaster position='top-right'/>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/product/:id' element={<DetailPage />} />
          {userCheck === '"mail@mail.com"' && <Route path='/cardekle' element={<CardAdd />} />}
          <Route path='/sepetim' element={<Basket />} />
          <Route path='*' element={<Error/>}/>
        </Routes>
      </div>
    </ContextItem.Provider>
  );
}

export default App;
