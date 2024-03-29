import React, { useContext } from 'react'
import { ContextItem } from '../context/ContextItem';
import { useDispatch } from 'react-redux';
import { addCard } from '../store/cardReducers';
import "./DetailPage.css"

function DetailPage() {

  const dispatch = useDispatch();
  const { detailItem } = useContext(ContextItem);

  const handleCard = (detailItem) => {
    dispatch(addCard(detailItem));
  }

  return (
    <>
      <div className="detaildiv d-xxl-flex d-xl-flex d-lg-flex">
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
          
        <div className="product-detail col-xxl-8 col-xl-7 col-lg-6 col-md-12">
          <p><strong>{detailItem.name}</strong></p>
          <p>Mevcut bedenler : {detailItem.size}</p>
          <p>Fiyat : {detailItem.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ₺</p>
          <button onClick={()=> handleCard(detailItem)}>Sepete Ekle</button>
          <p style={{ marginTop: "15px" }}><u>Ürün Detayları : </u><p style={{ marginTop: "10px" }} >{detailItem.description}</p></p>

        </div>
      </div>
    </>
  )
}

export default DetailPage