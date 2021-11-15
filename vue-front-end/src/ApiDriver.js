const axios = require('axios');
import Headers from './utils/Headers';
import SecretKey from './utils/SecretKey';
let baseUrl = "http://localhost:8080/api/";
//http://api.ycpradiotelescope.com:8080/api/

export default {
    //API endpoints go here
    CelestialBodies: {
      namespace: baseUrl + "celestial-bodies",
      getCBList: function(pageNumber, pageSize){
        return axios.get(this.namespace + "?page=" + pageNumber + "&size=" + pageSize, Headers.retrieveHeaders());
      },
      createCB: function(data){
        return axios.post(this.namespace, data, Headers.retrieveHeaders())
      },
      updateCB: function(celestialBodyId, data){
        console.log("just before API call: " + celestialBodyId)
        return axios.put(this.namespace + "/" + celestialBodyId, data, Headers.retrieveHeaders())
      },
      searchCB: function(pageNumber, pageSize, value, search) {
        return axios.get(this.namespace + "/search" + "?page=" + pageNumber + "&size=" + pageSize + "&value=" + value + "&search=" + search, Headers.retrieveHeaders());
      },
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
      approveOrDenyProfilePicture: function(userId, isApprove) {
        return axios.post(baseUrl + "users/" + userId + "/profile-picture?isApprove=" + isApprove, {}, Headers.retrieveHeaders());
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
      changeAllottedTime: function(userId, time){
        console.log("User id is: " + userId)
        console.log("Amount of time is: " + time)
        return axios.put(this.namespace + "/" + userId + "/allotted-time" + "?allottedTime=" + time,{}, Headers.retrieveHeaders())
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
      create: function (data, type) {
        return axios.post(this.namespace + "/schedule/" + type, data, Headers.retrieveHeaders())
      },
      request: function (data, type) {
        return axios.post(this.namespace + "/request/" + type, data, Headers.retrieveHeaders())
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
      update: function(appointmentId, data, type) {
        console.log("Appt Id: " + appointmentId + " data: " + data + " type: " + type)
        return axios.put(baseUrl + "appointments/" + appointmentId + "/" + type, data, Headers.retrieveHeaders())
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
      },
      share: function(appointmentId, email) {
        return axios.post(this.namespace + "/" + appointmentId + "/viewers?email=" + email, {}, Headers.retrieveHeaders())
      },
      appointmentSearch: function(pageNumber, pageSize, value, search) {
        return axios.get(this.namespace + "/search" + "?page=" + pageNumber + "&size=" + pageSize + "&value=" + value + "&search=" + search, Headers.retrieveHeaders());
      },
      unshare: function(appointmentId, userId) {
        return axios.delete(this.namespace + "/" + appointmentId + "/viewers?userId=" + userId, Headers.retrieveHeaders())
      },
      sharedUsers: function(appointmentId, page, size) {
        return axios.get(this.namespace + "/" + appointmentId + "/viewers?page=" + page + "&size=" + size, Headers.retrieveHeaders())
      },
      viewSpectraCyberConfig: function(spectracyberConfigId) {
        return axios.get(this.namespace + "/" + spectracyberConfigId + "/spectracyberConfig", Headers.retrieveHeaders())
      },
      updateSpectraCyberConfig: function(data) {
        return axios.put(this.namespace + "/spectracyberConfig", data, Headers.retrieveHeaders())
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
    VideoFiles: {
      namespace: baseUrl + "video-files",
      viewVideoFiles: function(lowerDate, upperDate) {
        return axios.get(this.namespace + "/" + "listBetweenCreatedDates?lowerDate=" + lowerDate + "&upperDate=" + upperDate, Headers.retrieveHeaders())
      }
    },

    SensorStatus: {
      namespace: baseUrl + "sensor-status",
      getMostRecent: function() {
        return axios.get(this.namespace + "/" + "getMostRecent", Headers.retrieveHeaders())
      }
    },
    SensorOverrides: {
      namespace: baseUrl + "sensor-overrides",
      retrieveOverrides: function() {
        return axios.get(this.namespace + "/" + "retrieve", Headers.retrieveHeaders())
      },
      updateOverride: function(sensorName, overridden) {
        return axios.post(this.namespace + "/" + sensorName + "/" + overridden, {}, Headers.retrieveHeaders())
      }
    },
    Thresholds: {
      namespace: baseUrl + "thresholds",
      retrieveThresholds: function() {
        return axios.get(this.namespace + "/" + "retrieve", Headers.retrieveHeaders())
      },
      retrieve: function (sensorName) {
        return axios.get(this.namespace + "/" + sensorName + "/retrieve", Headers.retrieveHeaders())
      },
      updateThresholdByName: function(sensorName, maximum) {
        return axios.post(this.namespace + "/" + sensorName + "/" + maximum, {}, Headers.retrieveHeaders())
      }
    },
    WeatherData: {
      namespace: baseUrl + "weather-data",
      listWeatherDataBetweenDates: function(lowerDate, upperDate) {
        return axios.get(this.namespace + "/" + "listBetweenCreatedDates?lowerDate=" + lowerDate + "&upperDate=" + upperDate, Headers.retrieveHeaders())
      }
    },
    login: function(username, password, data) {
      //return axios.post("http://api.ycpradiotelescope.com:8080/login?email=" + username + "&password=" + password, JSON.stringify(data))
      return axios.post("http://localhost:8080/login?email=" + username + "&password=" + password, JSON.stringify(data))
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
    },
    feedback(data) {
      return axios.post(baseUrl + "feedback", data, Headers.retrieveHeaders());
    },
    middlemanConnection(data) {
      return axios.get("http://rtastronomicalapi-dev.us-east-2.elasticbeanstalk.com/MiddlemanConnection" + "?key="+SecretKey.getKey() + "&command=" + data.command);
    },
    webSocket(message){
      // Create WebSocket connection.
      const socket = new WebSocket('ws://localhost:2222');

      // Connection opened
      socket.addEventListener('open', function (event) {
        socket.send(message);
      });

      // Listen for messages
      socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
      });
    }
}