import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
  })

export default {
    StoreFactory: function () {
        return new Vuex.Store({
            strict: true,
            state: {
                currentUserId: null,
                isUser: false,
                isGuest: false,
                isStudent: false,
                isResearcher: false,
                isMember: false,
                isAdmin: false,
                isLoading: false
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
                },
                loading(state, value) {
                    state.isLoading = value;
                }
            },
            plugins: [vuexLocal.plugin]
        })
    }
}