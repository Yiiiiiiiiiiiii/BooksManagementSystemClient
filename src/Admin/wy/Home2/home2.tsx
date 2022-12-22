import React from 'react'
import * as echarts from 'echarts';
import { useEffect, useRef, useState} from "react";
import http from "../../../Lib/http"
import index from '../router';
export default function Home2() {
  const chartRef = useRef(null);
  const [data, setData] = useState();
  const [arr,setarr]=useState([])
  useEffect(() => {
    http.get('/wypie',)
    .then(function (response){
      setData(response.data.data);
      console.log(response.data.data);
      // let arr=response.data.data
      // setdataSource(arr)
      // console.log(arr);
      // setstart(arr1)
      // console.log((arr[0].start).slice(5,7));
      // for(var i=0;i<arr.length;i++){
      //   var arr1=(arr[i].start).slice(5,7)
      //   console.log(arr1);
      // }
      let arr=response.data.data.map(el=>el.age)
      console.log(arr)
      setarr(arr)
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);
  useEffect(() =>{
    let chartInstance = echarts.init(chartRef.current);
    
    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '年龄',
          type: 'pie',
          radius: '50%',
          center:['60%','60%'],
          data: [
            { value: arr.filter(el=>el=='17'||el=='18'||el=='19').length, name: '17-19' },
            { value: arr.filter(el=>el=='20'||el=='21'||el=='22').length, name: '20-22' },
            { value: arr.filter(el=>el=='23'||el=='24'||el=='25').length, name: '23-25' },
            { value: arr.filter(el=>el=='26'||el=='27'||el=='28').length, name: '26-28' },
            { value: arr.filter(el=>el>='29').length, name: '29以上' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    chartInstance.setOption(option);
  }, [arr]);
  const [dataSource,setdataSource] = useState([])

  return (
    <div style={{ height: "400px" ,width:"500px"}}>
      <h2 style={{ marginLeft:"230px" }}>年龄分布图</h2>
      <div ref={chartRef} style={{ height: "400px" }}></div>
    </div>
  );
}
