const axios = require('axios');
import Headers from './utils/Headers';

let baseUrl = "http://ec2-54-224-74-129.compute-1.amazonaws.com:8080/api/";
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
      ban: function(userId){
        return axios.put(this.namespace + "/" + userId + "/ban")
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
      }
    },
    Log: {
      viewLogs: function(pageNumber, pageSize){
        return axios.get("/api/logs?pageNumber=" + pageNumber + "&pageSize=" + pageSize)
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
      return axios.post(baseUrl + "login?email=" + data.username.value + "&password=" + data.password.value, JSON.stringify(data))
    },
    logout: function () {
      return axios.post(baseUrl + "logout", {}, Headers.retrieveHeaders())
    },
    requestPasswordReset(data) {
      return axios.post(baseUrl + "requestPasswordReset", data, Headers.retrieveHeaders())
    },
    resetPassword(data, token) {
      return axios.post(baseUrl + "resetPassword?token=" + token, data, Headers.retrieveHeaders())
    }
}