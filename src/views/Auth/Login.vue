<template>
  <div class="login-page" v-cloak>
    <h1>Login</h1>

    <form @submit.prevent="signInAction">

      <div class="line">
        <v-input
          v-model:value="state.email"
          name="email"
          type="text"
          label="Email"
          :filled="state.email.length > 0 ? true : false"
          required
        />
      </div>

      <div class="line">
        <v-input
          v-model:value="state.password"
          name="password"
          type="password"
          label="Password"
          :filled="state.password.length > 0 ? true : false"
          required
        />
      </div>
      
      <div class="line line-btns">
        <button class="btn btn-default btn-green" type="submit">Login</button>
        <span>or</span>
        <router-link to="/auth/signup" class="btn btn-default btn-yellow"
          >Sign Up</router-link
        >
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import vInput from "../../components/v-input.vue";
export default {
  components: { vInput },
  setup() {
    const store = useStore();
    const state = reactive({
      email: "",
      password: "",
    });

    return {
      state,
      signInAction: async () => {
        await store.dispatch("auth/signInAction", state);
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.login-page,
form {
  display: flex;
  align-items: center;
  flex-direction: column;
}
form {
  min-width: 420px;
  * > {
    margin-bottom: 12px;
  }
}
</style>
