import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Run from './views/Run.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/run',
      name: 'run',
      component: Run
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
