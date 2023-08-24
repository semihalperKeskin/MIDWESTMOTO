import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginOut } from "../firebase";
import { logout as logoutHandle } from "../store/auth";
import "./Header.css";
import BasketBtn from "./BasketBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faMagnifyingGlass,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

function Header({ setSearchTerm }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await loginOut();
    dispatch(logoutHandle());
    navigate("/login");
  };

  var userCheck = localStorage.getItem("user");

  return (
    <header>
      <nav className="bg-[#222222] border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className=" lg:order-1">
            <Link className="text-[#FF9642] hover:text-[#FFDBA4] flex" to={"/"}>
            <img src="https://cdn0.iconfinder.com/data/icons/transportation-methods/128/motorcycle_orange-512.png" className="h-12 mr-3 rounded-full" alt="..." />
            </Link>
          </div>
          <div className="flex items-center lg:order-2 bg-white px-3 py-1 rounded-xl">
            <input
              className="form-control outline-0 rounded-3xl border-0 focus:ring-0 "
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Ara..."
              required
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="col-xxl-0" />
          </div>
          <BasketBtn />
          {userCheck === '"mail@mail.com"' ? (
            <div className="lg:order-5 flex">
            <div className="nav-link  px-[15px] py-[6px] mr-2 bg-[#FF9642] text-white  rounded-[5px]">
              <Link className=" nav-p " to="/cardekle">
                <FontAwesomeIcon icon={faCirclePlus} />
              </Link>
            </div>
            <div className="nav-link  px-[15px] py-[6px] mr-2 bg-[#FF9642] text-white  rounded-[5px]">
              <button onClick={()=> handleLogout()}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </div>
            </div>
          ) : (
          <div className="flex items-center lg:order-5">
            <Link
              className="nav-link  px-[15px] py-[6px] mr-2 bg-[#FF9642] text-white  rounded-[5px] "
              to="/login"
            >
              Login
            </Link>
            <Link
              className="nav-link  px-[15px] py-[6px] bg-[#FF9642] text-white  rounded-[5px]"
              to="/register"
            >
              Register
            </Link>
          </div>
          )}
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          ></div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
