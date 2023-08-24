import React, { useContext } from "react";
import { ContextItem } from "../context/ContextItem";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase"; // Import from where you have initialized firebase

function DropdownFilter() {
  const { setItemList } = useContext(ContextItem);

  const productsCollection = collection(db, "products");

  const filterMap = (item, type = "asc") => {
    let q;

    if (item !== "") {
      q = query(productsCollection, orderBy(item, type));
    } else {
      q = productsCollection;
    }

    onSnapshot(q, (snapshot) => {
      setItemList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  };

  return (
    <div className="justify-center grid grid-cols-1">
      <div className="dropdown text-center col-end-7 col-span-2 ">
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          className="text-white w-100 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Filtrele
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        <div
          id="dropdown"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <a
                onClick={() => filterMap("")}
                className="dropdown-item cursor-pointer	block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Önerilen
              </a>
            </li>
            <li>
              <a
                onClick={() => filterMap("name")}
                className="dropdown-item cursor-pointer	block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                A'dan Z'ye
              </a>
            </li>
            <li>
              <a
                onClick={() => filterMap("name","desc")}
                className="dropdown-item cursor-pointer	block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Z'den A'ya
              </a>
            </li>
            <li>
              <a
                onClick={() => filterMap("price")}
                className="dropdown-item cursor-pointer	block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Fiyata göre artan
              </a>
            </li>
            <li>
              <a
                onClick={() => filterMap("price", "desc")}
                className="dropdown-item cursor-pointer	block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Fiyata göre azalan
              </a>
            </li>
          </ul>
        </div>

        {/* <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sıralama
            </button>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" onClick={() => filterMap("")}>Önerilen</a></li>
                <li><a className="dropdown-item" onClick={() => filterMap("name")}>A'dan Z'ye</a></li>
                <li><a className="dropdown-item" onClick={() => filterMap("name", "desc")}>Z'den A'ya</a></li>
                <li><a className="dropdown-item" onClick={() => filterMap("price")}>Fiyata göre artan</a></li>
                <li><a className="dropdown-item" onClick={() => filterMap("price", "desc")}>Fiyata göre azalan</a></li>
            </ul> */}
      </div>
    </div>
  );
}

export default DropdownFilter;
