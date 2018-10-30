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