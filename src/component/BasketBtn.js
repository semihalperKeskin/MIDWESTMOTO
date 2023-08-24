import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ContextItem } from '../context/ContextItem';

function BasketBtn() {

  const { arrayFromStorage } = useContext(ContextItem);
  

  return (
    <div className="flex items-center text-[#FF9642] hover:text-[#FFDBA4] lg:order-4">
    <Link className="nav-p" to="/sepetim">
      <button
        data-after-text={`${arrayFromStorage}`}
        data-after-type="badge top right"
        type="Button"
        className="btn btn-warning"
      >
        <FontAwesomeIcon icon={faCartShopping} />
        <span style={{ fontSize: "15px", marginLeft: "5px" }}>
          Sepetim
        </span>
      </button>
    </Link>
  </div>
  )
}

export default BasketBtn