<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import 'normalize.css'
export default {
  name: 'App'
}
</script>

<style>
body {
  /* height: 100%; */
  /* background-color: rgb(231, 230, 230); */
  background-image: url(..\static\img\login\login-bg.jpg);
  background-size: cover;
  /* background-position: center; */
  padding-bottom: 30px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
