import { createRouter, createWebHistory } from "vue-router";
import { getUserState } from "@/store/modules/auth"
// import { getAuth } from '@firebase/auth';
// import store from "../store";
// import { computed } from "vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import('@/views/Home'),
    meta: { requiresAuth: true }
  },
  {
    path: "/auth/login",
    name: "login",
    component: () => import('@/views/Auth/Login'),
    meta: { requiresUnauth: true }
  },
  {
    path: "/auth/signup",
    name: "signup",
    component: () => import('@/views/Auth/SignUp'),
    meta: { requiresUnauth: true }
  },
  {
    path: "/user/:id",
    name: "user",
    component: () => import('@/views/User'),
    meta: { requiresAuth: true }
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => import('@/views/Edit'),
    meta: { requiresAuth: true }
  },
  {
    path: "/add/",
    name: "add",
    component: () => import('../components/UserCreate')
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.beforeEach(async (to, from, next) => {

  const isAuth = await getUserState(),
        requiresAuth = to.matched.some( record => record.meta.requiresAuth),
        requiresUnauth = to.matched.some( record => record.meta.requiresUnauth)

  if (requiresAuth && !isAuth) {
    next('/auth/login')
  }
  else if (requiresUnauth && isAuth){
    next('/')
  }
  else next()
})

export default router;
