<template>
  <div id="app">
    <canvas id="webgl"></canvas>
  </div>
</template>

<script>
// import { init } from './three'
export default {
  name: 'App',
  components: {},
  mounted() {
    // init()
    require('./three/index')
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html,
body {
  overflow: hidden;
  /* background-color: skyblue; */
}
#app {
  width: 0;
  height: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
