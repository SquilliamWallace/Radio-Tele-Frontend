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
      }
    },

    Appointment: {
      view: function (appointmentId) {
        return axios.get("/api/appointments/" + appointmentId + "/retrieve")
      },
      create: function (data) {
        return axios.post("/api/appointments/schedule", data, Headers.retrieveHeaders())
      },
      load: function(telescopeID) {
        return axios.post("api/appointments/telescopes/" + telescopeID + "/retrieve")
      }
  },
    Auth: function() {
      return axios.get("/api/auth")
    }

}