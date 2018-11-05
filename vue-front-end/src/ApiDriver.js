const axios = require('axios');
import Headers from './utils/Headers';

let baseUrl = "/api/"
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
      login: function (data) {
        return axios.post("/api/login?email=" + data.username.value + "&password=" + data.password.value, JSON.stringify(data), Headers.retrieveHeaders())
      },
      logout: function () {
        return axios.post("/api/logout", {}, Headers.retrieveHeaders())
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
      requestPasswordReset(data) {
        return axios.post("/api/requestPasswordReset", data, Headers.retrieveHeaders())
      },
      resetPassword(data, token) {
        return axios.post("/api/resetPassword?token=" + token, data, Headers.retrieveHeaders())
      },
      ban: function(userId){
        return axios.put(this.namespace + "/" + userId + "/ban")
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
      completedAppointments: function(userId, pageNumber, pageSize) {
        return axios.get("/api/users/" + userId + "/appointments/completedList?page=" + pageNumber + "&size=" + pageSize);
      }
  },
    Auth: {
      User: function() {
        return axios.get("/api/auth")
      },
      Admin: function() {
        return axios.get("/api/authAdmin")
      }
    }

}