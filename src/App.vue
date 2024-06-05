<template>
  <HomePage />
</template>

<script>
import HomePage from './pages/HomePage.vue'
import { ref, provide } from "vue";
import { connectionTest } from './request.js'

export default {
  name: 'App',
  components: {
    HomePage
  },
  setup() {
    connectionTest()

    const gridPair = ref([])
    const pairs = ref([])
    const totalOdInfo = ref(new Map())

    provide('gridPair', gridPair)
    provide('pairs', pairs) // 存放选择的OD对
    provide('totalOdInfo', totalOdInfo)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
