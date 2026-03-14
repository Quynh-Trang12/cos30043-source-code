<template>
  <div class="page-container">
    <div class="not-found">
      <div class="error-icon">404</div>
      <h2>Page Not Found</h2>
      <p class="error-message">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <p class="error-path">
        <strong>Requested path:</strong> <code>{{ $route.path }}</code>
      </p>

      <div class="actions">
        <button @click="goHome" class="btn-home">Go to Home</button>
        <button @click="goBack" class="btn-back">Go Back</button>
      </div>
    </div>

    <div class="example-section">
      <h3>Code Example: Catch-All Route (404 Handling)</h3>

      <div class="code-output-pair">
        <div class="code-section">
          <h4>Router Configuration:</h4>
          <pre v-pre><code class="language-javascript">const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  // ... other routes ...

  // Catch-all route (must be last!)
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
]</code></pre>

          <h4>Component Code:</h4>
          <pre v-pre><code class="language-markup">&lt;template&gt;
  &lt;div class="not-found"&gt;
    &lt;h2&gt;Page Not Found&lt;/h2&gt;
    &lt;p&gt;Path: {{ $route.path }}&lt;/p&gt;
    &lt;button @click="goHome"&gt;
      Go to Home
    &lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
}
&lt;/script&gt;</code></pre>
        </div>

        <div class="output-section">
          <h4>How It Works:</h4>
          <div class="output-box">
            <p><strong>Pattern:</strong> <code>/:pathMatch(.*)*</code></p>
            <p>
              <strong>Matches:</strong> Any route not matched by other routes
            </p>
            <p>
              <strong>Important:</strong> Must be the last route in the array
            </p>

            <div class="try-section">
              <p><strong>Try these invalid routes:</strong></p>
              <router-link to="/invalid-page" class="demo-link"
                >/invalid-page</router-link
              >
              <router-link to="/does-not-exist" class="demo-link"
                >/does-not-exist</router-link
              >
              <router-link to="/random/path/here" class="demo-link"
                >/random/path/here</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  methods: {
    goHome() {
      this.$router.push("/");
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.page-container {
  padding: 20px;
}

.not-found {
  background-color: white;
  padding: 60px 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 30px;
}

.error-icon {
  font-size: 120px;
  font-weight: bold;
  color: #f92672;
  margin-bottom: 20px;
  line-height: 1;
}

.not-found h2 {
  color: #2c3e50;
  margin: 20px 0;
  font-size: 32px;
}

.error-message {
  color: #666;
  font-size: 18px;
  margin: 20px 0;
  line-height: 1.6;
}

.error-path {
  color: #555;
  margin: 20px 0;
  padding: 15px;
  background-color: #fafafa;
  border-radius: 4px;
  display: inline-block;
}

.error-path code {
  background-color: #fffef7;
  padding: 4px 8px;
  border-radius: 3px;
  color: #f92672;
  font-family: "JetBrains Mono", "Consolas", "Monaco", "Courier New", monospace;
}

.actions {
  margin-top: 30px;
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-home,
.btn-back {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.btn-home {
  background-color: #42b983;
  color: white;
}

.btn-home:hover {
  background-color: #35a372;
}

.btn-back {
  background-color: #2c3e50;
  color: white;
}

.btn-back:hover {
  background-color: #1a252f;
}

.example-section {
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.example-section h3 {
  color: #42b983;
  margin-top: 0;
  margin-bottom: 20px;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
}

.code-output-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.code-section,
.output-section {
  border: 1px solid #ddd;
  padding: 15px;
}

.code-section {
  background-color: #fffef7;
  border-left: 4px solid #f92672;
}

.output-section {
  background-color: #fafafa;
}

.code-section h4,
.output-section h4 {
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

.output-box {
  padding: 15px;
  border: 1px solid #e0e0e0;
  background-color: white;
  min-height: 100px;
}

.output-box p {
  margin: 10px 0;
}

.try-section {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #ddd;
}

.demo-link {
  display: inline-block;
  margin: 5px 10px 5px 0;
  padding: 8px 16px;
  background-color: #f92672;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.demo-link:hover {
  background-color: #e91e63;
}

@media (max-width: 768px) {
  .code-output-pair {
    grid-template-columns: 1fr;
  }

  .error-icon {
    font-size: 80px;
  }

  .not-found h2 {
    font-size: 24px;
  }

  .actions {
    flex-direction: column;
  }

  .btn-home,
  .btn-back {
    width: 100%;
  }
}
</style>
