import React from 'react'

export default function ButtonGroup({data}) {

    const decrease = (data) => {
        if(data.quantity === 1)
        {
          return data.quantity
        }
        else{
          return data.quantity -= 1;
        }
      }
    
       const increase = (data) => {
        if(data.quantity === 10)
        {
          return data.quantity
        }
        else{
          return data.quantity += 1;
        }
      }
    const itemAmount = (data) => {

        if(data === 0)
        return data = 1;
        else
        return data
      }
  return (
    <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" onClick={() => decrease(data)} className="btn btn-quantity">-</button>
                  <button type="button" className="btn btn-light">
                  {
                    itemAmount(data.quantity)
                  }
                </button>
                  <button type="button" onClick={() => increase(data)} className="btn btn-quantity">+</button>
                </div>
  )
}
