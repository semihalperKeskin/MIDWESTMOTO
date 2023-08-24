import React, { useContext } from "react";
import { ContextItem } from "../context/ContextItem";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

function CategoryFilter() {
  const { setItemList } = useContext(ContextItem);

  const productsCollection = collection(db, "products");

  const filterData = (filter) => {
    let q;

    if (filter === "all") {
      q = query(productsCollection);
    } else {
      q = query(productsCollection, where("category", "==", filter));
    }
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setItemList(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  };

  return (
    <ul className="flex flex-row justify-center mt-14 list-none col-xxl-10 col-xl-10 col-lg-10 col-md-9">
      <li className="mr-5 border-[#ffdba4] border-2 bg-[#ffdba4] px-2 py-1 rounded-md text-center hover:shadow-lg hover:rounded-lg hover:cursor-pointer">
        <a onClick={() => filterData("all")}> Tümü </a>
      </li>
      <li className="mr-5 border-[#ffdba4] border-2 bg-[#ffdba4] px-2 py-1 rounded-md text-center hover:shadow-lg hover:rounded-lg hover:cursor-pointer">
        <a onClick={() => filterData("mont")}> Montlar </a>
      </li>
      <li className="mr-5 border-[#ffdba4] border-2 bg-[#ffdba4] px-2 py-1 rounded-md text-center hover:shadow-lg hover:rounded-lg hover:cursor-pointer">
        <a onClick={() => filterData("eldiven")}> Eldivenler </a>
      </li>
      <li className="mr-5 border-[#ffdba4] border-2 bg-[#ffdba4] px-2 py-1 rounded-md text-center hover:shadow-lg hover:rounded-lg hover:cursor-pointer">
        <a onClick={() => filterData("bot")}> Botlar </a>
      </li>
    </ul>
  );
}

export default CategoryFilter;
