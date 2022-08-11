import React, { useContext } from 'react'
import { ContextItem } from '../context/ContextItem';
import db from '../firebase'

function CategoryFilter() {
    const {setInfo} =useContext(ContextItem)

    const fetchData= db.collection("products");

    const filterData= (filter) => {
        if(filter == "all"){
          fetchData.onSnapshot(snapShot => setInfo(snapShot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }))))
        }else
        fetchData.where("category","==", filter).onSnapshot(snapShot => setInfo(snapShot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))))
      }
  return (
    <ul className='categoryList'>
    <li><a onClick={()=> filterData("all")}> Tümü </a></li>
    <li><a onClick={()=> filterData("mont")}> Montlar </a></li>
  </ul>
  )
}

export default CategoryFilter