import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

// Import Prism.js for syntax highlighting
import Prism from "prismjs";
import "prismjs/themes/prism.css";

const app = createApp(App);
app.use(store);
app.mount("#app");

// Initialize Prism after mount
setTimeout(() => {
  Prism.highlightAll();
}, 100);
