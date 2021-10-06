import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

const store = new Vuex.Store({
    strict: true,
    state: {
        token: null,
        currentUserId: null,
        isUser: false,
        isGuest: false,
        isStudent: false,
        isResearcher: false,
        isMember: false,
        isAdmin: false,
        isAlumni: false,
        isLoading: false,
        currentPage: "",
        information: "",
        browserType: ""
    },
    mutations: {
        embedToken(state, token) {
            state.token = token
        },
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
                } else if (data.roles[idx].authority === "ROLE_ALUMNI"){
                    state.isAlumni = true
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
            state.isAlumni = false;
            state.token = null
        },
        loading(state, value) {
            state.isLoading = value;
        },
        updateInfo(state, pageInfo) {
            state.currentPage = pageInfo.page;
            state.information = pageInfo.info;
        },
        browserInfo(state, browser) {
            state.browserType = browser;
        }
    },
    getters: {
        token: state => state.token
    },
    plugins: [vuexLocal.plugin]
})

export default store;