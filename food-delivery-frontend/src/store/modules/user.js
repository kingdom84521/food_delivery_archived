import _ from 'lodash'

const state = {
  _id: null,
  user_id: null,
  account: null,
  img: null,
  name: null,
  email: null,
  phone: null,
  birth: null,
  address: null,
  auth: []
}

const getters = {
  isUserSet: state => {
    return !(state._id === null);
  },
  getUserData: state => {
    let user = {
      img: '',
      name: state.name,
      email: state.email
    };
    return user;
  },
  getOrderData: state => {
    let user = {
      id: state._id,
      name: state.name,
      phone: state.phone,
      address: state.address
    };
    return user;
  },
  checkAuth: state => check => {
    return !(_.indexOf(state.auth, check) == -1);
  }
}

const actions = {
  signin({ commit }, payload) {
    commit('setUserData', payload);
  },
  signout({ commit }) {
    commit('clearUserData');
  },
  setAddress({ commit }, payload) {
    commit('updateAddress', payload)
  }
}

const mutations = {
  setUserData( state, payload ) {
    const { _id, account, name, email, phone, birth, auth, id } = payload;

    _.assign(state, {
      '_id': _id,
      'user_id': id,
      'account': account,
      'name': name,
      'email': email,
      'phone': phone,
      'birth': birth,
      'auth': auth
    });
  },
  clearUserData( state ) {
    _.forEach( state, (value, key) => {
      if ( key === 'auth' ) {
        state[ key ] = [];
      } else {
        state[ key ] = null;
      }
    });
  },
  updateAddress( state, payload ) {
    state.address = payload;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}