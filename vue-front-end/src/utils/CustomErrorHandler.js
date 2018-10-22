export default {
    populateError: function(field, msg) {
        field.hasError = true;
        field.errorMessage = msg;
    },
    clearError: function(field) {
        field.hasError = false;
        field.errorMessage = "";
    }
}