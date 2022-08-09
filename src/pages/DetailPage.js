import React, { useContext } from 'react'
import { ContextItem } from '../context/ContextItem';

function DetailPage() {
  const { detailItem } = useContext(ContextItem);
  console.log("detailItem : ",detailItem)
  return (
    <>
      <div className="card col-2">
        <div id={`carouselExampleIndicators`} className="carousel slide" data-bs-ride="true">
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
          <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleIndicators`} data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleIndicators`} data-bs-slide="next">
            <span className="#carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="card-body">
          <h5 className="card-title">{detailItem.name}</h5>
        </div>
      </div>
  </>
  )
}

export default DetailPage