<template>
  <div class="page-container">
    <h2>Dynamic Route - User Profile</h2>

    <!-- Example: Dynamic Route Parameters -->
    <div class="example-item">
      <h3>Accessing Route Parameters</h3>

      <div class="code-output-pair">
        <div class="code-section">
          <h4>Router Configuration:</h4>
          <pre v-pre><code class="language-javascript">const routes = [
  {
    path: '/user/:id',
    component: UserProfile
  }
]</code></pre>

          <h4>Component Code:</h4>
          <pre v-pre><code class="language-markup">&lt;template&gt;
  &lt;div&gt;
    &lt;h3&gt;User Profile&lt;/h3&gt;
    &lt;p&gt;User ID: {{ $route.params.id }}&lt;/p&gt;
    &lt;p&gt;User Data: {{ userData }}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return {
      userId: this.$route.params.id,
      userData: null
    }
  },
  mounted() {
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      // Simulate fetching user data
      this.userData = `Data for user ${this.userId}`
    }
  }
}
&lt;/script&gt;</code></pre>
        </div>

        <div class="output-section">
          <h4>Output:</h4>
          <div class="output-box">
            <h3>User Profile</h3>
            <p><strong>User ID:</strong> {{ $route.params.id }}</p>
            <p><strong>User Data:</strong> {{ userData }}</p>

            <div class="user-links">
              <p><strong>Try different users:</strong></p>
              <router-link to="/user/1">User 1</router-link>
              <router-link to="/user/2">User 2</router-link>
              <router-link to="/user/3">User 3</router-link>
              <router-link to="/user/100">User 100</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Example: Using Route Params in Methods -->
    <div class="example-item">
      <h3>User Information</h3>

      <div class="output-box">
        <div class="user-info">
          <p><strong>Current Route:</strong> {{ $route.path }}</p>
          <p><strong>User ID from params:</strong> {{ userId }}</p>
          <p><strong>Fetched Data:</strong> {{ userData }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {
      userId: this.$route.params.id,
      userData: null,
    };
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      // Simulate API call to fetch user data
      console.log("Fetching user:", this.userId);
      this.userData = `Loaded data for user ${this.userId}`;
    },
  },
  watch: {
    "$route.params.id"(newId) {
      // Update when route parameter changes
      this.userId = newId;
      this.fetchUser();
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

.output-box h3 {
  color: #42b983;
  margin-top: 0;
}

.output-box p {
  margin: 10px 0;
}

.user-links {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #ddd;
}

.user-links a {
  display: inline-block;
  margin: 5px 10px 5px 0;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.user-links a:hover {
  background-color: #35a372;
}

.user-links a.router-link-active {
  background-color: #2c3e50;
}

.user-info {
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
}

.user-info p {
  margin: 8px 0;
}

@media (max-width: 768px) {
  .code-output-pair {
    grid-template-columns: 1fr;
  }

  .user-links a {
    display: block;
    margin: 5px 0;
  }
}
</style>
