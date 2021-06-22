// import firebase from "firebase/app";
import { initializeApp } from '@firebase/app'

export const firebaseApp = initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
})


// const db = getFirestore(firebaseApp);

// const profilesCollection = query(collection(db, "profiles"))

// const getProfileInCollection = (id) => doc(db, "profiles", id)



// export const createProfile = profile => {
//   return addDoc(collection(db, "profiles"), profile)
// };

// export const getProfile = async id => {
//   if ( id !== undefined){
//     const profile = await getDoc(getProfileInCollection(id));
//     return profile.exists ? profile.data() : null;
//   }
// };

// export const updateProfile = (id, profile) => {
//   return updateDoc(getProfileInCollection(id), profile);
// };

// export const deleteProfile = async id => {
//   return await deleteDoc(getProfileInCollection(id));
// };

// export const useLoadProfiles = async () => {
//   const profiles = ref([])
//   const querySnapshot = await getDocs(profilesCollection);
//   querySnapshot.forEach(snapshot => {
//     profiles.value.push({ id: snapshot.id,  ...snapshot.data()})
//   });  

//   onUnmounted(profiles)

//   return profiles;
// };
