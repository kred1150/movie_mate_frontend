import { createRouter, createWebHistory } from "vue-router";
import MoviesIndex from "../views/MoviesView.vue";
import SignUpView from "../views/SignUpView.vue";
import LoginView from "../views/LoginView.vue";
import MoviesShow from "../views/MoviesShow.vue";
import RatedMoviesIndex from "../views/RatedMoviesView.vue";
import LogoutView from "../views/LogoutView.vue";
import UsersShow from "../views/UsersShow.vue";

const routes = [
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/movies",
    name: "movies-index",
    component: MoviesIndex,
  },
  {
    path: "/movies/:id",
    name: "movies-show",
    component: MoviesShow,
  },
  {
    path: "/signup",
    name: "users-create",
    component: SignUpView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/",
    name: "home",
    component: RatedMoviesIndex,
  },
  {
    path: "/rated_movies",
    name: "rated_movies-index",
    component: RatedMoviesIndex,
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
  },
  {
    path: "/users/:id",
    name: "users-show",
    component: UsersShow,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
