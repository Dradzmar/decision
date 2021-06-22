import { createStore, createLogger } from "vuex";
import auth from './modules/auth';
import profiles from './modules/profiles';


const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    auth,
    profiles
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})