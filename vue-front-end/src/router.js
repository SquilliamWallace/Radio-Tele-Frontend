import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/User/Login'
import Register from './views/User/Register'
import Scheduler from './views/Appointment/Scheduler'
import AppointmentView from './views/Appointment/AppointmentView'
import ViewProfile from './views/Profile/ViewProfile'
import EditProfile from './views/Profile/EditProfile'
import admin from './views/admin'
import Home from './views/Home'
import RFData from './views/Appointment/RFData'
import UnderConstruction from './views/UnderConstruction'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/users/register',
      name: 'register',
      component: Register
    },
    {
      path: '/scheduler',
      name: 'scheduler',
      component: Scheduler
    },
    {
      path: '/appointments/:appointmentId/view',
      name: 'appointmentView',
      component: AppointmentView
    },
    {
      path: '/users/:userId/view',
      name: 'viewProfile',
      component: ViewProfile
    },
    {
      path: '/users/:userId/edit',
      name: 'editProfile',
      component: EditProfile
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/appointments/:appointmentId/rf-data',
      name: 'RFData',
      component: RFData
    },
    {
      path: '/underConstruction',
      name: 'underConstruction',
      component: UnderConstruction  
    }
  ]
})

export default router;
