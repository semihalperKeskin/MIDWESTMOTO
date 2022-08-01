import React, { useContext, useEffect, useState } from 'react'
import { ContextItem } from '../context/ContextItem';
import db from '../firebase';
import "./index.css"

function Home() {

  const [info, setInfo] = useState([]);
  const { addItem, setAddItem } = useContext(ContextItem);
  const [selectItem, setSelectItem] = useState([]);

  useEffect(() => {
    window.addEventListener('load', () => {
      Fetchdata();
    });
  })


  // Start the fetch operation as soon as
  // the page loads
  window.addEventListener('load', () => {
    Fetchdata();
  });
  console.log(addItem)
  // Fetch the required data using the get() method
  const Fetchdata = () => {
    db.collection("products").get().then((querySnapshot) => {

      // Loop through the data and store
      // it in array to display
      querySnapshot.forEach(element => {
        var data = element.data();
        setInfo(arr => [...arr, data]);

      });
    })
  }
  const findId = (items) => {
    console.log(items)

      for(let i = 0; i < info.length; i++){
        if(i === items)
        {
          setAddItem(arr => [...arr, info[i-1]]);
        }
      }
      console.log(addItem)
  }

 

  // Display the result on the page
  return (
    <>
      {
        info.map((data, i) => (

          <div className="card col-2" key={i}>
            <div id={`carouselExampleIndicators${i}`} className="carousel slide" data-bs-ride="true">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" ><img src={data.image1} className="d-block w-100" alt="..." /></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" >
                  <img src={data.image2} className="d-block w-100" alt="..." />
                </button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" >
                  <img src={data.image3} className="d-block w-100" alt="..." />
                </button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={data.image1} className="d-block w-100 " alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={data.image2} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={data.image3} className="d-block w-100" alt="..." />
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
              <h5 className="card-title">{data.name}</h5>
              <a onClick={() => findId(data.id)} className="btn btn-primary">Sepete ekle</a>
            </div>
          </div>

        ))
      }
    </>

  );
}

export default Home;