import router from '../router'
import CurrentUserValidation from './CurrentUserValidation'

export default {
    then: function(response, successHandler, errorHandler) {
        let data = response.data
        let statusCode = data.statusCode

        if (!statusCode) {
            router.push("/")
        } else if (parseInt(statusCode) === 200) {
            successHandler(data);
        } else if (data.errors) {
            errorHandler(statusCode, data.errors)
        }
    },
    notFound: function(that, errors) {
        console.log(errors)
        that.$store.commit("loading", false);
        let error = "";

        // There will only ever be one error in this scenario
        for (var index in errors) {
            error = errors[index][0];
        }
        
        that.$swal({
            title: '<span style="color:#f0ead6">Error!</span>',
            html: '<span style="color:#f0ead6">' + error + '</span>',
            type: 'error',
            background: '#302f2f'
        }).then(response => {
            CurrentUserValidation.validateCurrentUser(that.$store);
        });
    },
    accessDenied: function(that) {
        that.$store.commit("loading", false);
        that.$swal({
            title: '<span style="color:#f0ead6">Error!<span>',
            html: '<span style="color:#f0ead6">Access Denied<span>',
            type: 'error',
            background: '#302f2f'
        }).then(response => {
            CurrentUserValidation.validateCurrentUser(that.$store);
        });
    }
}