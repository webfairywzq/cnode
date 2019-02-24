import Vue from 'vue'
import Router from 'vue-router'

import Index from './views/Index'
import Detail from './views/detail'
import List from './views/List'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      component:Index,
      redirect:'/all',
      children:[
        {
          path:':tab',
          component:List
        }
      ]
    },
    {
      path:"/detail/:id",
      component:Detail
    }
  ]
})
