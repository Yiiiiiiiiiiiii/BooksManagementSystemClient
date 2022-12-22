import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from "../User/Lmf/LoginComponents/Login"
import Userindex from "../User/Userindex"
import Adminindex from "../Admin/Adminindex"
import RouterFilter from './RouterFilter';
export default function index() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login></Login>}></Route>

                {/* 重定向一下,打开userindex页面默认的就是首页 */}
                <Route path='/userindex' element={<Navigate to="/userindex/home"></Navigate>}></Route>
                <Route path='/userindex/*' element={<RouterFilter component={<Userindex></Userindex>}>  </RouterFilter>}></Route>

                <Route path='/adminindex' element={<Navigate to="/adminindex/home"></Navigate>}></Route>
                <Route path='/adminindex/*' element={<RouterFilter component={<Adminindex></Adminindex>}> </RouterFilter>}></Route>


                <Route path='/*' element={<Login></Login>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

