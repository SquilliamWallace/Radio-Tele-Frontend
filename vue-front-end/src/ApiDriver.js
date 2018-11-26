const axios = require('axios');
import Headers from './utils/Headers';

let baseUrl = "/api/";
export default {
    //API endpoints go here
    User: {
      namespace: baseUrl + "users",
      activate: function(token) {
        return axios.put(this.namespace + "/activate?token=" + token, {}, Headers.retrieveHeaders());
      },
      register: function (data) {
        return axios.post(this.namespace, data, Headers.retrieveHeaders());
      },
      get: function(userId) {
        return axios.get(this.namespace + "/" + userId)
      },
      update: function(userId, data) {
        return axios.put(this.namespace + "/" + userId, data, Headers.retrieveHeaders())
      },
      allUsers: function(data) {
        return axios.get(this.namespace + "?page=" + data.pageNumber + "&size=" + data.pageSize)
      },
      changePassword: function(userId) {
        return axios.put(this.namespace + "/" + userId + "/changePassword", data, Headers.retrieveHeaders())
      },
      ban: function(userId) {
        return axios.put(this.namespace + "/" + userId + "/ban")
      },
      unban: function(userId) {
        return axios.put(this.namespace + "/" + userId + "/unban")
      },
      changeEmail: function(userId, data) {
        return axios.post(this.namespace + "/" + userId + "/updateEmail", data, Headers.retrieveHeaders())
      },
      unapproved: function(data) {
        return axios.get("/api/roles/unapproved" + "?page=" + data.pageNumber + "&size=" + data.pageSize)
      },
      Appointment: {
        namespace: baseUrl + "users",
        completedAppointments: function(userId, pageNumber, pageSize) {
          return axios.get(this.namespace + "/" + userId + "/appointments/completedList?page=" + pageNumber + "&size=" + pageSize);
        }
      }
    },

    Appointment: {
      namespace: baseUrl + "appointments",
      view: function (appointmentId) {
        return axios.get(this.namespace + "/" + appointmentId + "/retrieve")
      },
      create: function (data) {
        return axios.post(this.namespace + "/schedule", data, Headers.retrieveHeaders())
      },
      futureAppointmentsByTelescopeID: function(telescopeID, pageNumber, pageSize) {
        return axios.get(this.namespace + "/telescopes/" + telescopeID + "/futureList?page=" + pageNumber + "&size=" + pageSize)
      },
      load: function(telescopeID) {
        return axios.get(this.namespace + "/telescopes/" + telescopeID + "/retrieve")
      },
      data: function(appointmentId) {
        return axios.get(this.namespace + "/" + appointmentId + "/rf-data")
      },
      update: function(appointmentId, data) {
        return axios.put("/api/appointments/" + appointmentId, data, Headers.retrieveHeaders())
      },
      cancel: function(appointmentId) {
        return axios.put("/api/appointments/" + appointmentId + "/cancel")
      },
      completedAppointments: function(userId, pageNumber, pageSize) {
        return axios.get("/api/users/" + userId + "/appointments/completedList?page=" + pageNumber + "&size=" + pageSize);
      },
      futureAppointments: function(userId, pageNumber, pageSize) {
        return axios.get("/api/users/" + userId + "/appointments/futureList?page=" + pageNumber + "&size=" + pageSize);
      },
      publicAppointments: function(page, size) {
        return axios.get(this.namespace + "/publicCompleted?page=" + page + "&size=" + size)
      }
    },
    Log: {
      viewLogs: function(pageNumber, pageSize){
        return axios.get("/api/logs?pageNumber=" + pageNumber + "&pageSize=" + pageSize)
      },
      retrieveErrors: function(id){
        return axios.get("/api/logs/" + id + "/errors")
      }
    },
    Auth: {
      User: function() {
        return axios.get(baseUrl + "auth")
      },
      Admin: function() {
        return axios.get(baseUrl + "authAdmin")
      }
    },

    login: function(data) {
      return axios.post(baseUrl + "login?email=" + data.username.value + "&password=" + data.password.value, JSON.stringify(data), Headers.retrieveHeaders())
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