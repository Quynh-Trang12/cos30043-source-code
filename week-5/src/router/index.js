import { createRouter, createWebHistory } from "vue-router";
import BlogAuthor from "../views/BlogAuthor.vue";
import BlogHome from "../views/BlogHome.vue";
import BlogPost from "../views/BlogPost.vue";
import ComponentsDemo from "../views/ComponentsDemo.vue";
import DirectivesDemo from "../views/DirectivesDemo.vue";
import NotFound from "../views/NotFound.vue";
import PropsDemo from "../views/PropsDemo.vue";
import RouterDemo from "../views/RouterDemo.vue";
import UserProfile from "../views/UserProfile.vue";

const routes = [
  {
    path: "/",
    name: "components",
    component: ComponentsDemo,
  },
  {
    path: "/props",
    name: "props",
    component: PropsDemo,
  },
  {
    path: "/directives",
    name: "directives",
    component: DirectivesDemo,
  },
  {
    path: "/user/:id",
    name: "user-profile",
    component: UserProfile,
  },
  {
    path: "/router-demo",
    name: "router-demo",
    component: RouterDemo,
  },
  {
    path: "/blog",
    name: "blog-home",
    component: BlogHome,
  },
  {
    path: "/blog/post/:id",
    name: "blog-post",
    component: BlogPost,
    props: true, // Enable route props
  },
  {
    path: "/blog/author/:name",
    name: "blog-author",
    component: BlogAuthor,
    props: true, // Enable route props
  },
  {
    path: "/post/:category/:id",
    name: "post-detail",
    component: RouterDemo,
  },
  // Catch-all route for 404 - must be last!
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
