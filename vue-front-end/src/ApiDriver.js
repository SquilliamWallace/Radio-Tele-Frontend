const axios = require('axios');
import Headers from './utils/Headers';

let baseUrl = "http://api.ycpradiotelescope.com:8080/api/";
export default {
    //API endpoints go here
    CelestialBodies: {
      namespace: baseUrl + "celestial-bodies",
      getCBList: function(pageNumber, pageSize){
        return axios.get(this.namespace + "?page=" + pageNumber + "&size=" + pageSize, Headers.retrieveHeaders());
      },
      createCB: function(data){
        
        return axios.post(this.namespace, data, Headers.retrieveHeaders())
      }
    },
    User: {
      namespace: baseUrl + "users",
      activate: function(token) {
        return axios.put(this.namespace + "/activate?token=" + token, {}, Headers.retrieveHeaders());
      },
      register: function (data) {
        return axios.post(this.namespace, data, Headers.retrieveHeaders());
      },
      get: function(userId) {
        return axios.get(this.namespace + "/" + userId, Headers.retrieveHeaders());
      },
      update: function(userId, data) {
        return axios.put(this.namespace + "/" + userId, data, Headers.retrieveHeaders());
      },
      allUsers: function(pageNumber, pageSize) {
        return axios.get(this.namespace + "?page=" + pageNumber + "&size=" + pageSize, Headers.retrieveHeaders());
      },
      userSearch: function(pageNumber, pageSize, value, search) {
        return axios.get(this.namespace + "/search" + "?page=" + pageNumber + "&size=" + pageSize + "&value=" + value + "&search=" + search, Headers.retrieveHeaders());
      },
      changePassword: function(userId) {
        return axios.put(this.namespace + "/" + userId + "/changePassword", data, Headers.retrieveHeaders())
      },
      ban: function(userId, message) {
        return axios.put(this.namespace + "/" + userId + "/ban?message=" + message, {}, Headers.retrieveHeaders());
      },
      unban: function(userId) {
        return axios.put(this.namespace + "/" + userId + "/unban", {}, Headers.retrieveHeaders())
      },
      changeEmail: function(userId, data) {
        return axios.post(this.namespace + "/" + userId + "/updateEmail", data, Headers.retrieveHeaders())
      },
      changePassword: function(userId, data) {
        return axios.put(this.namespace + "/" + userId + "/changePassword", data, Headers.retrieveHeaders())
      },
      changeRoleRequest: function(userId, role, data) {
        return axios.post(this.namespace + "/" + userId + "/role/request?role=" + role, data, Headers.retrieveHeaders())  
      },
      unapproved: function(pageNumber, pageSize) {
        return axios.get(baseUrl + "roles/unapproved" + "?page=" + pageNumber + "&size=" + pageSize, Headers.retrieveHeaders())
      },
      approve: function(data) {
        return axios.put(baseUrl + "roles/validate", data, Headers.retrieveHeaders())
      },
      Appointment: {
        namespace: baseUrl + "users",
        completedAppointments: function(userId, pageNumber, pageSize) {
          return axios.get(this.namespace + "/" + userId + "/appointments/completedList?page=" + pageNumber + "&size=" + pageSize, Headers.retrieveHeaders());
        }
      }
    },

    Appointment: {
      namespace: baseUrl + "appointments",
      view: function (appointmentId) {
        return axios.get(this.namespace + "/" + appointmentId + "/retrieve", Headers.retrieveHeaders())
      },
      create: function (data) {
        return axios.post(this.namespace + "/schedule", data, Headers.retrieveHeaders())
      },
      request: function (data) {
        return axios.post(this.namespace + "/request", data, Headers.retrieveHeaders())
      },
      unapprovedRequest: function (pageNumber, pageSize) {
        return axios.get(this.namespace + "/listRequested?page=" + pageNumber + "&size=" + pageSize, Headers.retrieveHeaders())
      },
      approveRequest: function (appointmentId, isApprove) {
        return axios.put(this.namespace + "/" + appointmentId + "/validate?isApprove=" + isApprove, {}, Headers.retrieveHeaders());
      },
      futureAppointmentsByTelescopeID: function(telescopeID, pageNumber, pageSize) {
        return axios.get(this.namespace + "/telescopes/" + telescopeID + "/futureList?page=" + pageNumber + "&size=" + pageSize, Headers.retrieveHeaders())
      },
      load: function(telescopeID) {
        return axios.get(this.namespace + "/telescopes/" + telescopeID + "/retrieve", Headers.retrieveHeaders())
      },
      data: function(appointmentId) {
        return axios.get(this.namespace + "/" + appointmentId + "/rf-data", Headers.retrieveHeaders())
      },
      update: function(appointmentId, data) {
        return axios.put(baseUrl + "appointments/" + appointmentId, data, Headers.retrieveHeaders())
      },
      cancel: function(appointmentId) {
        return axios.put(baseUrl + "appointments/" + appointmentId + "/cancel", {}, Headers.retrieveHeaders())
      },
      completedAppointments: function(userId, pageNumber, pageSize) {
        return axios.get(baseUrl + "users/" + userId + "/appointments/completedList?page=" + pageNumber + "&size=" + pageSize, Headers.retrieveHeaders());
      },
      futureAppointments: function(userId, pageNumber, pageSize) {
        return axios.get(baseUrl + "users/" + userId + "/appointments/futureList?page=" + pageNumber + "&size=" + pageSize, Headers.retrieveHeaders());
      },
      publicAppointments: function(page, size) {
        return axios.get(this.namespace + "/publicCompleted?page=" + page + "&size=" + size, Headers.retrieveHeaders())
      },
      listAppointmentsBetweenDates: function(data) {
        return axios.get(this.namespace + "/telescopes/" + data.telescopeId + "/listBetweenDates?startTime=" + data.startTime + "&endTime=" + data.endTime, Headers.retrieveHeaders())
      }
    },
    Log: {
      viewLogs: function(pageNumber, pageSize){
        return axios.get(baseUrl + "logs?pageNumber=" + pageNumber + "&pageSize=" + pageSize, Headers.retrieveHeaders())
      },
      retrieveErrors: function(id){
        return axios.get(baseUrl + "logs/" + id + "/errors", Headers.retrieveHeaders())
      }
    },
    Auth: {
      User: function(token) {
        return axios.get(baseUrl + "auth", Headers.retrieveHeaders());
      },
      Admin: function() {
        return axios.get(baseUrl + "authAdmin", Headers.retrieveHeaders());
      }
    },

    login: function(data) {
      return axios.post("http://api.ycpradiotelescope.com:8080/login?email=" + data.username.value + "&password=" + data.password.value, JSON.stringify(data))
    },
    logout: function () {
      return axios.post(baseUrl + "logout", {}, Headers.retrieveHeaders())
    },
    requestPasswordReset(data) {
      return axios.post(baseUrl + "requestPasswordReset", data, Headers.retrieveHeaders())
    },
    resetPassword(data, token) {
      return axios.post(baseUrl + "resetPassword?token=" + token, data, Headers.retrieveHeaders())
    },
    updateEmail(token) {
      return axios.put(baseUrl + "updateEmail?token=" + token, {}, Headers.retrieveHeaders());
    }
}