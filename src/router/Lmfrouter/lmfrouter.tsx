import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "../../User/Lmf/Home/Index"
import Borrow from "../../User/Lmf/Home/Borrow/Borrow "
import Map from "../../common/Topbar/Mapcomponents"

import Borrowdetails from "../../User/Wangcairouter1/views/borrowdetails"
import Usercenter from "../../User/Wangcairouter1/views/usercenter"

export default function lmfrouter() {
    return (
        <Routes>
            <Route path='/home' element={<Home></Home>}></Route>
            <Route path='/borrow' element={<Borrow ></Borrow>}></Route>
            <Route path='/map' element={<Map ></Map>}></Route>

            <Route path='/borrowdetails' element={<Borrowdetails></Borrowdetails>}></Route>
            <Route path='/usercenter' element={<Usercenter></Usercenter>}></Route>
        </Routes>
    )
}
