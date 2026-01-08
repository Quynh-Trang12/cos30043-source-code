<template>
  <div class="app-container">
    <!-- Navigation -->
    <nav class="navigation">
      <h1>Week 10: SPA Authentication and CRUD</h1>
      <div class="nav-buttons">
        <button
          v-for="(example, index) in examples"
          :key="index"
          @click="currentExample = index"
          :class="{ active: currentExample === index }"
        >
          {{ example.name }}
        </button>
      </div>
    </nav>

    <!-- Example 1: Authentication with $emit -->
    <section v-if="currentExample === 0" class="example-section">
      <h2>{{ examples[0].name }}</h2>

      <div class="example-item">
        <h3>Authentication Flow with $emit</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>LoginComponent.vue - Child Component:</h4>
            <pre v-pre><code class="language-markup">&lt;template&gt;
  &lt;form @submit.prevent="login"&gt;
    &lt;input v-model="username" placeholder="Username"&gt;
    &lt;input v-model="password" type="password"&gt;
    &lt;button type="submit"&gt;Login&lt;/button&gt;
  &lt;/form&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      // Simulate authentication
      if (this.username && this.password) {
        // Emit event to parent
        this.$emit('authenticated', true)
      }
    }
  }
}
&lt;/script&gt;</code></pre>

            <h4>App.vue - Parent Component:</h4>
            <pre v-pre><code class="language-markup">&lt;template&gt;
  &lt;LoginComponent
    v-if="!isAuthenticated"
    @authenticated="handleAuth"
  /&gt;
  &lt;Dashboard v-else /&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return {
      isAuthenticated: false
    }
  },
  methods: {
    handleAuth(status) {
      this.isAuthenticated = status
    }
  }
}
&lt;/script&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <div class="output-box">
              <LoginComponent
                v-if="!isAuthenticated"
                @authenticated="handleAuth"
              />
              <div v-else class="success">
                <p>✓ Authenticated successfully!</p>
                <button @click="logout">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Example 2: CRUD Operations -->
    <section v-if="currentExample === 1" class="example-section">
      <h2>{{ examples[1].name }}</h2>

      <div class="example-item">
        <h3>Complete CRUD Implementation</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Data Setup:</h4>
            <pre v-pre><code class="language-javascript">data() {
  return {
    users: [],
    newName: '',
    newEmail: ''
  }
}</code></pre>

            <h4>CREATE - POST Request:</h4>
            <pre v-pre><code class="language-javascript">addUser() {
  const newUser = {
    name: this.newName,
    email: this.newEmail
  }

  fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
  .then(response => response.json())
  .then(data => {
    this.users.push(data)
    this.newName = ''
    this.newEmail = ''
  })
}</code></pre>

            <h4>Template:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;form @submit.prevent="addUser"&gt;
  &lt;input v-model="newName" placeholder="Name" required&gt;
  &lt;input v-model="newEmail" placeholder="Email" required&gt;
  &lt;button type="submit"&gt;Add User (POST)&lt;/button&gt;
&lt;/form&gt;</code></pre>

            <h4>UPDATE - PUT Request:</h4>
            <pre v-pre><code class="language-javascript">updateUser(userId) {
  const updatedUser = {
    name: this.editName,
    email: this.editEmail
  }

  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedUser)
  })
  .then(response => response.json())
  .then(data => {
    const index = this.users.findIndex(u => u.id === userId)
    this.users[index] = data
    this.cancelEdit()
  })
}</code></pre>

            <h4>Template:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;div v-for="user in users" :key="user.id"&gt;
  &lt;div v-if="editingId !== user.id"&gt;
    &lt;p&gt;{{ user.name }} - {{ user.email }}&lt;/p&gt;
    &lt;button @click="startEdit(user)"&gt;Edit&lt;/button&gt;
  &lt;/div&gt;
  &lt;div v-else&gt;
    &lt;input v-model="editName"&gt;
    &lt;input v-model="editEmail"&gt;
    &lt;button @click="updateUser(user.id)"&gt;Save (PUT)&lt;/button&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>

            <h4>DELETE - DELETE Request:</h4>
            <pre v-pre><code class="language-javascript">deleteUser(userId) {
  if (!confirm('Delete this user?')) return

  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      this.users = this.users.filter(u => u.id !== userId)
    }
  })
}</code></pre>

            <h4>Template:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;div v-for="user in users" :key="user.id"&gt;
  &lt;p&gt;{{ user.name }}&lt;/p&gt;
  &lt;button @click="deleteUser(user.id)"&gt;Delete&lt;/button&gt;
&lt;/div&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <div class="output-box">
              <CrudComponent />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Example 3: Understanding $emit -->
    <section v-if="currentExample === 2" class="example-section">
      <h2>{{ examples[2].name }}</h2>

      <div class="example-item">
        <h3>$emit for Component Communication</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>What is $emit?</h4>
            <pre
              v-pre
            ><code class="language-javascript">// $emit sends events from child to parent

// In Child Component:
this.$emit('eventName', payload)

// In Parent Component:
&lt;ChildComponent @eventName="handleEvent" /&gt;

methods: {
  handleEvent(payload) {
    // Handle the event
  }
}</code></pre>

            <h4>Example - Counter Component:</h4>
            <pre v-pre><code class="language-markup">// CounterChild.vue
&lt;template&gt;
  &lt;button @click="increment"&gt;+1&lt;/button&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  methods: {
    increment() {
      this.$emit('incremented', 1)
    }
  }
}
&lt;/script&gt;

// Parent.vue
&lt;CounterChild @incremented="handleIncrement" /&gt;

methods: {
  handleIncrement(value) {
    this.count += value
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Explanation:</h4>
            <div class="info-box">
              <p>
                <strong>$emit:</strong> Sends custom events from child to parent
              </p>
              <p><strong>Syntax:</strong> this.$emit('eventName', data)</p>
              <p><strong>Listening:</strong> @eventName="handler" in parent</p>
              <p>
                <strong>Use Case:</strong> Authentication, form submission, data
                updates
              </p>
              <p>
                <strong>Benefits:</strong> Keeps components decoupled and
                reusable
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import CrudComponent from "./components/CrudComponent.vue";
import LoginComponent from "./components/LoginComponent.vue";

export default {
  name: "App",
  components: {
    LoginComponent,
    CrudComponent,
  },
  data() {
    return {
      currentExample: 0,
      examples: [
        { name: "Authentication & $emit" },
        { name: "CRUD Operations" },
        { name: "Understanding $emit" },
      ],
      isAuthenticated: false,
    };
  },
  methods: {
    handleAuth(status) {
      this.isAuthenticated = status;
    },
    logout() {
      this.isAuthenticated = false;
    },
  },
};
</script>

<style scoped>
/* Minimal CSS - Focus on functionality */

.app-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Navigation */
.navigation {
  background-color: #42b983;
  padding: 20px;
  margin-bottom: 30px;
}

.navigation h1 {
  color: white;
  margin: 0 0 15px 0;
}

.nav-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.nav-buttons button {
  padding: 10px 20px;
  background-color: white;
  border: 2px solid white;
  cursor: pointer;
}

.nav-buttons button.active {
  background-color: #2c3e50;
  color: white;
}

/* Example Sections */
.example-section {
  background-color: #f5f5f5;
  padding: 20px;
  margin-bottom: 20px;
}

.example-section h2 {
  margin-top: 0;
  color: #2c3e50;
}

.example-item {
  background-color: white;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid #ddd;
}

.example-item h3 {
  margin-top: 0;
  color: #42b983;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
}

/* Code and Output Layout */
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

/* Code Display */
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

/* Output Box */
.output-box {
  padding: 15px;
  border: 1px solid #e0e0e0;
  background-color: white;
  min-height: 100px;
}

.success {
  color: #388e3c;
  background-color: #e8f5e9;
  padding: 15px;
  border-radius: 4px;
}

.success button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
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

/* Responsive */
@media (max-width: 768px) {
  .code-output-pair {
    grid-template-columns: 1fr;
  }

  .nav-buttons {
    flex-direction: column;
  }

  .nav-buttons button {
    width: 100%;
  }
}
</style>
