import globalAxios from "axios";
import router from "../../router";

const state = {
  listOfScope: []
};

const mutations = {
  ADD_WALLET: (state, payload) => {
    state.listOfScope.push(payload);
    globalAxios
      .post(".json", state)
      .then(res => console.log(res))
      .catch(error => console.log(error));
    router.replace("/transaction/" + payload.id);
  },
  INIT_DATA_USER: (state, payload) => {
    state.id = payload.id;
    state.idToken = payload.idToken;
    state.userId = payload.userId;
    state.user = payload.user;
    state.listOfScope = payload.listOfScope;
  }
};

const actions = {
  addPayment: ({ commit }, obj) => {
    commit("ADD_NEW_MONEY", obj);
  },
  addWallet: ({ commit }, payload) => {
    commit("ADD_WALLET", payload);
  },
  initDataUser: ({ commit }) => {
    globalAxios
      .get(".json")
      .then(res => {
        const data = res.data;
        const users = [];
        for (let key in data) {
          const user = data[key];
          user.id = key;
          users.push(user);
        }
        console.log(users);
        commit("INIT_DATA_USER", users[0]);
      })
      .catch(error => console.log(error));
  }
};

const getters = {
  dataUser() {
    return state.user;
  },
  getTransactionById: state => id => {
    return state.listOfScope.filter(e => e.id === parseInt(id));
  },
  getListOfScope: state => {
    return state.listOfScope;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
