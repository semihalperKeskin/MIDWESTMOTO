import React, { useContext, useEffect } from "react";
import { ContextItem } from "../context/ContextItem";
import { Carousel } from "flowbite-react";
import CategoryFilter from "../component/CategoryFilter";
import DropdownFilter from "../component/DropdownFilter";
import { useDispatch } from "react-redux";
import { addCard } from "../store/cardReducers";
import { Link } from "react-router-dom";
import {
  collection,
  endAt,
  onSnapshot,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-hot-toast";

function Home() {
  const dispatch = useDispatch();

  const { itemList ,setItemList} = useContext(ContextItem);

  
  const { searchTerm } = useContext(ContextItem);
  const { setArrayFromStorage } = useContext(ContextItem);

  const q = collection(db, "products");

  useEffect(() => {
    if (searchTerm.length > 0) {
      const q = query(
        collection(db, "products"),
        orderBy("nameToUpper"),
        startAt(searchTerm.toUpperCase()),
        endAt(searchTerm.toUpperCase() + "\uf8ff")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setItemList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: {
              ...doc.data(),
              id: doc.id,
            },
          }))
        );
      });

      return unsubscribe;
    } else {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setItemList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      return () => unsubscribe();
    }
  }, [searchTerm]);

  const handleCard = (item) => {
    dispatch(addCard({id: item.id, data: item}));
    setArrayFromStorage(JSON.parse(localStorage.getItem("basketItems")).length);
    toast.success("Ürün sepete eklendi");
  };

  console.log(process.env.REACT_APP_API_KEY);

  return (
    <>
      <CategoryFilter />
      <DropdownFilter />

      <div className="justify-between grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-5 2xl:grid-cols-10">
        {itemList.map((item, i) => (
          <div className=" m-5 w-92 sm:grid-cols-1 sm:flex sm:justify-center sm:align-middle md:block md:grid-cols-1 lg:col-span-2 xl:col-span-1 2xl:col-span-2 bg-white" key={i}>
            <div
              className=" max-w-sm h-[600px] relative border border-gray-200 rounded-lg shadow
           dark:bg-gray-800 dark:border-gray-700"
            >
              <Carousel className="h-80 p-3" slide={false}>
                <img src={`${item.data.image1}`} alt="..." />
                <img src={`${item.data.image2}`} alt="..." />
                <img src={`${item.data.image3}`} alt="..." />
              </Carousel>

              <div className="px-5 pb-5">
              <Link
                    onClick={() => handleCard(item.data)}
                    to={`/product/${item.data.id}`}
                  >
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {item.data.name}
                  </h5>
                </Link>
                <div className="flex items-center mt-2.5 mb-5">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>First star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Second star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Third star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Fourth star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>Fifth star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                    5.0
                  </span>
                </div>
                <p className="text-muted absolute bottom-24 font-medium">{item.data.price} TL</p>
              </div>

              <div className="card-body absolute bottom-8 w-full px-6">
                  <button
                    className="addbasket bg-[#FF9642] w-full px-2 py-3 rounded-md text-white font-semibold"
                    onClick={() => handleCard(item)}
                  >Sepete Ekle
                  </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
