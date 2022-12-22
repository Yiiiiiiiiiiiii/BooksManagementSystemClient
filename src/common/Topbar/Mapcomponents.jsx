import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmap'
export default function Mapcomponents() {
    // 添加定位控件


    return (
        <div style={{
            width: '100%',
            height: '670px'
        }} id="container">
            {/* 104.053642,30.701051 */}
            <Map center={{ lng: 104.053642, lat: 30.701051 }} zoom="16" enableScrollWheelZoom={true} style={{
                width: '100%',
                height: '670px'
            }} >
                {/* 中心坐标 */}
                <Marker position={{ lng: 104.053642, lat: 30.701051 }} />

                <NavigationControl />
            </Map>

        </div>
    )
}
