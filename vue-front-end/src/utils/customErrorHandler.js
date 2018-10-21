export default {
    populateError: function(field, msg) {
        console.log(msg)
        field.hasError = true
        field.errorMessage = msg

        console.log(field)
    }
}