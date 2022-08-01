import React, { useState } from 'react'
import db from '../firebase';
import "./index.css"

function CardAdd() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [description, setDescription] = useState("");

  db.collection("products").onSnapshot((doc) => {
    console.log("Current data: ", doc.data());
  });


  const sub = (e) => {
    e.preventDefault();

    // Add data to the store
    db.collection("products").add({
      name: name,
      price: price,
      size, size,
      image1: image1,
      image2: image2,
      image3: image3,
      description: description

    })
      .then((doc) => {
        console.log(name)

      })
      .catch((error) => {
        console.error("not okey: ", error);
      });
  }
  return (
    <div>
      <center>
        <form style={{ marginTop: "200px" }}
          onSubmit={(event) => { sub(event) }}>
          <input type="text" placeholder="Name"
            onChange={(e) => { setName(e.target.value) }} />

          <input type="text" placeholder="price"
            onChange={(e) => { setPrice(e.target.value) }} />

          <input type="text" placeholder="size"
            onChange={(e) => { setSize(e.target.value) }} />

          <input type="text" placeholder="image1"
            onChange={(e) => { setImage1(e.target.value) }} />

          <input type="text" placeholder="image2"
            onChange={(e) => { setImage2(e.target.value) }} />

          <input type="text" placeholder="image3"
            onChange={(e) => { setImage3(e.target.value) }} />

          <input type="text" placeholder="description"
            onChange={(e) => { setDescription(e.target.value) }} />

          <br /><br />

          <button type="submit">Kaydet</button>
        </form>
      </center>
    </div>
  )
}
export default CardAdd