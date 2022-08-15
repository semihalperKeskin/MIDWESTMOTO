import React, { useState } from 'react'
import db, { storageRef } from '../firebase';
import "./CardAdd.css"

function CardAdd() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [description, setDescription] = useState("");

  console.log(category)
  const onChangeValue = (e) => {
    setCategory(e.target.value)
    
  }

  const sub = (e) => {
    e.preventDefault();

    // Add data to the store
    db.collection("products").add({
      category: category,
      name: name,
      nameToUpper: name.toUpperCase(),
      price: price,
      size: size,
      image1: image1,
      image2: image1,
      image3: image1,
      description: description

    })
      .then((doc) => {
        console.log(name)

      })
      .catch((error) => {
        console.error("not okey: ", error);
      });
      setName("")
      setPrice("")
      setSize("")
      setImage1(null)
      setImage2(null)
      setImage3(null)
      setDescription("")
    }
  return (
    <div>
      <center>
        <form className='card-add' style={{ marginTop: "200px" }}
          onSubmit={(event) => { sub(event) }}>
          <label for="img1"> Resim 1 : </label>
          <input className='input' type="file" id='img1' placeholder="image1"
            onChange={(e) => { setImage1(e.target.files[0]) }} />
          <br />

          <label for="img2"> Resim 2 : </label>
          <input className='input' type="file" id="img2" placeholder="image2"
            onChange={(e) => { setImage2(e.target.files[0]) }} />
          <br />

          <label for="img3"> Resim 3 : </label>
          <input className='input' type="file" id='img3' placeholder="image3"
            onChange={(e) => { setImage3(e.target.files[0]) }} />
          <br />
          <label for="img3"> Katagori : </label>
          <div class="form-check" >
            <input type="radio" name="flexRadioDefault" value="mont" id="flexRadioDefault1" onChange={onChangeValue}  />
            <label class="form-check-label" for="flexRadioDefault1">
              Mont
            </label>
          </div>
          <div class="form-check" >
            <input type="radio" name="flexRadioDefault" value="bot" id="flexRadioDefault2" onChange={onChangeValue} />
            <label class="form-check-label" for="flexRadioDefault2">
              Bot
            </label></div>

          <div class="form-check" >
            <input type="radio" name="flexRadioDefault" value="eldiven" id="flexRadioDefault3" onChange={onChangeValue} />
            <label class="form-check-label" for="flexRadioDefault3">
              Eldiven
            </label>
          </div>
          <br />

          <label for="name"> Ürün adı: </label>
          <input className='input' type="text" id='name' maxLength="55" value={name} placeholder="Ürün adını giriniz. Max: 55"
            onChange={(e) => { setName(e.target.value) }} />
          <br />

          <label for="price"> Ürün fiyatı : </label>
          <input className='input' type="number" step={0.01} id='price' placeholder="Ürün fiyatını giriniz" value={price}
            onChange={(e) => { setPrice(parseFloat(e.target.value)) }} />
          <br />

          <label for="size"> Ürün bedenleri : </label>
          <input className='input' type="text" id='size' placeholder="Ürün bedenlerini giriniz" value={size}
            onChange={(e) => { setSize(e.target.value) }} />
          <br />

          <label for="description"> Ürün açıklaması : </label>
          <input className='input' style={{ resize: "none" }} maxlength="500"  value={description} type="text" rows="10" cols="100" id='description' placeholder="Ürün açıklaması giriniz. Max: 500"
            onChange={(e) => { setDescription(e.target.value) }} />
          <br />

          <button type="submit">Kaydet</button>
        </form>
      </center>
    </div>
  )
}
export default CardAdd