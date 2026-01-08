import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Import Prism.js for syntax highlighting
import Prism from "prismjs";
import "prismjs/themes/prism.css";

const app = createApp(App);

// Global custom directive: v-focus
app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});

// Global custom directive: v-color
app.directive("color", {
  mounted(el, binding) {
    el.style.color = binding.value;
  },
  updated(el, binding) {
    el.style.color = binding.value;
  },
});

app.use(router);
app.mount("#app");

// Initialize Prism after mount
setTimeout(() => {
  Prism.highlightAll();
}, 100);
