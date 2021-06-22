<template>
  <div class="home-page" v-if="user" v-cloak>
    <h1>Welcome {{ user?.email }}!</h1>
    <button class="btn btn-default btn-red" @click="signOutAction">
      Sign Out
    </button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "Home",
  setup() {
    const store = useStore();
    return {
      user: computed(() => store.state.auth.user),
      signOutAction: async () => {
        await store.dispatch("auth/signOutAction");
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
