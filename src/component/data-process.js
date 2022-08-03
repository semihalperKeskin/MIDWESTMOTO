import React from 'react'

export const decrease = (data) => {
    if(data.quantity === 1)
    {
      return data.quantity
    }
    else{
      data.quantity -= 1;
    }
    console.log(data.quantity)
  }

  export const increase = (data) => {
    if(data.quantity === 10)
    {
      return data.quantity
    }
    else{
      data.quantity += 1;
    }
    console.log(data.quantity)
  }
  export const itemAmount = (data) => {
    if(data === 0)
    return data = 1;
    else
    return data
  }
