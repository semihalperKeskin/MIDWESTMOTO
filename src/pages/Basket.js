import React, { useContext, useEffect, useState } from 'react'
import ButtonGroup from '../component/button-group';
import { ContextItem } from '../context/ContextItem';
import db from '../firebase';
import "./index.css"


window.localStorage.getItem("productList");

function Basket() {

  const { addItem, setAddItem, ifAdd,info,setInfo } = useContext(ContextItem);

  useEffect(()=> {
    db.collection("products").where("quantity", ">", 0).onSnapshot(snapShot =>
      {setAddItem(snapShot.docs.map (doc => ({
      id: doc.id,
      data: doc.data()
    })))})
  },[])
  


  

 let total = 0;
 const totalPrice = () => {
   addItem.forEach(element => {
     total += element.data.quantity * element.data.price
   });
   return total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }
   
  const renderData = () => {
    return (
      <>{
      addItem.map((item, i) => (
        <div className="card col-2" key={i}>
          <div id={`carouselExampleIndicators${i}`} className="carousel slide" data-bs-ride="true">
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
            <ButtonGroup data={item.data} />
          </div>
        </div>
      ))}
      <div>Toplam tutar : {totalPrice()} ₺</div>
    </>
    )

  }
   


  return (
    <>
      {
        
        ifAdd ?
          renderData() : <div>Henüz ürün eklenmedi.</div>
      }
    </>
  )
}

export default Basket