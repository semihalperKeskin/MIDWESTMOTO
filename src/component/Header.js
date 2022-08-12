import { render } from '@testing-library/react';
import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ContextItem } from '../context/ContextItem';
import { loginOut } from '../firebase';
import { logout as logoutHandle } from '../store/auth';


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
        {user && <li className="d-flex nav-item">Hoşgeldiniz</li > }
        {user && <li className="d-flex nav-item"><button onClick={()=> handleLogout()}>Çıkış yap.</button></li>}
          {!user && <li className="d-flex nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li> }
        {!user && <li className="d-flex nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li> }
      </div>
    </div>
  </nav>
  )
}

export default Header