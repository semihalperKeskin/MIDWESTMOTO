import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeCard } from '../store/cardReducers';
import './Basket.css';

function Basket() {
  const [basketItems, setBasketItems] = useState([]);
  const dispatch = useDispatch();

  

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('basketItems'));
    setBasketItems(storedItems);
  }, []);

  const removeItem = (removeItem) => {
    dispatch(removeCard(removeItem));
    
    const updatedItems = basketItems.filter(item => item.id !== removeItem.id);

    localStorage.setItem('basketItems', JSON.stringify(updatedItems));

    setBasketItems(updatedItems);
  };

  const increaseBasketItem = (increaseItem) => {

    const updatedItems = basketItems.map(item => {
      if (item.id === increaseItem.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
  
    setBasketItems(updatedItems);
  };

  const decreaseBasketItem = (decreaseItem) => {
    const updatedItems = basketItems.map(item => {
      if (item.id === decreaseItem.id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
  
    setBasketItems(updatedItems);
  };

  let total = 0;
  const totalPrice = () => {
    basketItems.forEach(element => {
      total += element.quantity * element.price
    });
    return total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

    return (
      <>
        {basketItems.length > 0 ? (
          basketItems.map((item, i) => (
            <div className='card col-2' key={i}>
              <div id={`carouselExampleIndicators${i}`} className='carousel slide' data-bs-ride='true'>
                <div className='carousel-indicators'>
                  <button type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='0' className='active' aria-current='true'>
                    <img src={item.image1} className='d-block w-100' alt='...' />
                  </button>
                  <button type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='1'>
                    <img src={item.image2} className='d-block w-100' alt='...' />
                  </button>
                  <button type='button' data-bs-target='#carouselExampleIndicators' data-bs-slide-to='2'>
                    <img src={item.image3} className='d-block w-100' alt='...' />
                  </button>
                </div>
                <div className='carousel-inner'>
                  <div className='carousel-item active'>
                    <img src={item.image1} className='d-block w-100' alt='...' />
                  </div>
                  <div className='carousel-item'>
                    <img src={item.image2} className='d-block w-100' alt='...' />
                  </div>
                  <div className='carousel-item'>
                    <img src={item.image3} className='d-block w-100' alt='...' />
                  </div>
                </div>
                <button className='carousel-control-prev' type='button' data-bs-target={`#carouselExampleIndicators${i}`} data-bs-slide='prev'>
                  <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                  <span className='visually-hidden'>Previous</span>
                </button>
                <button className='carousel-control-next' type='button' data-bs-target={`#carouselExampleIndicators${i}`} data-bs-slide='next'>
                  <span className='#carousel-control-next-icon' aria-hidden='true'></span>
                  <span className='visually-hidden'>Next</span>
                </button>
              </div>
              <div className='card-body'>
                <h5 className='card-title'>{item.name}</h5>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" onClick={() => decreaseBasketItem(item)} className="btn btn-decrease btn-info">-</button>
                  <button type="button" className="btn btn-quantity">
                    {
                      item.quantity
                    }
                  </button>
                  <button type="button" onClick={() => increaseBasketItem(item)} className="btn btn-increase  btn-success">+</button>
                </div>
                <button type='button' className='btn btn-danger btn-delete' onClick={() => removeItem(item)}>
                  <i className='fa-solid fa-trash-can'></i>
                </button>
                <p>Fiyat : {item.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} ₺</p>
              </div>
            </div>
          ))
        ) : (
          <center className='null-page'>Henüz ürün eklemediniz.</center>
        )}
        <br />
        <p className='total'>Toplam tutar : <strong>{totalPrice()} ₺</strong></p>
      </>
    );
  };

export default Basket;