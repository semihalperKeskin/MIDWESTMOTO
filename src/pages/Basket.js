import React, { useContext, useEffect, useState } from 'react'
import { ContextItem } from '../context/ContextItem';
import db from '../firebase';
import "./index.css"

function Basket() {

  const { addItem, setAddItem, ifAdd } = useContext(ContextItem);

  const basketData = db.collection("products");

  let total = 0;
  const totalPrice = () => {
    addItem.forEach(element => {
      total += element.data.quantity * element.data.price
    });
    return total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  useEffect(() => {
    basketData.where("quantity", ">", 0).orderBy("quantity","desc").onSnapshot(snapShot => {
      setAddItem(snapShot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])


  //-----------------------------------------------------

  //   const decrease = (dquantity) => {
  //     if (dquantity === 1) {
  //         return dquantity
  //     }
  //     else {
  //         return dquantity -= 1;
  //     }
  // }

  // const increase = (dquantity) => {
  //   if (dquantity === 10) {
  //     return dquantity
  //   }
  //   else {
  //     return dquantity += 1;
  //   }
  // }

 /// son çalışan kod 

  const increase = (dquantity) => {
    basketData.where("id", "==", dquantity.id)
    .get()
    .then((querySnapshot) => {
      if(dquantity.quantity === 10){
        return dquantity.quantity
      }
      else{
        querySnapshot.forEach((doc) => {
          doc.ref.update({ quantity: doc.data().quantity +1 })
          console.log("decrease : ", doc.data())
        })
      }
    })
  }

      const decrease = (dquantity) => {
        basketData.where("id", "==", dquantity.id)
        .get()
        .then((querySnapshot) => {
          if(dquantity.quantity === 1){
            return dquantity.quantity
          }
          else{
            querySnapshot.forEach((doc) => {
              doc.ref.update({ quantity: doc.data().quantity -1 })
              console.log("decrease : ", doc.data())
            })
          }
        })
      }

      const delItem =(item) => {
        basketData.where("id", "==", item.id)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.update({ quantity: doc.data().quantity = 0 })
          console.log("del : ", doc.data())
        })
    })
      }



  //----------------------------------------------------






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
                <button type="button" onClick={() => decrease(item.data)} className="btn btn-quantity">-</button>
                <button type="button" className="btn btn-light">
                  {
                    item.data.quantity
                  }
                </button>
                <button type="button" onClick={() => increase(item.data)} className="btn btn-quantity">+</button>
                <button onClick={()=> delItem(item.data)}>Delete</button>
                <p>Fiyat : {item.data.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</p>
              </div>
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