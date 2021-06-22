<template>
  <router-link :to="`/user/${profile.id}`" class="profile--card">
    <picture class="profile--card__picture">
      <!-- <source srcset="../assets/img/webp/avatar.webp" type="image/webp" /> -->
      <source :srcset="photo" type="image/jpeg" />
      <img
        src="#"
        alt="profile picture"
        width="85"
        height="85"
        loading="lazy"
      />
    </picture>
    <div class="profile--card__info">
      <span class="profile--card__name">{{
        `${profile.main.name.value.split(" ")[1]}  ${
          profile.main.name.value.split(" ")[0]
        } `
      }}</span>
      <span class="profile--card__position">{{
        profile.main["position"].value
      }}</span>
    </div>
    <profile-percentage :profile="profile" :key="profile" type="radial" />
  </router-link>
</template>

<script>
import { computed } from "vue";
import ProfilePercentage from "./Profile-percentage.vue";
export default {
  components: { ProfilePercentage },
  props: {
    id: Number,
    name: String,
    position: String,
    profile: Object,
  },
  setup(props) {
    const photo = computed(() =>
      props.profile.photos.photoFirst.value.length > 0
        ? props.profile.photos.photoFirst.value
        : require("@/assets/img/empty-avatar.jpg")
    );
    return {
      photo,
    };
  },
};
</script>

<style lang="scss" scoped>
.profile--card {
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
  justify-content: flex-start;
  overflow: hidden;
  padding: 30px 40px;
  margin: 0 0 27px 0;
  background: white;
  box-shadow: 0px 10px 15px rgba(145, 145, 145, 0.1);
  border-radius: 20px;

  &__picture,
  ~ img {
    display: block;
    img {
      border-radius: 100%;
      object-fit: cover;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    margin: 0 24px;
    color: #333;
  }

  &__name {
    font-size: 22px;
    line-height: 21px;
    margin-bottom: 13px;
  }

  &__position {
    font-size: 18px;
    line-height: 17px;
  }
}
</style>
