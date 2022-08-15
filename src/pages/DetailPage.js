import React, { useContext, useEffect } from 'react'
import AddBasket from '../component/AddBasket';
import { ContextItem } from '../context/ContextItem';
import "./DetailPage.css"

function DetailPage() {

  const { detailItem } = useContext(ContextItem);


  return (
    <>
      <div className="detaildiv">
        <div id="carouselExampleIndicators" className="carousel carousel-detail slide" data-bs-ride="true">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" ><img src={detailItem.image1} className="d-block w-100" alt="..." /></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" >
              <img src={detailItem.image2} className="d-block w-100" alt="..." />
            </button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" >
              <img src={detailItem.image3} className="d-block w-100" alt="..." />
            </button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={detailItem.image1} className="d-block w-100 " alt="..." />
            </div>
            <div className="carousel-item">
              <img src={detailItem.image2} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={detailItem.image3} className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="#carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="product-detail">
          <p><strong>{detailItem.name}</strong></p>
          <p>Mevcut bedenler : {detailItem.size}</p>
          <p>Fiyat : {detailItem.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ₺</p>
          <AddBasket item={detailItem}/>
          <p style={{marginTop: "15px"}}><u>Ürün Detayları : </u><p style={{marginTop: "10px"}} >{detailItem.description}</p></p>
          
        </div>
        </div>
  </>
  )
}

export default DetailPage