import { dblClick } from '@testing-library/user-event/dist/click';
import React, { useContext, useEffect, useState } from 'react'
import { ContextItem } from '../context/ContextItem';
import db from '../firebase';
import { Link } from "react-router-dom"
import DetailPage from './DetailPage';
import "./index.css"

function Home() {

  const { setIfAdd, info, setInfo, setDetailItem } = useContext(ContextItem);
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (search == "") {
      db.collection("products").orderBy("name").onSnapshot(snapShot => setInfo(snapShot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))))
    }
    else if (search != "") {
      db.collection("products").orderBy("name").where("name", ">=", search.toUpperCase()).where("name", "<=", search.toUpperCase() + "\uf8ff").onSnapshot(snapShot => setInfo(snapShot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))))
    }
  }, [search])

  // window.addEventListener('load', () => {
  //   Fetchdata();
  // });
  // // Fetch the required data using the get() method
  // const Fetchdata = () => {
  //   db.collection("products").get().then((querySnapshot) => {

  //     // Loop through the data and store
  //     // it in array to display
  //     querySnapshot.forEach(element => {
  //       var data = element.data();
  //       setInfo(arr => [...arr, data]);

  //     });
  //   })
  // }


  const findId = (items) => {
    db.collection("products").where("id", "==", items)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setIfAdd(true)
          doc.ref.update({ quantity: doc.data().quantity + 1 })
          console.log("add : ", doc.data());
        });
      })








    //  değişiklikler yapılmadan önce 
    // const findId = (items) => {
    //   db.collection("products").where("id", "==", items)
    //   .get()
    //   .then((querySnapshot) => {
    //       querySnapshot.forEach((doc) => {

    //         console.log(doc.data())
    //         if (doc.data().quantity != 0) {
    //           doc.ref.update({quantity: 1})
    //           console.log("dataa : ",doc.data().quantity)
    //         }
    //         else {
    //           doc.ref.update({quantity: 1})
    //           console.log("dataa : ",doc.data().quantity)
    //           setAddItem(arr => [...arr, doc.data()]);
    //           setIfAdd(true);
    //         }
    //         console.log("add : ",doc.data());
    //       });
    //   })

    // eski yöntem
    // if (itemFind) {
    //   itemFind.quantity += 1;
    // }
    // else {
    //   const addItemFind = info.find(item => item.id === items.id)
    //   console.log("addItemFind : ", addItemFind)
    //   addItemFind.quantity += 1;
    //   setAddItem(arr => [...arr, addItemFind]);
    //   setIfAdd(true);
    // }

    // window.localStorage.setItem("productList", JSON.stringify(addItem));
  }

  //   const itemFind = (e) => {
  //     setSearch(e)
  //     if(e!=''){
  //       (info.filter(item => {
  //         item.name.includes(e) || item.price.includes(e)//same other fields added by following OR  condition
  //     }))
  //     }
  //     else{
  //       setSearch(info)
  //     }

  //     console.log(search)
  //  }

  //  const itemFind = (e) => {
  //   setSearch(e)
  //   if(e !=''){
  //   setInfo(info.filter(data => {
  //      data.name.includes(e)
  //   }))
  //   }
  //   else{
  //      setInfo(info)
  //   }
  // }



  return (
    <>
      <form onSubmit={(e) => setSearch(e.target.value)}>
        <input onChange={(e) => setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
        <button onClick={(e) => { e.preventDefault() }} type="submit">Search</button>
      </form>
      {
        info.map((item, i) => (

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
              <a onClick={() => findId(item.data.id)} className="btn btn-primary" >Sepete ekle</a>
              <Link to={`/product/${item.data.id}`}>
                <a className="btn" onClick={() => setDetailItem(item.data)}>Ürün detayları</a>
              </Link>
            </div>
          </div>
        ))
      }
    </>

  );
}

export default Home;