<template>
    <div class="tools" v-if="user">
      <button @click="state.sort == 'asc' ? state.sort = 'desc' : state.sort = 'asc' " class="btn btn-sort" aria-label="sort">
        <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="up" d="M6.42344 7.54513V25.4973H9.85136V7.54513L13.5008 11.9432L16.2749 10.1798L8.13743 0.375L0 10.1798L2.77404 11.9432L6.42344 7.54513Z" fill="#B4B4B4"/>
          <path id="down" d="M30.2282 28.205V10.2527H26.8002V28.2051L23.1502 23.8068L20.3762 25.5702L28.5142 35.375L36.6511 25.5692L33.877 23.8078L30.2282 28.205Z" fill="#B4B4B4"/>
        </svg>
      </button>
      <router-link  to="/add" class="btn btn-round btn-green" aria-label="add profile">
        <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path  d="M9.00004 0C6.24253 0 4.00002 1.83137 4.00002 4.08333V5.44445C4.00002 6.28699 4.3142 7.07029 4.8517 7.72158C2.35501 8.89758 0.666687 11.093 0.666687 13.6111V14.2917C0.666687 15.4173 1.78837 16.3333 3.1667 16.3333H10.6667C11.1275 16.3333 11.5001 16.0285 11.5001 15.6528C11.5001 15.2771 11.1275 14.9722 10.6667 14.9722H3.1667C2.7067 14.9722 2.33337 14.6667 2.33337 14.2917V13.6112C2.33337 11.4749 3.84838 9.62311 6.04671 8.73224C6.87589 9.22974 7.89504 9.52782 9.00004 9.52782C11.7576 9.52782 14.0001 7.69644 14.0001 5.44449V4.08333C14.0001 1.83137 11.7576 0 9.00004 0ZM12.3334 5.44445C12.3334 6.94575 10.8384 8.16667 9.00008 8.16667C7.16175 8.16667 5.66671 6.94575 5.66671 5.44445V4.08333C5.66671 2.58204 7.16171 1.36112 9.00004 1.36112C10.8384 1.36112 12.3334 2.58204 12.3334 4.08333L12.3334 5.44445Z" fill="white"/>
          <path  d="M19.8334 11.5695H16.5001V8.84724C16.5001 8.47158 16.1276 8.1667 15.6668 8.1667C15.206 8.1667 14.8335 8.47158 14.8335 8.84724V11.5695H11.5001C11.0392 11.5695 10.6667 11.8743 10.6667 12.25C10.6667 12.6257 11.0392 12.9305 11.5001 12.9305H14.8334V15.6528C14.8334 16.0284 15.2059 16.3333 15.6667 16.3333C16.1275 16.3333 16.5 16.0284 16.5 15.6528V12.9305H19.8334C20.2942 12.9305 20.6667 12.6257 20.6667 12.25C20.6667 11.8743 20.2943 11.5695 19.8334 11.5695Z" fill="white"/>
          </svg>
      </router-link>
    </div>

  <div class="profiles-list" v-if="user">

    <div v-if="profiles">
      <profile-card
        v-for="profile in profiles"
        :key="profile.id"
	      :profile="profile"
      />
    </div>

    <div v-else>
      <p>Empty list</p>
    </div>

  </div>
  <div class="profiles-list empty" v-else>
    <h3>
      Please, login to view profiles list !
    </h3>
  </div>
</template>

<script>
import { onMounted, reactive, computed} from 'vue'
import { useStore } from "vuex";
import ProfileCard from "@/components/ProfileCard.vue";
export default {
  name: "ProfileList",
  components: {
    ProfileCard,
  },
  setup() {
    const store = useStore()
    const state = reactive({
      profiles: null,
      sort: 'asc'
    });



    //знаю что не правильно, но по другому не сообразил
    const profiles = computed( () => {
      let arr = store.getters['profiles/getProfilesList']
      let data = []
      if ( arr == null) return arr;
      if ( state.sort == 'asc'){
        data = [...arr]
        return data.sort((a,b) => a.percentage < b.percentage ? -1 : 1)
      }else{
        data = [...arr]
        return data.sort((a,b) => a.percentage < b.percentage ? 1 : -1)
      }
    })

    onMounted(async () => {
      await store.dispatch('profiles/useLoadProfiles')
      // state.profiles = store.getters['profiles/getProfilesList']
    });



    return { 
     state,
     user: computed(() => store.state.auth.user),
     profiles
    //  profiles: computed(() => store.getters['profiles/getProfilesList'])
     };

  },
};
</script>

<style lang="scss" scoped>
.tools{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 2px solid #F0F0F0;
}
.btn.btn-round.btn-green{
  width: 40px;
  height: 40px;
}
.btn-sort{
  background: transparent;
  svg{
     overflow: visible;
    path{
      transition: all .2s ease;
    }
  }
  &:hover{
    svg{
      #up{
        transform: translateY(-4px);
        transition: all .2s ease;
      }
      #down{
        transform: translateY(4px);
        transition: all .2s ease;
      }
    }
  }
}
.profiles-list {
  display: flex;
  flex-direction: column;
  padding: 50px 0;
  &.empty{
    height: 100vh;
    padding: 0;
    align-items: center;
    justify-content: center;
  }
}
</style>
