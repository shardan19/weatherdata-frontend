<template>
   <div id="app">
    <header class="navbar navbar-dark bg-dark">
      <div class="container">
        <span class="navbar-brand">Pogoda</span>
      </div>
    </header>

    <div class="container mt-4">
      <highcharts></highcharts>
    </div>
    
   </div>
   
</template>

<script>
import highChart from "./components/highChart.vue";

export default {
  name: 'App',
  components: {
    highcharts:highChart
 },
 
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
body {
  background-color: #f8f9fa;
}

.card {
  margin-top: 20px;
}

.navbar {
  margin-bottom: 20px;
}
</style>
