// Used to populate and clear error fields to display
// server-side error messages
export default {
    // Takes a form field and an error message and 
    // sets the has error flag to true and adds the
    // error message so it can be displayed
    populateError: function(field, msg) {
        field.hasError = true;
        field.errorMessage = msg;
    },
    // Takes a form field and sets the has error
    // flag to false and clears out any error message
    clearError: function(field) {
        field.hasError = false;
        field.errorMessage = "";
    }
}