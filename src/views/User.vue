/* eslint-disable */ 
{/* prettier-ignore */}
<template>
  <div class="person" v-cloak>
    <div class="person-percentage">
      <p class="title">Профиль заполнен на:</p>
      <profile-percentage :profile="profile" :key="profile" type="linear" />
    </div>

    <div class="person-wrapper">
      <div class="person-info">
        <div class="person-configuration">
          <div class="ls">
            <h3>Анкетные данные</h3>

            <div class="person-stats">
              <span>обновлено:
                <span class="value">{{ profile.service?.dateEdit }}</span></span>
              <span>кол-во редакций:
                <span class="value">{{ profile.service?.countEdit }}</span></span>
            </div>
          </div>

          <div class="rs">
            <router-link
              :to="`/edit/${userId}`"
              class="btn btn-round btn-green"
              aria-label="edit"
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.685669 21.8743V27.5H6.31146L22.9113 10.9002L17.2855 5.27438L0.685669 21.8743Z" fill="white"/>
                <path d="M27.2469 4.44178L23.7438 0.938812C23.1587 0.353729 22.2061 0.353729 21.621 0.938812L18.8756 3.6842L24.5014 9.30999L27.2468 6.5646C27.8319 5.97952 27.8319 5.02686 27.2469 4.44178Z" fill="white"/>
              </svg>
            </router-link>

            <button
              class="btn btn-round btn-red"
              @click="deleteProfile"
              aria-label="delete"
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.0446 5.38737L20.2203 25.7298H6.84629L5.02242 5.38737L2.71133 5.58562L4.56852 26.2969C4.66626 27.2515 5.5127 28 6.496 28H20.5707C21.5536 28 22.4004 27.2519 22.4997 26.2833L24.3557 5.58562L22.0446 5.38737Z" fill="white"/>
                <path d="M17.7866 0H9.27998C8.21391 0 7.34663 0.848696 7.34663 1.89191V5.48652H9.6666V2.27024H17.3999V5.48647H19.7199V1.89186C19.72 0.848696 18.8527 0 17.7866 0Z" fill="white"/>
                <path d="M25.9066 4.35138H1.16001C0.519287 4.35138 0 4.85953 0 5.48652C0 6.11352 0.519287 6.62167 1.16001 6.62167H25.9067C26.5474 6.62167 27.0667 6.11352 27.0667 5.48652C27.0667 4.85953 26.5473 4.35138 25.9066 4.35138Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="person-info">

          <div class="line" v-for="(line, name, i) in profile.main" :key="renderKeys[i]">
            <div class="title">{{ profile.main[renderKeys[i]].text }}:</div>
            <div class="value">{{ profile.main[renderKeys[i]].value }}</div>
          </div>

        </div>
      </div>

      <div class="person-avatar" v-if="profile.photos">
        <picture>
         <source :srcset="profilePhoto" type="image/jpeg">
          <img src="#" alt="Profile avatar">
        </picture>
      </div>

      <div class="person-photos">
        <div class="photo" 
        v-for="(photo, name, index) in profile.photos" 
        :key="index"
        >
          <picture v-if="photo.value.length > 0"
            @click="handleChangePhoto(photo.value)"
            :class="{active : profilePhoto == photo.value}"
            >
            <source :srcset="photo.value">
            <img src="#" alt="Profile photo">
          </picture>
        </div>

      </div>
    </div>

    <router-link to="/" class="backToHome">
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.6571 15L29.6565 2.00058C30.1142 1.5429 30.1142 0.800873 29.6565 0.343256C29.1989 -0.11436 28.4568 -0.114419 27.9992 0.343256L14.9997 13.3427L2.00033 0.343256C1.54266 -0.114419 0.800628 -0.114419 0.343012 0.343256C-0.114604 0.800931 -0.114663 1.54296 0.343012 2.00058L13.3424 15L0.343012 27.9995C-0.114663 28.4571 -0.114663 29.1992 0.343012 29.6568C0.57182 29.8856 0.871761 30 1.1717 30C1.47164 30 1.77152 29.8856 2.00039 29.6568L14.9997 16.6574L27.9991 29.6568C28.228 29.8856 28.5279 30 28.8278 30C29.1278 30 29.4277 29.8856 29.6565 29.6568C30.1142 29.1991 30.1142 28.4571 29.6565 27.9995L16.6571 15Z"
          fill="black"
        />
      </svg>
    </router-link>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ProfilePercentage from "../components/Profile-percentage.vue";

export default {
  components: { ProfilePercentage },

  setup() {
    const route = useRoute();
    const userId = computed(() => route.params.id);
    const store = useStore();
    const profile = ref({});
    let profilePhoto = ref('');

    const renderKeys = ['name', 'position', 'age', 'address', 'maritalStatus']

    const deleteProfile = () => {
      store.dispatch("profiles/deleteProfile", userId.value);
    };

    const handleChangePhoto = (photo) => {
      profilePhoto.value = photo
    }

    onMounted(async () => {
      await store.dispatch("profiles/getProfile", userId.value);
      profile.value = await store.getters["profiles/getProfile"];

      profile.value.photos.photoFirst.value.length > 0 
      ? profilePhoto.value = profile.value.photos.photoFirst.value 
      : profilePhoto.value = require('@/assets/img/empty-avatar.jpg');

    });

    return {
      profile,
      // photo,
      userId,
      renderKeys,
      deleteProfile,
      profilePhoto,
      handleChangePhoto
    };
  },
};
</script>

<style lang="scss" scoped>
.person {
  position: relative;
  width: 100%;
  height: 100%;
  // padding: 123px;
  padding: 10% 10% 10% 15%;
  background: #fff;
  max-height: 100vh;
  overflow-y: scroll;
  &-wrapper {
    position: relative;
    background: #f8f9fb;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 36px 36px 36px 40%;
  }
  &-configuration {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    padding: 23px 0;
    border-bottom: 1px solid #f0f0f0;
    h3 {
      font-weight: 600;
      font-size: 30px;
      line-height: 18px;
      color: #333;
      margin: 0 0 18px 0;
    }
    .person-stats {
      .value {
        font-weight: 700;
        color: #01cc6e;
      }
      & > span {
        font-size: 14px;
        line-height: 18px;
        &:first-child {
          margin-right: 35px;
        }
      }
    }
    .ls,
    .rs {
      display: flex;
      justify-content: center;
      flex-direction: row;
    }
    .ls {
      flex-grow: 1;
      flex-direction: column;
    }
    .rs {
      border-left: 1px solid #f0f0f0;
      padding: 0 0 0 10px;
      .btn {
        margin: 0 10px;
        &:last-child{
          margin-right: 0;
        }
      }
    }
  }
  &-info{
    width: 100%;
    display: flex;
    flex-direction: column;
    // padding: 60px 0;
    padding: 40px 0;
    .line{
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 30px;
      .title{
        width: 100%;
        max-width: 144px;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 19px;
        color: #333;
      }
      .value{
        padding-left: 47px;
        font-size: 20px;
        line-height: 120%;
        color: #333;
      }
    }
  }
  &-avatar{
    position: absolute;
    top: -18%;
    left: -10%;
    height: 95%;
    width: 45%;
    picture{
      display: block;
      height: 100%;
    }
    img{
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      object-fit: cover;
    }
  }
  &-photos{
    position: absolute;
    left: 28px;
    bottom: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .photo{
      border-radius: 100%;
      transition: all .3s ease;
      &:hover{
        transform: translateY(-7px);
        transition: all .3s ease;
      }
      picture,img{
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        object-fit: cover;
      }
      picture{
        width: 84px;
        height: 84px;
        margin-right: 24px;
        border: 2px solid transparent;
        &.active{
          border: 2px solid #01CE6B;
        }
      }
    }
  }
}
.backToHome {
  position: absolute;
  right: 20px;
  top: 20px;
}
.person-percentage {
  padding-left: 40%;
  margin-bottom: 55px;
  .title {
    text-transform: lowercase;
    margin: 0 0 60px 0;
    font-size: 16px;
    line-height: 15px;
  }
}
</style>
