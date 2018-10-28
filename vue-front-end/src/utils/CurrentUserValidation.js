import router from '../router'
export default{
    validateCurrentUser: function(store){
        if(store.state.currentUserId){
            router.push('/home')
        }
        else{
            router.push('/')
        }
    }
}