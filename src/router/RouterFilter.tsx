import React from 'react'
import { Navigate } from 'react-router-dom'
export default function RouterFilter(props) {
    let isLogin=window.sessionStorage.getItem("student_number")
    // console.log(isLogin);
    if(isLogin != null){
        return (<div>{props.component}</div>)
    }
  return (
    <div>
        <Navigate to="/"></Navigate>
    </div>
  )
}
