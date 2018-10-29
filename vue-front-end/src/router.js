import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Scheduler from './views/Scheduler.vue'
import AppointmentView from './views/AppointmentView.vue'
import ActivateAccount from './views/ActivateAccount.vue'
import ViewProfile from './views/ViewProfile.vue'
import EditProfile from './views/EditProfile'
import admin from './views/admin'
import Home from './views/Home'
import RFData from './views/RFData'

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
      path: '/activateAccount',
      name: 'ActivateAccount',
      component: ActivateAccount,
      query: { token: 'private' }
    }
  ]
})

export default router;
