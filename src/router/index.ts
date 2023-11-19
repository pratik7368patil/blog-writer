import { createRouter, createWebHistory } from "vue-router";
import BlogEditor from "../components/BlogEditor.vue";
import Dashboard from "../components/Dashboard.vue";
import Login from "../components/Login.vue";
import SignUp from "../components/SignUp.vue";
import Error from "../components/Error.vue";
import { user } from "../stores/user";

function authRequired(redirectPath?: Object) {
  return {
    beforeEnter: async (__: any, _: any, next: any) => {
      const verification = await user.init();
      if (verification) {
        next();
      } else {
        next(
          redirectPath
            ? redirectPath
            : {
                name: "login",
              }
        );
      }
    },
  };
}

function verifiedRoute() {
  return {
    beforeEnter: async (__: any, _: any, next: any) => {
      const verification = await user.init();
      if (verification) {
        next({ name: "dashboard" });
      } else {
        next();
      }
    },
  };
}

const routes = [
  {
    name: "home",
    path: "/",
    component: { template: `<div>Home Page</div>` },
    ...authRequired(),
  },
  {
    name: "login",
    path: "/login",
    component: Login,
    ...verifiedRoute(),
  },
  {
    name: "signup",
    path: "/signup",
    component: SignUp,
    ...verifiedRoute(),
  },
  {
    name: "dashboard",
    path: "/dashboard",
    component: Dashboard,
    ...authRequired(),
  },
  {
    name: "blog",
    path: "/blog/:id",
    component: BlogEditor,
    ...authRequired(),
  },
  {
    name: "error",
    path: "/error",
    component: Error,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
