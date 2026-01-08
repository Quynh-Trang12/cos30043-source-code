import { createApp } from "vue";
import App from "./App.vue";

// Import Prism.js for syntax highlighting
import Prism from "prismjs";
import "prismjs/themes/prism.css";

createApp(App).mount("#app");

// Initialize Prism after mount
setTimeout(() => {
  Prism.highlightAll();
}, 100);
