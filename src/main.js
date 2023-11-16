import { createApp } from 'vue'
import App from './App.vue'
import Highcharts from "highcharts";
import Exporting from "highcharts/modules/exporting";
import highchartsExportData  from "highcharts/modules/export-data";
import HCMore from "highcharts/highcharts-more";

HCMore(Highcharts);

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
//import Vue from 'vue'
//import HighchartsVue from 'highcharts-vue'

Exporting(Highcharts);
highchartsExportData(Highcharts);


//Vue.use(HighchartsVue)

createApp(App).mount('#app')
