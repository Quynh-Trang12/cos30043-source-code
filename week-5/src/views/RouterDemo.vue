<template>
  <div class="page-container">
    <h2>Advanced Router Concepts</h2>

    <!-- Example: Named Routes -->
    <div class="example-item">
      <h3>Named Routes</h3>

      <div class="code-output-pair">
        <div class="code-section">
          <h4>Router Configuration:</h4>
          <pre v-pre><code class="language-javascript">const routes = [
  {
    path: '/user/:id',
    name: 'user',
    component: User
  }
]</code></pre>

          <h4>Navigation with Name:</h4>
          <pre
            v-pre
          ><code class="language-markup">&lt;router-link :to="{ name: 'user', params: { id: 123 } }"&gt;
  User Profile
&lt;/router-link&gt;</code></pre>
        </div>

        <div class="output-section">
          <h4>Output:</h4>
          <div class="output-box">
            <p><strong>Navigate using route names:</strong></p>
            <router-link
              :to="{ name: 'user-profile', params: { id: 123 } }"
              class="demo-link"
            >
              Go to User 123 (using name)
            </router-link>
            <router-link
              :to="{ name: 'user-profile', params: { id: 456 } }"
              class="demo-link"
            >
              Go to User 456 (using name)
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Example: Programmatic Navigation -->
    <div class="example-item">
      <h3>Programmatic Navigation</h3>

      <div class="code-output-pair">
        <div class="code-section">
          <h4>Component Code:</h4>
          <pre v-pre><code class="language-javascript">export default {
  methods: {
    goToUser(userId) {
      this.$router.push(`/user/${userId}`)
    },
    goBack() {
      this.$router.go(-1)
    },
    goHome() {
      this.$router.push('/')
    }
  }
}</code></pre>
        </div>

        <div class="output-section">
          <h4>Output:</h4>
          <div class="output-box">
            <p><strong>Navigate using JavaScript:</strong></p>
            <button @click="goToUser(789)" class="nav-button">
              Go to User 789
            </button>
            <button @click="goBack" class="nav-button">Go Back</button>
            <button @click="goHome" class="nav-button">Go Home</button>
            <button @click="goToBlog" class="nav-button">Go to Blog</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Example: Multiple Dynamic Segments -->
    <div class="example-item">
      <h3>Multiple Dynamic Segments</h3>

      <div class="code-output-pair">
        <div class="code-section">
          <h4>Router Configuration:</h4>
          <pre v-pre><code class="language-javascript">const routes = [
  {
    path: '/post/:category/:id',
    component: Post
  }
]</code></pre>

          <h4>Accessing Parameters:</h4>
          <pre v-pre><code class="language-javascript">// In component
this.$route.params.category
this.$route.params.id</code></pre>
        </div>

        <div class="output-section">
          <h4>Output:</h4>
          <div class="output-box">
            <p><strong>Current Route Info:</strong></p>
            <p v-if="$route.params.category">
              Category: <strong>{{ $route.params.category }}</strong>
            </p>
            <p v-if="$route.params.id">
              Post ID: <strong>{{ $route.params.id }}</strong>
            </p>
            <p v-if="!$route.params.category">
              <em>Navigate to a post to see parameters</em>
            </p>

            <div class="demo-links">
              <p><strong>Try these links:</strong></p>
              <router-link to="/post/tech/101" class="demo-link"
                >Tech Post 101</router-link
              >
              <router-link to="/post/news/202" class="demo-link"
                >News Post 202</router-link
              >
              <router-link to="/post/tutorial/303" class="demo-link"
                >Tutorial Post 303</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Example: Active Link Styling -->
    <div class="example-item">
      <h3>Active Link Styling</h3>

      <div class="code-output-pair">
        <div class="code-section">
          <h4>CSS Code:</h4>
          <pre v-pre><code class="language-css">.router-link-active {
  color: #42b983;
  font-weight: bold;
}

.router-link-exact-active {
  border-bottom: 2px solid #42b983;
}</code></pre>
        </div>

        <div class="output-section">
          <h4>Output:</h4>
          <div class="output-box">
            <p><strong>Active links are automatically styled:</strong></p>
            <div class="active-demo">
              <router-link to="/" class="active-link">Home</router-link>
              <router-link to="/props" class="active-link">Props</router-link>
              <router-link to="/directives" class="active-link"
                >Directives</router-link
              >
              <router-link to="/router-demo" class="active-link"
                >Router Demo</router-link
              >
            </div>
            <p class="note">The current page link will be highlighted!</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Example: Route Props -->
    <div class="example-item">
      <h3>Route Props</h3>

      <div class="code-output-pair">
        <div class="code-section">
          <h4>Router Configuration:</h4>
          <pre v-pre><code class="language-javascript">const routes = [
  {
    path: '/user/:id',
    component: User,
    props: true  // Enable route props
  }
]</code></pre>

          <h4>Component Code:</h4>
          <pre v-pre><code class="language-javascript">export default {
  props: {
    id: String
  },
  mounted() {
    console.log('User ID:', this.id)
  }
}</code></pre>
        </div>

        <div class="output-section">
          <h4>Output:</h4>
          <div class="output-box">
            <p><strong>Cleaner than $route.params!</strong></p>
            <p>
              Route props allow you to receive route parameters as component
              props, making components more reusable and testable.
            </p>
            <router-link to="/blog/post/1" class="demo-link">
              See Blog Post example (uses route props)
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RouterDemo",
  methods: {
    goToUser(userId) {
      this.$router.push(`/user/${userId}`);
    },
    goBack() {
      this.$router.go(-1);
    },
    goHome() {
      this.$router.push("/");
    },
    goToBlog() {
      this.$router.push("/blog");
    },
  },
};
</script>

<style scoped>
.page-container {
  padding: 20px;
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.example-item {
  background-color: white;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid #ddd;
}

.example-item h3 {
  color: #42b983;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
  margin-bottom: 20px;
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

.output-box {
  padding: 15px;
  border: 1px solid #e0e0e0;
  background-color: white;
  min-height: 100px;
}

.output-box p {
  margin: 10px 0;
}

.demo-link {
  display: inline-block;
  margin: 5px 10px 5px 0;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.demo-link:hover {
  background-color: #35a372;
}

.demo-link.router-link-active {
  background-color: #2c3e50;
}

.nav-button {
  display: inline-block;
  margin: 5px 10px 5px 0;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.nav-button:hover {
  background-color: #35a372;
}

.demo-links {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #ddd;
}

.active-demo {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin: 15px 0;
}

.active-link {
  padding: 8px 16px;
  text-decoration: none;
  color: #2c3e50;
  border: 2px solid #ddd;
  border-radius: 4px;
  transition: all 0.3s;
}

.active-link:hover {
  border-color: #42b983;
}

.active-link.router-link-active {
  color: #42b983;
  font-weight: bold;
}

.active-link.router-link-exact-active {
  border-bottom: 2px solid #42b983;
}

.note {
  font-size: 12px;
  color: #666;
  font-style: italic;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .code-output-pair {
    grid-template-columns: 1fr;
  }

  .active-demo {
    flex-direction: column;
  }
}
</style>
