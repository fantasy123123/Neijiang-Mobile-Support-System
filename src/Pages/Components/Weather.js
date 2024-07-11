import {useEffect, useState} from "react";
import {Descriptions} from "@arco-design/web-react";
import * as echarts from 'echarts';

const Weather=()=>{
    const [data,setData]=useState({
        "date": "2024-07-08",
        "week": "星期一",
        "city": "天心",
        "wea": "多云",
        "tem": "32.9",
        "tem1": "35",
        "tem2": "29",
        "win": "东南风",
        "win_speed": "2级",
        "humidity": "57%",
        "visibility": "20km",
        "pressure": "990",
        "air_level": "优",
        "air_tips": "各类人群可多参加户外活动，多呼吸一下清新的空气。",
        "hours": [
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00",
            "00:00",
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            "06:00",
            "07:00",
            "08:00",
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
        ],
        "weaArray": [
            "阴",
            "阴",
            "阴",
            "阴",
            "阴",
            "阴",
            "阴",
            "阴",
            "多云",
            "多云",
            "阴",
            "阴",
            "多云",
            "多云",
            "晴",
            "晴",
            "晴",
            "晴",
            "多云",
            "多云",
            "多云",
            "多云",
            "多云",
            "多云",
        ],
        "temArray": [
            31,
            30,
            30,
            29,
            29,
            29,
            28,
            28,
            28,
            27,
            27,
            28,
            28,
            29,
            30,
            31,
            32,
            33,
            33,
            34,
            34,
            34,
            34,
            33,
        ]
    })

    const column = [
        {
            label: '风向',
            value: data.win,
        },
        {
            label: '风级',
            value: data.win_speed,
        },
        {
            label: '湿度',
            value: data.humidity,
        },
        {
            label: '可见度',
            value: data.visibility,
        },
        {
            label: '气压',
            value: data.pressure+' kPa',
        },
        {
            label: '空气质量',
            value: data.air_level,
        },
        {
            label: '建议',
            value: data.air_tips,
        }
    ];

    useEffect(()=>{
        const myChart = echarts.init(document.getElementById('container'));
        myChart.setOption({
            title: {
                text: '24小时天气'
            },
            xAxis: {
                name:'时间',
                nameLocation:'end',
                data: data.hours,
                nameTextStyle:{
                    fontSize: 17
                }
            },
            tooltip:{
                trigger:'item',
                formatter: function(param) {
                    return `${param.marker}&nbsp;${data.hours[param.dataIndex]}<br/>${data.weaArray[param.dataIndex]}&nbsp;&nbsp;${param.data}℃`;
                },
                position:'top',
                textStyle:{
                    lineHeight:1,
                },
                class:{
                    textAlign:'center'
                }
            },
            yAxis: {
                type: 'value',
                name:'温度',
                min:Math.min.apply(null,data.temArray)-2,
                max:Math.max.apply(null,data.temArray)+2,
                axisLabel: {
                    formatter: '{value} °C'
                },
                nameTextStyle:{
                    fontSize: 17
                }
            },
            grid: {
                left: 0,
                containLabel: true,
                bottom: 10,
                right: 50
            },
            series: [
                {
                    label: {
                        show: true,
                        position: 'bottom',
                        formatter: function(param) {
                            return `${param.data}℃\n${data.weaArray[param.dataIndex]}`;
                        },
                    },
                    data: data.temArray,
                    type: 'line',
                    smooth: true,
                }
            ]
        });
    },[])

    return (
        <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:"90%",height:'90%'}}>
                <div style={{fontSize:25,fontWeight:'bold',color:'#165DFF',textAlign:'center'}}>
                    天气
                </div>
                <div style={{width:'90%',background:'white',marginLeft:'5%',marginTop:'2%',borderRadius:10,border:'1px solid grey',height:'90%',overflow:'auto'}}>
                    <div style={{width:'100%',display:'flex',justifyContent:'space-around',alignItems:'center',height:'30%',marginTop:30}}>
                        <div style={{width:'20%',fontSize:21,color:'grey',marginLeft:'2%'}}>
                            <div>
                                日期：{data.date}
                            </div>
                            <br/>
                            <div>
                                {data.week}
                            </div>
                            <br/>
                            <div>
                                城市：{data.city}
                            </div>
                        </div>
                        <div style={{width:'20%'}}>
                            <div style={{color:'darkgray',fontSize:17}}>
                                现在的气温：
                            </div>
                            <div style={{fontSize:60,display:'flex',justifyContent:'space-around',color:'#165DFF'}}>
                                <div>{data.tem}</div>
                                <div>°C</div>
                            </div>
                            <div style={{fontSize:25,display:'flex',justifyContent:'space-between'}}>
                                <div style={{color:'deepskyblue'}}>{data.wea}</div>

                                <div style={{color:'#6692ff'}}>{data.tem2} ~ {data.tem1} °C</div>
                            </div>
                        </div>
                        <div style={{border:'1.5px solid deepskyblue',borderRadius:10,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#f5fdff'}}>
                            <Descriptions
                                style={{margin:'20px 2px 10px 20px'}}
                                size={'large'}
                                labelStyle={{ textAlign: 'right',fontSize:15}}
                                data={column}
                                valueStyle={{color:'#000073',fontSize:16}}
                            />
                        </div>
                    </div>
                    <div id='container' style={{width:'85%',marginLeft:'7.5%',height:'60%',marginTop:10}}/>
                </div>
            </div>
        </div>
    )
}

export default Weather