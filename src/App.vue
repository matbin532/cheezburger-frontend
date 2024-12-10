<template>
  <div id="app">
    <CheezNavbar/>
    <RouterView/>
  </div>
</template>

<script>
import CheezNavbar from './components/CheezNavbar.vue'
export default {
  name: 'App',
  components: {
    CheezNavbar
  }
}
</script>

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
