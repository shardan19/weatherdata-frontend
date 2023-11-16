<template>
    <div class="card">
        <div class="card-header">
          Wykresy
        </div>
    <div class="card-body">
        <highcharts :options="chartOptions"></highcharts>
    </div></div>
    <div class="card">
    <div class="card-body">
        <highcharts :options="chartOptions01"></highcharts>
    </div></div>
    <div class="card">
    <div class="card-body">
        <highcharts :options="chartOptions2"></highcharts>
    </div></div>
    <div class="card">
    <div class="card-body">
        <highcharts :options="chartOptions3"></highcharts>
    </div></div>
    <div class="card">
    <div class="card-body">
        <highcharts :options="chartOptions4"></highcharts>
    </div></div>
</template>
<script>
import { Chart } from 'highcharts-vue'
import axios from 'axios'

export default {
    components: {
    highcharts: Chart 
  },
  data() {
    return {
      chartOptions: {
        time:{            
            timezoneOffset: -60
        },
        chart:{type:'columnrange'},
        title:{text: 'Temperatura min/max'},
        xAxis:{
            type:'datetime',
            labels: {
                rotation:-20,
                format: '{value:%Y-%m-%d %H:%M:%S}',
            },
            title:{text:'Data'}
        },
        yAxis:{
            
            title:{
                text:'Temperatura'
            }
        },
        tooltip: {
        crosshairs: true,
        shared: true,
        valueSuffix: '°C'
    },
        plotOptions: {
            columnrange: {
            borderRadius: '50%',
            dataLabels: {
                enabled: true,
                format: '{y}°C'
            }
        }
    },
        series: [{name:"Temperatura minimalna/maksymalna",data:[]}
    ],
      },
      chartOptions2: {
        time:{            
            timezoneOffset: -60
        },
        chart:{type:'line'},
        title:{text: 'Wiatr'},
        xAxis:{
            type:'datetime',
            labels: {
                rotation:-20,
                format: '{value:%Y-%m-%d %H:%M:%S}',
            },
            title:{text:'Data'}
        },
        yAxis:{
            title:{
                text:'Wiatr'
            }
        },
        plotOptions: {
            line: {
            dataLabels: {
                enabled: true,
                format: '{y} m/s'
            }
        }},
        tooltip: {
        crosshairs: true,
        shared: true,
        valueSuffix: ' m/s'},
        series: [{name:"Prędkość Wiatru",data: []},{name:"Podmuch wiatru",data:[]}]
      },
      chartOptions3: {
        time:{            
            timezoneOffset: -60
        },
        chart:{type:'column'},
        title:{text: 'Wilgotność (%)'},
        xAxis:{
            type:'datetime',
            labels: {
                rotation:-20,
                format: '{value:%Y-%m-%d %H:%M:%S}',
            },
            title:{text:'Data'}
        },
        yAxis:{
            title:{
                text:'Wilgotność'
            }
        },
        plotOptions: {
            line: {
            dataLabels: {
                enabled: true,
                format: '{y} %'
            }
        }},
        tooltip: {
        crosshairs: true,
        shared: true,
        valueSuffix: ' %'},
        series: [{name:"Wilgotność",data: []}]
      },
      chartOptions4: {
        time:{            
            timezoneOffset: -60
        },
        chart:{type:'line'},
        title:{text: 'Ciśnienie (hPa)'},
        xAxis:{
            type:'datetime',
            labels: {
                rotation:-20,
                format: '{value:%Y-%m-%d %H:%M:%S}',
            },
            title:{text:'Data'}
        },
        yAxis:{
            title:{
                text:'Ciśnienie'
            }
        },
        plotOptions: {
            line: {
            dataLabels: {
                enabled: true,
                format: '{y} hPa'
            }
        }},
        tooltip: {
        crosshairs: true,
        shared: true,
        valueSuffix: ' hPa'},
        series: [{name:"Ciśnienie",data: []}]
      }, chartOptions01: {
        time:{            
            timezoneOffset: -60
        },
        chart:{type:'line'},
        title:{text: 'Temperatura'},
        xAxis:{
            type:'datetime',
            labels: {
                rotation:-20,
                format: '{value:%Y-%m-%d %H:%M:%S}',
            },
            title:{text:'Data'}
        },
        yAxis:{
            title:{
                text:'Temperatura'
            }
        },
        plotOptions: {
        line: {
            marker:{},
            dataLabels: {
                enabled: true,
                format: '{y}°C'
            },
            
        }},
        tooltip: {
        valueSuffix: '°C'
    },
        series: [{name:"Temperatura odczuwalna",data: []},{name:"Temperatura",data: []}]
      }
    }
  },
  mounted(){
    this.fetchDataAndUpdateChart();
    setInterval(this.fetchDataAndUpdateChart, 60000);
  },
  methods:{
    fetchDataAndUpdateChart(){
        axios.get('http://174.129.50.191:8084/api/weatherdata/all').then(response=>{
            const data=response.data;
            //console.log(data);

            const tempList=data.map(item=>[parseInt(item.dt)*1000,Math.round(item.temp * 10) / 10])
            //const minTempList=data.map(item=>[parseInt(item.dt)*1000,Math.round(item.minTemp * 10) / 10])
            //const maxTempList=data.map(item=>[parseInt(item.dt)*1000,Math.round(item.maxTemp * 10) / 10])
            //const feelsLikeTempList=data.map(item=>[parseInt(item.dt)*1000,item.feelsLikeTemp])
            const windSpeedList=data.map(item=>[parseInt(item.dt)*1000,item.speed])
            const windGustList=data.map(item=>[parseInt(item.dt)*1000,item.gust])
            const humidityList=data.map(item=>[parseInt(item.dt)*1000,item.humidity])
            const pressureList=data.map(item=>[parseInt(item.dt)*1000,item.pressure])

            const tempRange=data.map(item=>{
                return {x:parseInt(item.dt)*1000,low:Math.round(item.minTemp * 10) / 10,high:Math.round(item.maxTemp * 10) / 10}
            });

            const tempListIcons=data.map(item=>{
                return {x:parseInt(item.dt)*1000,
                    y:Math.round(item.feelsLikeTemp * 10) / 10,
                    marker:{symbol:'url(https://openweathermap.org/img/wn/'+item.icon+'@2x.png)',
                            fillColor:'red',
                            width:50,
                            height:50}
                            
                }
            });


            this.chartOptions.series[0].data=tempList;
            this.chartOptions.series[0].data=tempRange;
            //this.chartOptions.series[1].data=maxTempList;
            //this.chartOptions.series[3].data=feelsLikeTempList;
            this.chartOptions2.series[0].data=windSpeedList;
            this.chartOptions2.series[1].data=windGustList;
            this.chartOptions3.series[0].data=humidityList;
            this.chartOptions4.series[0].data=pressureList;

            this.chartOptions01.series[0].data=tempListIcons;
            this.chartOptions01.series[1].data=tempList;





        })
    }
  }
};

</script>