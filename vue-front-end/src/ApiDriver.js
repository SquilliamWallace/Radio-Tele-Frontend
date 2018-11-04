const axios = require('axios');
import router from './router';
import Headers from './utils/Headers';

export default {
    //API endpoints go here
    User: {
      activate: function(token) {
        return axios.put("/api/users/activate?token=" + token, {}, Headers.retrieveHeaders());
      },
      register: function (data) {
        return axios.post("/api/users", data, Headers.retrieveHeaders());
      },
      login: function (data) {
        return axios.post("/api/login?email=" + data.username.value + "&password=" + data.password.value, JSON.stringify(data), Headers.retrieveHeaders())
      },
      logout: function () {
        return axios.post("/api/logout", {}, Headers.retrieveHeaders())
      },
      get: function(userId) {
        return axios.get("/api/users/" + userId)
      },
      update: function(userId, data) {
        return axios.put("/api/users/" + userId, data, Headers.retrieveHeaders())
      },
      allUsers: function(data) {
        return axios.get("/api/users?page=" + data.pageNumber + "&size=" + data.pageSize)
      },
      requestPasswordReset(data) {
        return axios.post("/api/requestPasswordReset", data, Headers.retrieveHeaders())
      },
      resetPassword(data, token) {
        return axios.post("/api/resetPassword?token=" + token, data, Headers.retrieveHeaders())
      },
      ban: function(userId){
        return axios.put("/api/users/" + userId + "/ban")
      }
    },

    Appointment: {
      view: function (appointmentId) {
        return axios.get("/api/appointments/" + appointmentId + "/retrieve")
      },
      create: function (data) {
        return axios.post("/api/appointments/schedule", data, Headers.retrieveHeaders())
      },
      futureAppointmentsByTelescopeID: function(telescopeID, pageNumber, pageSize) {
        return axios.get("/api/appointments/telescopes/" + telescopeID + "/futureList?page=" + pageNumber + "&size=" + pageSize)
      },
      load: function(telescopeID) {
        return axios.get("api/appointments/telescopes/" + telescopeID + "/retrieve")
      },
      data: function(appointmentId) {
        return axios.get("/api/appointments/" + appointmentId + "/rf-data")
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