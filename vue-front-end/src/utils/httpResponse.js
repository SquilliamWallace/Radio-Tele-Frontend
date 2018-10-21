import router from '../router'

export default {
    then: function(response, successHandler, errorHandler) {
        let data = response.data
        let statusCode = data.statusCode

        if (!statusCode) {
            router.push("/home")
        } else if (parseInt(statusCode) === 200) {
            successHandler(data);
        } else if (data.errors) {
            errorHandler(data.errors)
        }
    }
}