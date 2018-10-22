const axios = require('axios');
import router from './router';
import headers from './utils/headers';

export default {
    //API endpoints go here
    User: {
      register: function (data) {
        return axios.post("/api/users", data, headers.retrieveHeaders());
      },
      login: function (data) {
        return axios.post("/api/login?email=" + data.username + "&password=" + data.password, JSON.stringify(data), headers.retrieveHeaders())
          .then(function (response) {
            console.log(response);
            if(response.data.includes("bundle.js")){
              router.push('/authHome');
            }
          });
      },
      get: function(userId) {
        return axios.get("/api/users/" + userId)
      },
      update: function(userId, data) {
        return axios.put("/api/users/" + userId, data, headers.retrieveHeaders())
      }
    },

    Appointment: {
      view: function (appointmentId) {
        return axios.get("/api/appointments/" + appointmentId + "/retrieve")
      },
      create: function (data) {
        return axios.post("/api/appointment", data, headers.retrieveHeaders())
      },
  },
    Auth: function() {
      return axios.get("/api/auth")
    }

}