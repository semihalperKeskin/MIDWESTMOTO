import React from 'react'

function shoppingCard(item) {
  return (
    <>
    {
        item.map((item, i)=> (
        <div>{item.name}</div>
    ))}
    </>
  )
}

export default shoppingCard