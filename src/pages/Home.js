import React, { useContext, useEffect, useState } from "react";
import { ContextItem } from "../context/ContextItem";
import {db} from "../firebase";
import { collection, query, onSnapshot, orderBy, startAt, endAt } from 'firebase/firestore';
import { Link } from "react-router-dom";
import "./Home.css";
import CategoryFilter from "../component/CategoryFilter";
import DropdownFilter from "../component/DropdownFilter";
import { useDispatch } from "react-redux";
import { addCard } from "../store/cardReducers";

function Home() {
  const dispatch = useDispatch();

  const handleCard = (item) => {
    dispatch(addCard(item));
  };

  const { info, setInfo, setDetailItem } = useContext(ContextItem);
  const [search, setSearch] = useState("");

  
  useEffect(() => {

    const productsCollection = collection(db, "products");

    let unsubscribe;

    if (search.length === 0) {
      unsubscribe = onSnapshot(productsCollection, (snapshot) => {
        setInfo(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: {
            ...doc.data(),
            id: doc.id,
          },
        })));
      });
    } else if (search.length > 0) {
      const q = query(
        productsCollection,
        orderBy('nameToUpper'),
        startAt(search.toUpperCase()),
        endAt(search.toUpperCase() + '\uf8ff')
      );

      unsubscribe = onSnapshot(q, (snapshot) => {
        setInfo(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: {
            ...doc.data(),
            id: doc.id,
          },
        })));
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [search]);


  const userCheck = localStorage.getItem("user");

  return (
    <>
      <center>
        <form className="search-box col-xxl-5 col-xl-5 col-lg-6 col-md-11 col-sm-11 col-xs-11">
          <input
            className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10"
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Ürün Ara"
            aria-label="Search"
          />
          <i className="fa-solid fa-magnifying-glass col-xxl-0"></i>
        </form>
      </center>

      <CategoryFilter />
      <DropdownFilter />
      {info.map((item, i) => (
        <div
          className="card col-xxl-2 col-xl-2 col-lg-2 col-md-5 col-sm-5 col-xs-"
          key={i}
        >
          <div
            id={`carouselExampleIndicators${i}`}
            className="carousel carousel-home slide"
            data-bs-ride="true"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
              >
                <img
                  src={item.data.image1}
                  className="d-block w-100"
                  alt="..."
                />
              </button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
              >
                <img
                  src={item.data.image2}
                  className="d-block w-100"
                  alt="..."
                />
              </button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
              >
                <img
                  src={item.data.image3}
                  className="d-block w-100"
                  alt="..."
                />
              </button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={item.data.image1}
                  className="d-block w-100 "
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src={item.data.image2}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src={item.data.image3}
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target={`#carouselExampleIndicators${i}`}
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target={`#carouselExampleIndicators${i}`}
              data-bs-slide="next"
            >
              <span
                className="#carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          <div className="card-body">
            <h5 className="card-title">{item.data.name}</h5>
              <div className="addbasket w-100">
                <button
                  className="btn btn-success w-100"
                  onClick={() => handleCard(item.data)}
                >
                  Add to Card
                </button>
              </div>
            <Link
              className="btn btn-detail mt-2"
              onClick={() => setDetailItem(item.data)}
              to={`/product/${item.data.id}`}
            >
              Ürün detayları
            </Link>
            <p className="text-muted">
              Fiyat :{" "}
              {item.data.price
                .toFixed(2)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
              ₺
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Home;
