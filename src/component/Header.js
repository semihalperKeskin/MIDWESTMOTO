import { render } from '@testing-library/react';
import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ContextItem } from '../context/ContextItem';
import { loginOut } from '../firebase';
import { logout as logoutHandle } from '../store/auth';
import "./Header.css"


function Header() {

  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate();

  const handleLogout = async() => {
    await loginOut();
    dispatch(logoutHandle())
    navigate("/login")
  }


  return (
    <nav className="navbar navbar-expand-lg">
    <div className="container-fluid container">
    <p className='logo'>Midwest Moto</p>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-1 mb-lg-0">
          <li className="nav-item">
            <Link className=" nav-p" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className=" nav-p" to="/cardekle">Kart ekle</Link>
          </li>
          <li className="nav-item">
            <Link className=" nav-p" to="/sepetim">
            Sepetim
            </Link>
          </li>
        </ul>
        {user && <li className="d-flex nav-item nav-welcome">{user}</li > }
        {user && <li className="d-flex nav-link btn-user" onClick={()=> handleLogout()}>Çıkış yap</li>}
          {!user && <li className="d-flex nav-item">
          <Link className="nav-link btn-user " to="/login">Login</Link>
        </li> }
        {!user && <li className="d-flex nav-item">
          <Link className="nav-link btn-user" to="/register">Register</Link>
        </li> }
      </div>
    </div>
  </nav>
  )
}

export default Header