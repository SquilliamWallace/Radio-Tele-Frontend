const axios = require('axios');
import Promise from 'bluebird';
import router from './router'

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
        return axios.post("/api/users", data, { headers: {'Content-Type': 'application/json' }});
      },
      login: function (data) {
        return axios.post("/api/login?email=" + data.username + "&password=" + data.password, JSON.stringify(data), { headers: {'Content-Type': 'application/json' }})
          .then(function (response) {
            console.log(response);
            if(response.data.includes("bundle.js")){
              router.push('/authHome');
            }
          });
      }
    },

    Appointment: {
      view: function () {
        return axios.get("/api/appointments/1/retrieve")
       }
    },

    Auth : function() {
      return axios.get("/api/auth")
    }
}