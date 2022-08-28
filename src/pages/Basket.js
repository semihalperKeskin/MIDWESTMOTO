import React, { useContext, useEffect, useState } from 'react'
import { ContextItem } from '../context/ContextItem';
import db from '../firebase';
import "./Basket.css"



function Basket() {


  const { addItem, setAddItem } = useContext(ContextItem);

  const basketData = db.collection("products");

  let total = 0;
  const totalPrice = () => {
    addItem.forEach(element => {
      total += element.data.quantity * element.data.price
    });
    return total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }


  useEffect(() => {
    basketData.where("quantity", ">", 0).orderBy("quantity", "desc").onSnapshot(snapShot => {
      setAddItem(snapShot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])

  const increase = (dquantity) => {
    basketData.where("name", "==", dquantity.name)
      .get()
      .then((querySnapshot) => {
        if (dquantity.quantity === 10) {
          return dquantity.quantity
        }
        else {
          querySnapshot.forEach((doc) => {
            doc.ref.update({ quantity: doc.data().quantity + 1 })
          })
        }
      })
  }

  const decrease = (dquantity) => {
    basketData.where("name", "==", dquantity.name)
      .get()
      .then((querySnapshot) => {
        if (dquantity.quantity === 1) {
          return dquantity.quantity
        }
        else {
          querySnapshot.forEach((doc) => {
            doc.ref.update({ quantity: doc.data().quantity - 1 })
          })
        }
      })
  }

  const delItem = (item) => {
    basketData.where("name", "==", item.name)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({ quantity: doc.data().quantity = 0 })
        })
      })
  }

  const renderData = () => {
    return (
      <>
        <span>Ürünler sepete miktarına göre sıralanmıştır.</span>
        <br />
        {
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
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" onClick={() => decrease(item.data)} className="btn btn-decrease btn-info">-</button>
                  <button type="button" className="btn btn-quantity">
                    {
                      item.data.quantity
                    }
                  </button>
                  <button type="button" onClick={() => increase(item.data)} className="btn btn-increase  btn-success">+</button>
                </div>
                <button type='button' className='btn btn-danger btn-delete' onClick={() => delItem(item.data)}><i className="fa-solid fa-trash-can"></i></button>
                <p>Fiyat : {item.data.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ₺</p>
              </div>
            </div>
          ))}
        <br />
        <p className='total'>Toplam tutar : <strong>{totalPrice()} ₺</strong></p>
      </>
    )

  }

  return (
    <>
      {

        addItem != 0 ?
          renderData() : <center className='null-page'>Henüz ürün eklemediniz.</center>
      }
    </>
  )
}

export default Basket