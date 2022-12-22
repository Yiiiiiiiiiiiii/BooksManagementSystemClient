import React from 'react'
import { Routes, Route } from "react-router-dom"
import Borrow from "./views/borrowdetails"
import Usercenter from "./views/usercenter/index"
export default function index() {
    return (
        <div>
            <Routes>
                <Route path='/borrow' element={<Borrow></Borrow>}></Route>
                <Route path='/usercenter' element={<Usercenter></Usercenter>}></Route>
            </Routes>
        </div>
    )
}
