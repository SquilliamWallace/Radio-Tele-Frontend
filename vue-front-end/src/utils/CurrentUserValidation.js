import router from '../router'
export default{
    validateCurrentUser: function(store){
        console.log(store);
        if(store.state.currentUserId){
            router.push('/authHome')
        }
        else{
            router.push('/')
        }
    }
}