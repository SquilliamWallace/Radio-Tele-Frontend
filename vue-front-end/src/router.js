import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/User/Login'
import Register from './views/User/Register'
import Scheduler from './views/Appointment/Scheduler'
import AppointmentView from './views/Appointment/AppointmentView'
import ActivateAccount from './views/ActivateAccount'
import ViewProfile from './views/Profile/ViewProfile'
import EditProfile from './views/Profile/EditProfile'
import admin from './views/admin'
import Home from './views/Home'
import RFData from './views/Appointment/RFData'
import ResetPassword from './views/ResetPassword'
import UnderConstruction from './views/UnderConstruction'
import CompletedAppointments from './views/Appointment/CompletedAppointments'
import FutureAppointments from './views/Appointment/FutureAppointments'
import PublicAppointments from './views/Appointment/PublicAppointments'

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
    },
    {
      path: '/users/:userId/appointments/future',
      name: 'FutureAppointments',
      component: FutureAppointments
    },
    {
      path: '/appointments/public',
      name: 'PublicAppointments',
      component: PublicAppointments
    }
  ]
})

export default router;
