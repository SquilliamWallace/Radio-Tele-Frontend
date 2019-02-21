// Used to handle server-side scenarios
import router from '../router'
import CurrentUserValidation from './CurrentUserValidation'
export default {
    // Generic function that takes a response object, a success handler,
    // and an error handler and determines what handler to use based on
    // the return type
    then: function(response, successHandler, errorHandler) {
        let data = response.data
        let statusCode = data.statusCode
        
        // This should not happen. This means a server-side 
        // REST Controller is not returning anything!
        if (!statusCode) {
            router.push("/")
        } 
        // Success scenario
        else if (parseInt(statusCode) === 200) {
            successHandler(data);
        } 
        // Error scenario
        else if (data.errors) {
            errorHandler(statusCode, data.errors)
        }
    },
    // Generic handler for when a server-side resource was not found
    notFound: function(that, errors) {
        // Set the loading flag back to false
        // This should have been set to true at the start of the API call
        that.$store.commit("loading", false);
        let error = "";

        // There will only ever be one error in this scenario
        for (var index in errors) {
            error = errors[index][0];
        }

        // Display the error message in an alert
        that.$swal({
            title: '<span style="color:#f0ead6">Error!</span>',
            html: '<span style="color:#f0ead6">' + error + '</span>',
            type: 'error',
            background: '#302f2f'
        }).then(response => {
            // When the user closes the alert, redirect them back from
            // whence they came
            CurrentUserValidation.validateCurrentUser(that.$store);
        });
    },
    // Generic error handler for an access denied scenario
    accessDenied: function(that) {
        // Set the loading flag back to false
        // This should have been set to true at the start of the API call
        that.$store.commit("loading", false);

        // Display an access denied alert
        that.$swal({
            title: '<span style="color:#f0ead6">Error!<span>',
            html: '<span style="color:#f0ead6">Access Denied<span>',
            type: 'error',
            background: '#302f2f'
        }).then(response => {
            // When the user closes the alert, redirect them back from
            // whence they came
            CurrentUserValidation.validateCurrentUser(that.$store);
        });
    },
    // Generic error handler that takes the root scope, a message, and 
    // a boolean indicating whether or not the user should be redirected
    generalError: function(that, message, redirect) {
        // Set the loading flag back to false
        // This should have been set to true at the start of the API call
        that.$store.commit("loading", false);

        // Display the error message
        that.$swal({
            title: '<span style="color:#f0ead6">Error!<span>',
            html: '<span style="color:#f0ead6">' + message + '<span>',
            type: 'error',
            background: '#302f2f'
        }).then(response => {
            // Redirect if the boolean says so
            if (redirect) {
                CurrentUserValidation.validateCurrentUser(that.$store);
            }
        });
    }
}