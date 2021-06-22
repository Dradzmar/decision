/* eslint-disable */ 
{/* prettier-ignore */}
import { firebaseApp } from '@/firebase'
import {
  getFirestore,
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref, onUnmounted } from "vue";
import router from "../../router"

const db = getFirestore(firebaseApp);
const profilesCollection = query(collection(db, "profiles"));
const getProfileInCollection = (id) => doc(db, "profiles", id);

const state = {
  profilesList: null,
  currentProfile: null,
  error: null,
};

const actions = {
  async getProfile({ commit }, id) {
    if (id !== undefined) {
      const profile = await getDoc(getProfileInCollection(id));
      if (profile.exists){
        commit("setCurrentProfile", {...profile.data(), percentage: calcPercentage(profile.data()) });
      } else {
        commit("setCurrentProfile", null )
      }
    }
  },

  async useLoadProfiles({ commit, getters }) {
    const profiles = ref([]);
    const querySnapshot = await getDocs(profilesCollection);
    querySnapshot.forEach((snapshot) => {
      profiles.value.push({ id: snapshot.id, ...snapshot.data(), percentage: calcPercentage(snapshot.data()) });
    });

    onUnmounted(profiles);
    commit("setProfilesList", profiles);
  },

  async createProfile({ dispatch, commit }, id){
    addDoc(collection(db, "profiles"), id);
    dispatch('useLoadProfiles')
  },
  
  async updateProfile({ dispatch, commit }, {id, form}){
    updateDoc(getProfileInCollection(id), form);
    dispatch('useLoadProfiles')
  },
  
  async deleteProfile({ dispatch, commit }, id){
    await deleteDoc(getProfileInCollection(id));
    dispatch('useLoadProfiles')
    router.push("/");
  },

};

const mutations = {
  setProfilesList(state, payload) {
    state.profilesList = payload;
  },
  setCurrentProfile(state, payload) {
    state.currentProfile = payload;
  },
};

const getters = {
  getProfilesList(state) {
    return state.profilesList;
  },
  getProfile(state) {
     return state.currentProfile;
  },
};



const isEmpty = (key) => {
  return key == '' || key == null 
}


const calcPercentage = (profile) => {
  const mainKeys = Object.keys(profile.main).map(el => profile.main[el])
  const photosKeys = Object.keys(profile.photos).map(el => profile.photos[el]) 
  const profileKeys = [...mainKeys, ...photosKeys]
  const percentagePerField = 100 / profileKeys.length
  const percentage = profileKeys.reduce((result, key) => isEmpty(key.value) ? result : result + percentagePerField, 0)
  return Math.round(percentage)
}




export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
