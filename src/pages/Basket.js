import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeCard } from "../store/cardReducers";
import "./Basket.css";
import { Carousel } from "flowbite-react";
import { ContextItem } from "../context/ContextItem";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Basket() {
  const [basketItems, setBasketItems] = useState([]);
  const dispatch = useDispatch();
  const { arrayFromStorage } = useContext(ContextItem);
  const { setArrayFromStorage } = useContext(ContextItem);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("basketItems"))
      ? JSON.parse(localStorage.getItem("basketItems"))
      : [];
    setBasketItems(storedItems);
  }, []);

  const localItems = () => {
    const storedItems = JSON.parse(localStorage.getItem("basketItems"))
      ? JSON.parse(localStorage.getItem("basketItems"))
      : [];
    setBasketItems(storedItems);
  };

  let total = 0;
  const totalPrice = () => {
    basketItems.forEach((element) => {
      total += element.data.quantity * element.data.data.price;
    });
    return total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const removeItem = (item) => {
    dispatch(removeCard(item.data));
    const updatedBasketItems = basketItems.filter(
      (basketItem) => basketItem.id !== item.id
    );
    
    setBasketItems(updatedBasketItems);
    setArrayFromStorage(arrayFromStorage - 1);
    toast.success("Ürün sepetten kaldırıldı.");
  };

  const increaseCard = (item) => {
    const updatedBasketItems = basketItems.map((card) => {
      if (card.id === item.id) {
        return {
          ...card,
          data: {
            ...card.data,
            quantity: card.data.quantity + 1,
          },
        };
      }
      return card;
    });

    localStorage.setItem("basketItems", JSON.stringify(updatedBasketItems));
    localItems();
  };

  const decreaseCard = (item) => {
    const updatedBasketItems = basketItems.map((card) => {
      if ((card.id === item.id) & (card.data.quantity > 1)) {
        return {
          ...card,
          data: {
            ...card.data,
            quantity: card.data.quantity - 1,
          },
        };
      }
      return card;
    });

    localStorage.setItem("basketItems", JSON.stringify(updatedBasketItems));
    localItems();
  };

  return (
    <>
      <div className="justify-between grid grid-cols-12">
        {basketItems.length > 0 ? (
          basketItems.map((item, i) => (
            <div className="m-5 w-92 col-span-2 bg-white" key={i}>
              <div
                className=" max-w-sm h-[600px] mb-5 relative bg-white border border-gray-200 rounded-lg shadow
           dark:bg-gray-800 dark:border-gray-700"
              >
                <Carousel className="h-80" slide={false}>
                  <img src={`${item.data.data.image1}`} alt="..." />
                  <img src={`${item.data.data.image2}`} alt="..." />
                  <img src={`${item.data.data.image3}`} alt="..." />
                </Carousel>

                <div className="px-5 pb-5">
                  <p className="flex justify-end">{item.data.data.price} TL</p>
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {item.data.data.name}
                    </h5>
                  </a>
                </div>
                <div className="card-body absolute grid grid-cols-12 bottom-1 px-6">
                  <div className="flex mb-2 col-span-10 me-3" role="group">
                    <button
                      type="button"
                      onClick={() => decreaseCard(item)}
                      className="px-4 py-2 text-sm w-full font-medium text-gray-900 bg-transparent border border-gray-900 rounded-l-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                    >
                      -
                    </button>
                    <div className="px-4 py-2 text-center text-sm w-full font-semibold text-gray-900 bg-transparent border-t border-b border-gray-900">
                      {item.data.quantity}
                    </div>
                    <button
                      type="button"
                      onClick={() => increaseCard(item)}
                      className="px-4 py-2 text-sm font-medium w-full text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="col-span-2 text-center justify-center flex text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => removeItem(item.data)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-12 text-2xl h-[500px] flex justify-center items-center">
            Henüz ürün eklemediniz.
          </div>
        )}
      </div>
      <br />
      <p className="total">
        Toplam tutar : <strong>{totalPrice()} ₺</strong>
      </p>
    </>
  );
}

export default Basket;
