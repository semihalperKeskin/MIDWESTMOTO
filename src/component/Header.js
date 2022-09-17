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

  const handleLogout = async () => {
    await loginOut();
    dispatch(logoutHandle())
    navigate("/login")
  }

  var userCheck = localStorage.getItem("user")


  return (
    <nav className="navbar navbar-expand">
      <div className="container">
        <ul className="navbar-nav col-xxl-10 col-xl-10 col-lg-10 col-md-8 col-sm-8">
          <li className='px-3 fs-5 col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-9'>
            <Link className='logo' to={"/"}>Midwest Moto</Link>
          </li>
          {userCheck === '"mail@mail.com"' && <li className="nav-item">
            <Link className=" nav-p " to="/cardekle">
              <i class="fa-solid fa-circle-plus"></i>
            </Link>
          </li>}
          <li className="nav-item ">
            <Link className=" nav-p" to="/sepetim">
              <i class="fa-solid fa-basket-shopping"></i>
            </Link>
          </li>
        </ul>
        {user && <ul className='navbar-nav col-xxl-2 col-md-3 col-sm-4'><li className="d-flex nav-item nav-welcome ">{user}</li>
          <li className="d-flex btn btn-danger px-4 py-1" onClick={() => handleLogout()}><i class="fa-solid fa-right-from-bracket "></i></li>
        </ul>}
        {!user && <ul><li className="d-flex nav-item">
          <Link className="nav-link btn-user  px-3 py-2 " to="/login">Login</Link>
        </li>
          <li className="d-flex nav-item">
            <Link className="nav-link btn-user px-3 py-2" to="/register">Register</Link>
          </li>
        </ul>}
      </div>
    </nav>
  )
}

export default Header