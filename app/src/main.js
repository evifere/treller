global.jQuery = require('jquery');
require('bootstrap');
require('./style/app.css');

import VueRouter from 'vue-router'
//import VueResource from 'vue-resource'
//Vue.use(VueResource)
Vue.use(VueRouter)

import Vue from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import Dashboard from './components/Dashboard.vue'

//define route here
const routes = [{
    path: '/home',
    name: 'home',
    component: Home,
    alias: ''
}, {
    name: 'dashboard',
    path: '/dashboard/:boardId/:boardName',
    component: Dashboard
}]

const router = new VueRouter({
    routes
})

//mount the app
const app = new Vue({
    router,
    render: h => h(App)

}).$mount('#app')
