import React from 'react'
import db from '../firebase';

function AddBasket(item) {
    
    const findId = (items) => {
        db.collection("products").where("id", "==", items.id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.update({ quantity: doc.data().quantity + 1 })
                    console.log("add : ", doc.data());
                });
            })
    }
    return (
        <a onClick={() => findId(item.item)} className="btn btn-warning" >Sepete ekle</a>
    )
}

export default AddBasket