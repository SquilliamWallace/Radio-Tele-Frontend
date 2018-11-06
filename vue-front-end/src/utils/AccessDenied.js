import CurrentUserValidation from './CurrentUserValidation';

export default {
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