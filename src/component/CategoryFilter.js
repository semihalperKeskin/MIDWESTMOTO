import React, { useContext } from 'react'
import { ContextItem } from '../context/ContextItem';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import "./CategoryFilter.css"

function CategoryFilter() {
    const { setInfo } = useContext(ContextItem);

    const productsCollection = collection(db, "products");

    const filterData = (filter) => {
        let q;

        if (filter === "all") {
            q = query(productsCollection);
        } else {
            q = query(productsCollection, where("category", "==", filter));
        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setInfo(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })));
        });

        // You can return the unsubscribe function if you need to cleanup the listener
        return () => unsubscribe();
    };

    return (
        <ul className='categoryList col-xxl-10 col-xl-10 col-lg-10 col-md-9'>
            <li><a onClick={() => filterData("all")}> Tümü </a></li>
            <li><a onClick={() => filterData("mont")}> Montlar </a></li>
            <li><a onClick={() => filterData("eldiven")}> Eldivenler </a></li>
            <li><a onClick={() => filterData("bot")}> Botlar </a></li>
        </ul>
    )
}

export default CategoryFilter;
