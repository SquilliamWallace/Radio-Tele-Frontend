const axios = require('axios');
import router from './router';
import Headers from './utils/Headers';

export default {
    //API endpoints go here
    User: {
      register: function (data) {
        return axios.post("/api/users", data, Headers.retrieveHeaders());
      },
      login: function (data) {
        return axios.post("/api/login?email=" + data.username + "&password=" + data.password, JSON.stringify(data), Headers.retrieveHeaders())
          .then(function (response) {
            if(response.data.includes("bundle.js")){
              router.push('/authHome');
            }
          });
      },
      logout: function () {
        return axios.post("/logout", {}, Headers.retrieveHeaders())
      },
      get: function(userId) {
        return axios.get("/api/users/" + userId)
      },
      update: function(userId, data) {
        return axios.put("/api/users/" + userId, data, Headers.retrieveHeaders())
      },
      allUsers: function(data) {
        return axios.get("/api/users?page=" + data.pageNumber + "&size=" + data.pageSize)
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
      } 
  },
    Auth: function() {
      return axios.get("/api/auth")
    }

}