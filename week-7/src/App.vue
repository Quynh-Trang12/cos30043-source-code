<template>
  <div class="app">
    <header class="app-header">
      <h1>Week 7: Vite and Vue CLI - Single File Components</h1>
    </header>

    <main class="app-main">
      <div class="tabs">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          @click="activeTab = index"
          :class="{ active: activeTab === index }"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Tab 1: SFC Anatomy -->
      <section v-if="activeTab === 0" class="tab-content">
        <h2>Single File Component Anatomy</h2>

        <div class="example-section">
          <h3>Complete SFC Structure</h3>
          <div class="code-output-pair">
            <div class="code-section">
              <h4>UserCard.vue - Complete SFC:</h4>
              <pre v-pre><code>&lt;template&gt;
  &lt;div class="user-card"&gt;
    &lt;h2&gt;{{ user.name }}&lt;/h2&gt;
    &lt;p&gt;Email: {{ user.email }}&lt;/p&gt;
    &lt;button @click="sendMessage"&gt;Contact&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  name: 'UserCard',
  props: {
    user: Object
  },
  methods: {
    sendMessage() {
      console.log('Sending message to', this.user.name)
    }
  }
}
&lt;/script&gt;

&lt;style scoped&gt;
.user-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
}

h2 {
  color: #42b983;
}

button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
&lt;/style&gt;</code></pre>
            </div>

            <div class="output-section">
              <h4>Rendered Component:</h4>
              <UserCard :user="sampleUser" />
            </div>
          </div>
        </div>

        <div class="example-section">
          <h3>Scoped vs Global Styles</h3>
          <div class="code-output-pair">
            <div class="code-section">
              <h4>Scoped Styles:</h4>
              <pre v-pre><code>&lt;!-- Only affects this component --&gt;
&lt;style scoped&gt;
h2 { color: red; }
&lt;/style&gt;

&lt;!-- Affects all components --&gt;
&lt;style&gt;
* { box-sizing: border-box; }
&lt;/style&gt;</code></pre>
            </div>

            <div class="output-section">
              <h4>Explanation:</h4>
              <div class="info-box">
                <p>
                  <strong>Scoped styles:</strong> Only apply to this component's
                  elements
                </p>
                <p>
                  <strong>Global styles:</strong> Apply to entire application
                </p>
                <p>
                  <strong>How it works:</strong> Vue adds unique attributes to
                  elements
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 2: Project Structure -->
      <section v-if="activeTab === 1" class="tab-content">
        <h2>Vite Project Structure</h2>

        <div class="example-section">
          <h3>Folder Organization</h3>
          <div class="code-output-pair">
            <div class="code-section">
              <h4>Project Structure:</h4>
              <pre v-pre><code>my-vue-app/
├── node_modules/       # Dependencies
├── public/             # Static assets
│   └── favicon.ico
├── src/
│   ├── assets/         # Images, fonts
│   ├── components/     # Vue components
│   ├── App.vue         # Root component
│   └── main.js         # Entry point
├── index.html          # HTML entry
├── package.json        # Project config
└── vite.config.js      # Vite config</code></pre>
            </div>

            <div class="output-section">
              <h4>Key Files Explained:</h4>
              <div class="info-box">
                <p><strong>main.js:</strong> Application entry point</p>
                <p><strong>App.vue:</strong> Root component</p>
                <p><strong>vite.config.js:</strong> Vite configuration</p>
                <p><strong>package.json:</strong> Dependencies and scripts</p>
              </div>
            </div>
          </div>
        </div>

        <div class="example-section">
          <h3>main.js - Entry Point</h3>
          <div class="code-output-pair">
            <div class="code-section">
              <h4>Code:</h4>
              <pre v-pre><code>import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')</code></pre>
            </div>

            <div class="output-section">
              <h4>Explanation:</h4>
              <div class="info-box">
                <p><strong>Line 1:</strong> Import Vue's createApp function</p>
                <p><strong>Line 2:</strong> Import global styles</p>
                <p><strong>Line 3:</strong> Import root component</p>
                <p><strong>Line 5:</strong> Create and mount the app</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tab 3: Build and Deploy -->
      <section v-if="activeTab === 2" class="tab-content">
        <h2>Build and Deployment</h2>

        <div class="example-section">
          <h3>NPM Scripts</h3>
          <div class="code-output-pair">
            <div class="code-section">
              <h4>package.json scripts:</h4>
              <pre v-pre><code>{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}</code></pre>

              <h4>Usage:</h4>
              <pre v-pre><code># Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview</code></pre>
            </div>

            <div class="output-section">
              <h4>What Each Command Does:</h4>
              <div class="info-box">
                <p>
                  <strong>npm run dev:</strong> Starts development server with
                  HMR
                </p>
                <p>
                  <strong>npm run build:</strong> Creates optimized production
                  build in dist/
                </p>
                <p>
                  <strong>npm run preview:</strong> Serves production build
                  locally for testing
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="example-section">
          <h3>Environment Variables</h3>
          <div class="code-output-pair">
            <div class="code-section">
              <h4>.env file:</h4>
              <pre v-pre><code># .env.development
VITE_API_URL=http://localhost:3000

# .env.production
VITE_API_URL=https://api.example.com</code></pre>

              <h4>Using in code:</h4>
              <pre v-pre><code>const apiUrl = import.meta.env.VITE_API_URL

// Use in component
async fetchData() {
  const response = await fetch(`${apiUrl}/users`)
  return response.json()
}</code></pre>
            </div>

            <div class="output-section">
              <h4>Important Notes:</h4>
              <div class="info-box">
                <p><strong>Prefix:</strong> Must start with VITE_</p>
                <p><strong>Access:</strong> Use import.meta.env.VITE_*</p>
                <p>
                  <strong>Files:</strong> .env.development and .env.production
                </p>
                <p>
                  <strong>Security:</strong> Never commit .env files with
                  secrets
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import UserCard from "./components/UserCard.vue";

export default {
  name: "App",
  components: {
    UserCard,
  },
  data() {
    return {
      activeTab: 0,
      tabs: ["SFC Anatomy", "Project Structure", "Build & Deploy"],
      sampleUser: {
        name: "Alice Johnson",
        email: "alice@example.com",
      },
    };
  },
};
</script>

<style scoped>
.app {
  min-height: 100vh;
}

.app-header {
  background-color: #42b983;
  color: white;
  padding: 20px;
  text-align: center;
}

.app-header h1 {
  margin: 0;
}

.app-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tabs button {
  padding: 10px 20px;
  background-color: white;
  border: 2px solid #42b983;
  color: #42b983;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s;
}

.tabs button:hover {
  background-color: #f0f0f0;
}

.tabs button.active {
  background-color: #42b983;
  color: white;
}

.tab-content h2 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.example-section {
  background-color: white;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.example-section h3 {
  color: #42b983;
  margin-bottom: 15px;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
}

.code-output-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 15px;
}

.code-section,
.output-section {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.code-section {
  background-color: #fffef7;
  border-left: 4px solid #f92672;
}

.output-section {
  background-color: #fafafa;
}

h4 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 14px;
  color: #75715e;
  font-weight: 600;
}

pre {
  background-color: #fffef7;
  color: #272822;
  padding: 15px;
  overflow-x: auto;
  border-radius: 4px;
  margin: 10px 0;
  border: 1px solid #e6e6e6;
}

code {
  font-family: "JetBrains Mono", "Consolas", "Monaco", "Courier New", monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #272822;
}

/* Monokai Light Syntax Highlighting */
.token.keyword {
  color: #f92672;
  font-weight: 600;
}
.token.string {
  color: #e6db74;
}
.token.function {
  color: #66d9ef;
}
.token.number {
  color: #ae81ff;
}
.token.comment {
  color: #75715e;
  font-style: italic;
}
.token.tag {
  color: #f92672;
}
.token.attr-name {
  color: #a6e22e;
}

.info-box {
  padding: 15px;
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
  border-radius: 4px;
}

.info-box p {
  margin: 8px 0;
}

.info-box strong {
  color: #1976d2;
}

@media (max-width: 768px) {
  .code-output-pair {
    grid-template-columns: 1fr;
  }

  .tabs {
    flex-direction: column;
  }

  .tabs button {
    width: 100%;
  }
}
</style>
