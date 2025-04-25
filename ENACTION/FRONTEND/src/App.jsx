import { useState } from 'react'
import {Route, Routes} from "react-router-dom"
import Navbar from './component/Navbar'
import Home from './pages/Home'
import AddProduct from './pages/AddProduct'
import Brands from './pages/Brands'
import Category from './pages/Category'
import UpdateProduct from './pages/UpdateProduct'


function App() {
  

  return (
    <>
        <Navbar/>
        <Routes>
          < Route index element={<Home/>} />
          < Route path="/addProduct" element={<AddProduct/>} />
          < Route path="/brand" element={<Brands/>} />
          < Route path="/category" element={<Category/>} />
          < Route path="/updateProduct/:id" element={<UpdateProduct/>}/>
        </Routes>

    </>
  )
}

export default App
