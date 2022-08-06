import React, { useEffect } from 'react'

export default function ButtonGroup({ data }) {


    const decrease = (dquantity) => {
        if (dquantity === 1) {
            return dquantity
        }
        else {
            return dquantity -= 1;
        }
    }

    const increase = (dquantity) => {
        if (dquantity === 10) {
            return dquantity
        }
        else {
            return dquantity += 1;
        }
    }
    // const itemAmount = (data) => {

    //     if (data === 0)
    //         return data = 1;
    //     else
    //         return data
    // }
    return (
        <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" onClick={() => decrease(data.quantity)} className="btn btn-quantity">-</button>
            <button type="button" className="btn btn-light">
                {
                    data.quantity
                }
            </button>
            <button type="button" onClick={() => increase(data.quantity)} className="btn btn-quantity">+</button>
        </div>
    )
}
