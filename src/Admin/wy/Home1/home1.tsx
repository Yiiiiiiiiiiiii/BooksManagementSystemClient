import React from 'react'
import * as echarts from 'echarts';
import { useEffect, useRef, useState} from "react";
import http from "../../../Lib/http"
import index from '../router';
export default function Home1() {
  const chartRef = useRef(null);
  const [data, setData] = useState();
  const [arr1,setarr1]=useState([])
  useEffect(() => {
    http.get('/wyline',)
    .then(function (response){
      setData(response.data.data);
      console.log(response.data.data);
      // console.log(response.data.data.length);
      
      let arr=response.data.data.map(el=>({
        start: el.start_time,
      }))
      setdataSource(arr)
      console.log(arr);
      
      // setstart(arr1)
      // console.log((arr[0].start).slice(5,7));
      // for(var i=0;i<arr.length;i++){
      //   var arr1=(arr[i].start).slice(5,7)
      //   console.log(arr1);
      // }
      let arr1=arr.map(el=>el.start.slice(5,7))
      console.log(arr1)
      setarr1(arr1)
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);
  useEffect(()=>{
    let chartInstance = echarts.init(chartRef.current);
    const option = {
      xAxis: {
        type: 'category',
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      },
      yAxis: {
        type: 'value',
        min:0,  //取0为最小刻度
        max: 30, //取100为最大刻度
      },
      grid:{
        x:40,
        y:80,
        x2:30,
        y2:60,
        borderWidth:1
    },
      series: [
        {
          itemStyle : { normal: {label : {show: true}}},
          data: [arr1.filter(el=>el=='01').length, arr1.filter(el=>el=='02').length, arr1.filter(el=>el=='03').length, arr1.filter(el=>el=='04').length, arr1.filter(el=>el=='05').length,
          arr1.filter(el=>el=='06').length, arr1.filter(el=>el=='07').length, arr1.filter(el=>el=='08').length, arr1.filter(el=>el=='09').length, arr1.filter(el=>el=='10').length, arr1.filter(el=>el=='11').length, arr1.filter(el=>el=='12').length],
          type: 'line'
        }
      ]
    };
    chartInstance.setOption(option);
  },[arr1])
  const [dataSource,setdataSource] = useState([])
  // const [start,setstart] = useState([])
  return (
    <div style={{ height: "400px" ,width:"700px"}}>
      <h2 style={{ textAlign: "center" }}>借阅量折线图</h2>
      <div ref={chartRef} style={{ height: "400px" }}></div>
    </div>
  );
}
