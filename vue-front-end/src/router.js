import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
<<<<<<< HEAD
import Scheduler from './views/Scheduler.vue'
import AppointmentView from './views/AppointmentView.vue'
=======
import viewProfile from './views/viewProfile.vue'
>>>>>>> view-profile

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
<<<<<<< HEAD
      path: '/scheduler',
      name: 'scheduler',
      component: Scheduler
    },
    {
      path: '/appointmentView',
      name: 'appointmentView',
      component: AppointmentView
=======
      path: '/viewProfile',
      name: 'viewProfile',
      component: viewProfile
>>>>>>> view-profile
    }
  ]
})

router.replace('/home');
export default router;
