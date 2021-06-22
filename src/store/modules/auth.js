
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from '@firebase/auth';
import router from "../../router"
import { ref, computed, onMounted, onUnmounted } from 'vue';


const state = {
  user: null,
  error: null,
}

const actions = {

  async getAuthState({ commit }){
    await getAuth().onAuthStateChanged(user => {
      if (user) {
        commit("setUser", user);
      } else {
        commit("setUser", null);
      }
    })
  },

  async signUpAction({ commit }, payload) {
    const auth = getAuth()
    try {
      const { user } = await createUserWithEmailAndPassword(auth, payload.email, payload.password)
      commit("setUser", user);
      router.push('/')
    } catch (e) {
      commit("setError", e.message);
    }
  },

  async signInAction({ commit }, payload) {
      const auth = getAuth()
      
      try {
        const { user } = await signInWithEmailAndPassword(auth, payload.email, payload.password)
        commit("setUser", user);
        router.push('/')
      } catch (e) {
        console.log(e);
        commit("setError", e.message);
      }
  },

  async signOutAction({ commit }){
    const auth = getAuth()
    try {
      await signOut(auth)
      commit("setUser", null);
      router.push('/auth/login')
    } catch (e) {
      commit("setError", e.message);
    }
  }
};

const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setError(state, payload) {
    state.error = payload;
  }
};


const getters = {
  getUser(state) {
    return state.user;
  },
  isUserAuth(state) {
    return !!state.user;
  },
  getError(state) {
    return state.error;
  }
};

export const useAuthState = () => {
  const user = ref(null)
  const error = ref(null)

  const auth = getAuth()
  let unsibscribe
  onMounted( () => {
    unsibscribe = onAuthStateChanged(
      auth,
      u => (user.value = u),
      e => (error.value = e)
    )
  })
  onUnmounted( () => unsibscribe() )

  const isAuthenticated = computed( () => user.value != null )

  return {user, error, isAuthenticated }
}
export const getUserState = () => 
  new Promise((resolve, reject) => 
    onAuthStateChanged(getAuth(), resolve, reject)
  )

  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }