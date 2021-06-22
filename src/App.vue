<template>
  <main>
    <div class="sidebar" :class="{ opened: openedMenu }">
      <div class="menu-link-wrapper" @click="openDrawer">
        <div class="menu-link" :class="{ 'menu-trigger-open': openedMenu }">
          <span class="lines"></span>
        </div>
      </div>

      <div class="sidebar-wrapper">
        <profile-list />
      </div>
    </div>

    <div class="main">
      <router-view :key="$route.fullPath" v-slot="{ Component }">
        <transition name="fade" appear>
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </main>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import ProfileList from "@/components/ProfileList.vue";
export default {
  components: {
    ProfileList,
  },
  setup() {
    const store = useStore();
    let openedMenu = ref(false);
    const openDrawer = () => {
      openedMenu.value = !openedMenu.value;
    };
    onMounted(async () => {
      await store.dispatch("auth/getAuthState");
    });
    return {
      user: computed(() => store.state.auth.user),
      openedMenu,
      openDrawer,
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  flex-flow: row nowrap;
  min-height: 100vh;
}

.sidebar {
  position: relative;
  width: 100%;
  max-width: 31.25%;
  background: #e5e5e5;
  max-height: 100vh;
  &.opened {
    transform: translateX(0);
  }
  @media screen and (max-width: 1600px) {
    position: fixed;
	max-width: 50%;
    min-height: 100vh;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    transition: all 0.3s ease;
    z-index: 1;
  }
   .sidebar-wrapper {
    overflow-y: scroll;
	max-height: 100vh;
    padding: 0px 40px;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.25);
    }
    &::-webkit-scrollbar-thumb {
      background-color: #b3b3b3;
    }
  }
}

.main {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
