import { createRouter, createWebHistory } from "vue-router";
import ComponentsDemo from "../views/ComponentsDemo.vue";
import DirectivesDemo from "../views/DirectivesDemo.vue";
import PropsDemo from "../views/PropsDemo.vue";
import UserProfile from "../views/UserProfile.vue";

const routes = [
  {
    path: "/",
    component: ComponentsDemo,
  },
  {
    path: "/props",
    component: PropsDemo,
  },
  {
    path: "/directives",
    component: DirectivesDemo,
  },
  {
    path: "/user/:id",
    component: UserProfile,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
