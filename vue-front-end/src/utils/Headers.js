import store from '../store/modules/VuexStore'

// All data sent to the back-end must be specified as application/json
// so Spring knows how to handle it
export default {
    // Return a json object with the content type specified as application/json
    retrieveHeaders: function() {
        return { 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': store.getters.token
            }
        }
    },
    //allows for new account creating without needed to update token
    retrieveNonAuthHeaders: function() {
        return { 
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
}