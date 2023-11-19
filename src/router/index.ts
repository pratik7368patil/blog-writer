import { createRouter, createWebHistory } from "vue-router";
import BlogEditor from "../components/BlogEditor.vue";
import Dashboard from "../components/Dashboard.vue";

const routes = [
  {
    name: "home",
    path: "/",
    redirect: () => {
      return { name: "dashboard" };
    },
  },
  {
    name: "dashboard",
    path: "/dashboard",
    component: Dashboard,
  },
  {
    name: "blog",
    path: "/blog/:id",
    component: BlogEditor,
  },
  {
    name: "error",
    path: "/error",
    component: { template: "<div>Error: Something went wrong!</div>" },
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
