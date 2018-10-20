import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Scheduler from './views/Scheduler.vue'
import AppointmentView from './views/AppointmentView.vue'
import ViewProfile from './views/ViewProfile.vue'
import EditProfile from './views/EditProfile'
import admin from './views/admin'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/scheduler',
      name: 'scheduler',
      component: Scheduler
    },
    {
      path: '/appointmentView',
      name: 'appointmentView',
      component: AppointmentView
    },
    {
      path: '/Profile',
      name: 'viewProfile',
      component: ViewProfile
    },
    {
      path: '/editProfile',
      name: 'editProfile',
      component: EditProfile
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    }
  
  ]
})

router.replace('/home');
export default router;
