// Used to handle user redirection when they try to access a page 
// or endpoint they are not allowed to. If they are logged in,
// redirect them back one page, otherwise, redirect to login page
import router from '../router'
export default{
    validateCurrentUser: function(store){
        if(store.state.currentUserId){
            router.go(-1);
        }
        else{
            router.push('/')
        }
    }
}