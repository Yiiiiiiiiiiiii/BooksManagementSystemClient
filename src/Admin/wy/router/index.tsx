import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Map from "../../../common/Topbar/Mapcomponents"
import Home from "../Home"
import Userinfo from "../../cyz/userinfo"
import Bookmange from '../../Y/Components/bookMange'
import Addbook from '../../Y/Components/Addbook'
import Notreturned from "../Notreturned"
import Late from "../Late"
export default function index() {
  return (
    <Routes>
        <Route path='/map' element={<Map ></Map>}></Route>

        <Route path='/home' element={<Home></Home>}></Route>
        
        <Route path='/userinfo' element={<Userinfo></Userinfo>}></Route>

        <Route path='/bookmange' element={<Bookmange />}></Route>
        <Route path='/addbook' element={<Addbook />}></Route>

        <Route path='/notreturned' element={<Notreturned></Notreturned>}></Route>
        <Route path='/late' element={<Late></Late>}></Route>
    </Routes>
  )
}
