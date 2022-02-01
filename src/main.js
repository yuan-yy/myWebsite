import { createApp } from 'vue'
import App from './App.vue'
import cloudbase from "@cloudbase/js-sdk";
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import 'vant/lib/index.css';


createApp(App).use(ElementPlus,{locale:zhCn}).mount('#app')
