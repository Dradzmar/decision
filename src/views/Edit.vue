<template>
  <form class="update-profile">
    <div class="control">
      <h2>Редактирование пользователя</h2>
      <div class="btns-group">
        <button type="submit" class="btn btn-green btn-default" @click.prevent="updateProfile">
          Сохранить
        </button>
        
        <button class="btn close" @click.prevent="$router.go(-1)">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.6571 15L29.6565 2.00058C30.1142 1.5429 30.1142 0.800873 29.6565 0.343256C29.1989 -0.11436 28.4568 -0.114419 27.9992 0.343256L14.9997 13.3427L2.00033 0.343256C1.54266 -0.114419 0.800628 -0.114419 0.343012 0.343256C-0.114604 0.800931 -0.114663 1.54296 0.343012 2.00058L13.3424 15L0.343012 27.9995C-0.114663 28.4571 -0.114663 29.1992 0.343012 29.6568C0.57182 29.8856 0.871761 30 1.1717 30C1.47164 30 1.77152 29.8856 2.00039 29.6568L14.9997 16.6574L27.9991 29.6568C28.228 29.8856 28.5279 30 28.8278 30C29.1278 30 29.4277 29.8856 29.6565 29.6568C30.1142 29.1991 30.1142 28.4571 29.6565 27.9995L16.6571 15Z" fill="black"/>
          </svg>
        </button >
      </div>
    </div>




    <fieldset>
      <legend>Загрузите фото</legend>

      <div class="photo-upload" 
        v-for="(image, name, index) in form.photos" :key="index"
        :class="{filled : image.value.length > 0 }"
      >
          <picture>
            <source :srcset="image.value.length ? image.value : require('@/assets/img/empty.png')">
            <img src="#" height="326px" :alt="name" >
          </picture>
         <input class="photo" type="file" @change="onFileChange($event, name)">
         <div class="hover">
           <svg width="85" height="79" viewBox="0 0 85 79" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M66.7463 21.8731C64.2847 9.61189 53.3553 0.541626 40.7291 0.541626C26.0807 0.541626 14.1666 12.4557 14.1666 27.1041C14.1666 27.7026 14.1913 28.3154 14.2445 28.9635C6.25099 29.8135 0 36.5959 0 44.8125C0 53.5994 7.15063 60.75 15.9375 60.75H33.6459C34.6234 60.75 35.4168 59.9566 35.4168 58.9791C35.4168 58.0016 34.6234 57.2082 33.6459 57.2082H15.9375C9.10214 57.2082 3.54161 51.6479 3.54161 44.8123C3.54161 37.9768 9.10197 32.4165 15.8206 32.413C15.8985 32.4271 16.1146 32.4483 16.1925 32.4483C16.6459 32.3705 17.2054 32.2358 17.5525 31.8498C17.896 31.4602 18.0519 30.9396 17.9775 30.4261C17.7934 29.1511 17.7084 28.0957 17.7084 27.104C17.7084 14.4106 28.0359 4.08307 40.7293 4.08307C52.1015 4.08307 61.8871 12.5759 63.4915 23.8384C63.6155 24.7132 64.6 25.3331 65.4855 25.3331C74.1839 25.2091 81.4584 32.4696 81.4584 41.2706C81.4584 50.0574 74.3078 57.2081 65.5209 57.2081H47.8125C46.835 57.2081 46.0416 58.0015 46.0416 58.979C46.0416 59.9565 46.835 60.7498 47.8125 60.7498H65.5209C76.2628 60.75 85 52.0128 85 41.2709C85 31.0319 77.0596 22.6134 66.7463 21.8731Z" fill="#00CF6A"/>
            <path d="M41.4092 39.6347C40.7433 39.3549 39.9889 39.5107 39.4789 40.0172L32.3955 47.1006C31.7049 47.7912 31.7049 48.9139 32.3955 49.6046C33.0862 50.2952 34.2089 50.2952 34.8995 49.6046L38.9583 45.5458V76.6875C38.9583 77.665 39.7517 78.4584 40.7292 78.4584C41.7067 78.4584 42.5001 77.665 42.5001 76.6875V41.2709C42.5001 40.5554 42.0679 39.9073 41.4092 39.6347Z" fill="#00CF6A"/>
            <path d="M49.0627 47.104L41.9793 40.0207C41.2886 39.33 40.1659 39.33 39.4752 40.0207C38.7846 40.7113 38.7846 41.834 39.4752 42.5247L46.5586 49.6081C46.9058 49.9515 47.359 50.1252 47.8124 50.1252C48.2658 50.1252 48.719 49.9517 49.0627 49.6081C49.7533 48.9173 49.7533 47.7947 49.0627 47.104Z" fill="#00CF6A"/>
          </svg>

         </div>
      </div>

    </fieldset>

    <fieldset>
      <div class="line" v-for="(line,index) in form.main" :key="index">
         <v-input
          v-model:value="form.main[index].value"
          :value="form.main[index].value"
          :name="index"
          type="text"
          :label="line.text"
          :filled="form.main[index].value.length > 0 ? true : false"
        /> 
      </div>

    </fieldset>
  </form>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useRoute} from "vue-router";
import { useStore } from "vuex";
import vInput from "@/components/v-input.vue";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useToast } from "vue-toastification";
export default {
  components: { vInput },

  setup() {
    const route = useRoute();
    const store = useStore();
    const toast = useToast();
    const userId = computed(() => route.params.id);

    const form = reactive({
      main: {
        name:{
          text: "ФИО",
          value: ""
        },
        position:{
          text: "Должность",
          value: ""
        },
        age: {
          text: "Возраст",
          value: ""
        },
        address:{
          text: "Адрес",
          value: ""
        },
        maritalStatus:{
          text: "Семейное положение",
          value: ""
        },
      },
      service: {
        dateEdit : new Date().toLocaleDateString(),
        countEdit: null
      },
      photos: {
        photoFirst: {
          value: ""
        },
        photoSecond: {
          value: ""
        },
        photoThird: {
          value: ""
        },
      }

    });

    onMounted(async() => {
     await store.dispatch('profiles/getProfile', userId.value)
     const user = await store.getters['profiles/getProfile']
      form.main.name.value = user.main.name.value;
      form.main.position.value = user.main.position.value;
      form.main.age.value = user.main.age.value;
      form.main.address.value = user.main.address.value;
      form.main.maritalStatus.value = user.main.maritalStatus.value;
      form.service.countEdit = +user.service.countEdit + 1;

      form.photos.photoFirst.value = user.photos.photoFirst.value;
      form.photos.photoSecond.value = user.photos.photoSecond.value;
      form.photos.photoThird.value = user.photos.photoThird.value;

    });
    
    const onFileChange = (event, link) => {
        const file = event.target.files[0]
        const storage = getStorage();
        const storageRef = ref(storage, `images/${ new Date().toISOString()}${link + file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          }, 
          (error) => {
            console.log(error);
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              form.photos[link].value = downloadURL
            });
          }
        );
    }
    return { 
      form,
      onFileChange,
      updateProfile: async () => {
        await store.dispatch("profiles/updateProfile", { id: userId.value, form: {...form}} )
        toast.success("Profile saved", {
         timeout: 2000
        });
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.update-profile {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 70px 80px;
  fieldset {
    display: flex;
    flex-flow: row wrap;
    margin: 0 -40px;
    padding: 0;
    border: none;
  }
  .line {
    width: calc(33.33% - 80px);
    margin: 25px 40px;
    &.extra {
      width: calc(66.66% - 80px);
    }
  }
}
.control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .btns-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}

.photo-upload{
  position: relative;
  height: 326px;
  background: #F5F5F5;
  border: 2px dashed #c4c4c4;
  width: calc(33.33% - 80px);
  padding: 5px;
  margin: 25px 40px;
  cursor: pointer;
  &.filled{
    background: white;
    border: 2px dashed #00CF6A;
    .hover{
      background: rgba(0,0,0,.2);
      svg path{
        fill: white;
      }
    }
  }
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .hover{
    position: absolute;
    top: 5px;
    left: 5px;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    display: flex;
    align-items: center;
    justify-content: center;
    svg{
      transition: all .3s ease;
    }
  }
  &:hover{
    border: 2px dashed #00CF6A;
    .hover svg{
      transform: translateY(-15px);
      transition: all .3s ease;
    }
  }
  .photo{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
    cursor: pointer;
  }
}
</style>