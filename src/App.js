import React, { useEffect, useState } from "react";
import "flowbite";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./component/Footer";
import "./App.css";
import Basket from "./pages/Basket";
import CardAdd from "./pages/CardAdd";
import { ContextItem } from "./context/ContextItem";
import DetailPage from "./pages/DetailPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./component/Header";
import { Toaster } from "react-hot-toast";
import Error from "./pages/Error";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemList, setItemList] = useState([]);
  const [arrayFromStorage, setArrayFromStorage] = useState(0);

  var userCheck = localStorage.getItem("user");

  useEffect(() => {
    const lengFromStorage = JSON.parse(localStorage.getItem("basketItems")) || [];
    setArrayFromStorage(lengFromStorage.length);
  }, []);

  const productItem = {
    arrayFromStorage,
    setArrayFromStorage,
    searchTerm,
    setSearchTerm,
    itemList,
    setItemList
  };
  return (
    <ContextItem.Provider value={productItem}>
      <Toaster position="top-right" />
      <Header setSearchTerm={setSearchTerm} />
      <div className="flex flex-col">
      <div className="grid flex-1 mb-64">
        <div className="mx-24">
          <Routes>
            <Route
              path="/"
              element={
                <Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<DetailPage />} />
            {userCheck === '"mail@mail.com"' && (
              <Route path="/cardekle" element={<CardAdd />} />
            )}
            <Route path="/sepetim" element={<Basket />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
      <Footer/>
      </div>
    </ContextItem.Provider>
  );
}

export default App;
