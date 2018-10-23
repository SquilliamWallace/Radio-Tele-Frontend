import router from '../router'
export default{
    validateCurrentUser: function(store){
        if(store.state.currentUserId){
            router.push('/authHome')
        }
        else{
            router.push('/')
        }
    }
}