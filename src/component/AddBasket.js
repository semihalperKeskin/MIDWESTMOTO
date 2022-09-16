import React from 'react'
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { ContextItem } from '../context/ContextItem';
import db from '../firebase';

function AddBasket(item, cls) {

    const {basketCount ,setBasketCount} = useContext(ContextItem)

    const findId = (items) => {
        toast.success("Sepete ürün eklendi.")
        db.collection("products").where("name", "==", items.name)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.update({ quantity: doc.data().quantity + 1 })
                });
            })
    }
    return (
        <a onClick={() => findId(item.item)} className="btn btn-warning " >Sepete ekle</a>
    )
}

export default AddBasket