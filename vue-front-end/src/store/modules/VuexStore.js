import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default {
    StoreFactory: function () {
        return new Vuex.Store({
            state: {
                currentUserId: null,
                isUser: false,
                isGuest: false,
                isStudent: false,
                isResearcher: false,
                isMember: false,
                isAdmin: false
            },
            mutations: {
                login(state, data) {
                    state.currentUserId = data.userId;
    
                    for (var idx in data.roles) {
                        if (data.roles[idx].authority === "ROLE_USER") {
                            state.isUser = true
                        } else if (data.roles[idx].authority === "ROLE_GUEST") {
                            state.isGuest = true
                        } else if (data.roles[idx].authority === "ROLE_STUDENT") {
                            state.isStudent = true
                        } else if (data.roles[idx].authority === "ROLE_RESEARCHER") {
                            state.isResearcher = true
                        } else if (data.roles[idx].authority === "ROLE_MEMBER") {
                            state.isMember = true
                        } else if (data.roles[idx].authority === "ROLE_ADMIN") {
                            state.isAdmin = true
                        }
                    }
                },
                logout(state) {
                    state.currentUserId = null;
                    state.isUser = false;
                    state.isGuest = false;
                    state.isStudent = false;
                    state.isResearcher = false;
                    state.isMember = false;
                    state.isAdmin = false;
                }
            }
        })
    }
}