import React, { useContext } from 'react';
import { ContextItem } from '../context/ContextItem';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import "./DropdownFilter.css";
import { db } from '../firebase'; // Import from where you have initialized firebase

function DropdownFilter() {
    const { setInfo } = useContext(ContextItem);

    const productsCollection = collection(db, "products");

    const filterMap = (item, type = "asc") => {
        let q;

        if (item !== "" && type !== "") {
            q = query(productsCollection, orderBy(item, type));
        } else {
            q = productsCollection;
        }

        onSnapshot(q, (snapshot) => {
            setInfo(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })));
        });
    };

    return (
        <div className="dropdown col-xxl-1 me-xxl-1">
            <button className="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sıralama
            </button>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" onClick={() => filterMap("")}>Önerilen</a></li>
                <li><a className="dropdown-item" onClick={() => filterMap("name")}>A'dan Z'ye</a></li>
                <li><a className="dropdown-item" onClick={() => filterMap("name", "desc")}>Z'den A'ya</a></li>
                <li><a className="dropdown-item" onClick={() => filterMap("price")}>Fiyata göre artan</a></li>
                <li><a className="dropdown-item" onClick={() => filterMap("price", "desc")}>Fiyata göre azalan</a></li>
            </ul>
        </div>
    );
}

export default DropdownFilter;
