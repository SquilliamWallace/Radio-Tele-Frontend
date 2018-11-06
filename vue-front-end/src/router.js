import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/User/Login.vue'
import Register from './views/User/Register.vue'
import Scheduler from './views/Appointment/Scheduler.vue'
import AppointmentView from './views/Appointment/AppointmentView.vue'
import ActivateAccount from './views/ActivateAccount.vue'
import ViewProfile from './views/Profile/ViewProfile.vue'
import EditProfile from './views/Profile/EditProfile.vue'
import admin from './views/admin.vue'
import Home from './views/Home.vue'
import RFData from './views/Appointment/RFData.vue'
import ResetPassword from './views/ResetPassword.vue'
import UnderConstruction from './views/UnderConstruction.vue'
import CompletedAppointments from './views/Appointment/CompletedAppointments.vue'

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
    },
    {
      path: '/resetPassword',
      name: 'ResetPassword',
      component: ResetPassword,
      query: { token: 'private' }
    },
    {
      path: '/underConstruction',
      name: 'underConstruction',
      component: UnderConstruction  
    },
    {
      path: '/users/:userId/appointments/completed',
      name: 'CompletedAppointments',
      component: CompletedAppointments
    }
  ]
})

export default router;
