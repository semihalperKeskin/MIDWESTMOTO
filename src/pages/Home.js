import React, { useContext, useEffect, useState } from 'react'
import { ContextItem } from '../context/ContextItem';
import db from '../firebase';
import { Link } from "react-router-dom"
import "./Home.css"
import CategoryFilter from '../component/CategoryFilter';
import DropdownFilter from '../component/DropdownFilter';
import AddBasket from '../component/AddBasket';

function Home() {

  const { info, setInfo, setDetailItem } = useContext(ContextItem);
  const [search, setSearch] = useState("")

  const fetchData = db.collection("products");

  useEffect(() => {
    if (search.length == 0) {
      fetchData.onSnapshot(snapShot => setInfo(snapShot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))))
    }
    else if (search.length > 0) {
      fetchData.where("nameToUpper", ">=", search.toUpperCase()).where("nameToUpper", "<=", search.toUpperCase() + "\uf8ff").onSnapshot(snapShot => setInfo(snapShot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))))
    }
  }, [search])


  return (
    <>
      <center>
        <form className='search-box'>
          <input onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Ürün Ara" aria-label="Search" />
          <i class="fa-solid fa-magnifying-glass"></i>
        </form>
      </center>
      <CategoryFilter />
      <DropdownFilter />
      {
        info.map((item, i) => (
          <>
            <div className="card col-2" key={i}>
              <div id={`carouselExampleIndicators${i}`} className="carousel carousel-home slide" data-bs-ride="true">
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" ><img src={item.data.image1} className="d-block w-100" alt="..." /></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" >
                    <img src={item.data.image2} className="d-block w-100" alt="..." />
                  </button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" >
                    <img src={item.data.image3} className="d-block w-100" alt="..." />
                  </button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={item.data.image1} className="d-block w-100 " alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src={item.data.image2} className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src={item.data.image3} className="d-block w-100" alt="..." />
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleIndicators${i}`} data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleIndicators${i}`} data-bs-slide="next">
                  <span className="#carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div className="card-body">
                <h5 className="card-title">{item.data.name}</h5>
                <AddBasket item={item.data} />
                <Link className="btn btn-detail" onClick={() => setDetailItem(item.data)} to={`/product/${item.data.id}`}>
                  Ürün detayları
                </Link>
                <p className='text-muted'>Fiyat : {item.data.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ₺</p>
              </div>
            </div>
          </>
        ))
      }
    </>

  );
}

export default Home;