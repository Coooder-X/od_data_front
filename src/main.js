import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import bus from 'mitt'
import App from './App.vue'
// import { provide, reactive } from 'vue';

// const globalState = reactive({
  
// });
// // 提供全局状态
// provide('globalState', globalState);
 
// export default globalState;

const app = createApp(App)

// app.config.globalProperties.$bus = bus
app.use(ElementPlus)
app.mount('#app')

