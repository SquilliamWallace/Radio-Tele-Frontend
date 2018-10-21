const axios = require('axios');
import Promise from 'bluebird';
import router from './router';
import headers from './utils/headers';

function wrapPromise(promise) {
  return new Promise((resolve, reject) => {
    promise
      .then(response => {
        let result = response.data;
        if (result.status === 'success') resolve(result.data);
        else {
          let er = Error(result.message);
          er.data = result.data;
          reject(er);
        }
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
}

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
       }
    },

    Auth : function() {
      return axios.get("/api/auth")
    }
}