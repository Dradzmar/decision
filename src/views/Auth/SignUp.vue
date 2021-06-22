<template>

  <div class="login-page" v-cloak>
    <h1>Sign Up</h1>
    <form @submit.prevent="signUpAction">
      <div class="line" >
        <input name="email" type="email" 
          v-model="state.email"
          :class="state.email.length > 0 ? 'filled' : ''"
        />
        <label for="email">Email</label>
      </div>
      <div class="line">
        <input name="password" type="password" 
          v-model="state.password"
          :class="state.password.length > 0 ? 'filled' : ''"
        />
        <label for="email">Password</label>
      </div>
      <div class="line line-btns">
        <button class="btn btn-default btn-green" type="submit">Register</button>
        <span>or</span>
        <router-link to="/auth/login" class="btn btn-default btn-yellow" >Sign In</router-link>
      </div>
      
    </form>
  </div>
</template>


<script>
import { reactive } from "vue";
import { useStore } from "vuex";
export default {
  
  setup() {
    const store = useStore()
    const state = reactive({
      email : '',
      password: ''
    })


    return { 
      state, 
      signUpAction: () => store.dispatch('auth/signUpAction', state)
    }
}
}
</script>
<style lang="scss" scoped>
  .login-page, form{
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  form{
    min-width: 420px;
    * > {
     margin-bottom: 12px;
    }
  }
</style>