import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Bookmange from '../Components/bookMange'
import Addbook from '../Components/Addbook'

export default function booksManagement() {

    return (
        <div>
            <Routes>
                <Route path='/bookmange' element={<Bookmange />}></Route>
                <Route path='/addbook' element={<Addbook />}></Route>
            </Routes>
        </div>
    )
}
