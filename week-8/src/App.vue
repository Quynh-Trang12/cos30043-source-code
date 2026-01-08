<template>
  <div class="app-container">
    <!-- Navigation -->
    <nav class="navigation">
      <h1>Week 8: Application Programming Interface (API) 1</h1>
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

    <!-- Example 1: jQuery $.getJSON() -->
    <section v-if="currentExample === 0" class="example-section">
      <h2>{{ examples[0].name }}</h2>

      <div class="example-item">
        <h3>1. Basic $.getJSON() Request</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>JavaScript Code:</h4>
            <pre
              v-pre
            ><code class="language-javascript">$.getJSON('https://jsonplaceholder.typicode.com/users',
  function(data) {
    console.log(data)
    // data is already parsed as JavaScript object
  }
)</code></pre>

            <h4>Template Code:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;button @click="fetchUsers"&gt;Load Users&lt;/button&gt;
&lt;div v-if="loading"&gt;Loading...&lt;/div&gt;
&lt;ul v-else-if="users.length"&gt;
  &lt;li v-for="user in users" :key="user.id"&gt;
    {{ user.name }} - {{ user.email }}
  &lt;/li&gt;
&lt;/ul&gt;</code></pre>

            <h4>Vue Component Usage:</h4>
            <pre v-pre><code class="language-javascript">methods: {
  fetchUsers() {
    this.loading = true
    $.getJSON('https://jsonplaceholder.typicode.com/users',
      (data) => {
        this.users = data
        this.loading = false
      }
    )
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <div class="output-box">
              <button @click="fetchUsersJQuery">Load Users (jQuery)</button>
              <div v-if="jqueryLoading">Loading...</div>
              <ul v-else-if="jqueryUsers.length">
                <li v-for="user in jqueryUsers.slice(0, 5)" :key="user.id">
                  {{ user.name }} - {{ user.email }}
                </li>
              </ul>
              <p class="note">Loaded {{ jqueryUsers.length }} users</p>
            </div>
          </div>
        </div>
      </div>

      <div class="example-item">
        <h3>2. $.getJSON() with Error Handling</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>JavaScript Code:</h4>
            <pre
              v-pre
            ><code class="language-javascript">$.getJSON('https://jsonplaceholder.typicode.com/users')
  .done(function(data) {
    console.log('Success:', data)
  })
  .fail(function(jqXHR, textStatus, error) {
    console.error('Error:', error)
  })
  .always(function() {
    console.log('Request completed')
  })</code></pre>
          </div>

          <div class="output-section">
            <h4>Explanation:</h4>
            <div class="info-box">
              <p><strong>.done():</strong> Executes on success</p>
              <p><strong>.fail():</strong> Executes on error</p>
              <p><strong>.always():</strong> Always executes (like finally)</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Example 2: fetch() API -->
    <section v-if="currentExample === 1" class="example-section">
      <h2>{{ examples[1].name }}</h2>

      <div class="example-item">
        <h3>1. Basic fetch() GET Request</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>JavaScript Code:</h4>
            <pre
              v-pre
            ><code class="language-javascript">fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })</code></pre>

            <h4>Data Setup:</h4>
            <pre v-pre><code class="language-javascript">data() {
  return {
    users: [],
    loading: false
  }
}</code></pre>

            <h4>Template Code:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;button @click="fetchUsers"&gt;Load Users&lt;/button&gt;
&lt;div v-if="loading"&gt;Loading...&lt;/div&gt;
&lt;ul v-else-if="users.length"&gt;
  &lt;li v-for="user in users" :key="user.id"&gt;
    {{ user.name }}
  &lt;/li&gt;
&lt;/ul&gt;</code></pre>

            <h4>Vue Component Usage:</h4>
            <pre v-pre><code class="language-javascript">methods: {
  fetchUsers() {
    this.loading = true
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        this.users = data
        this.loading = false
      })
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <div class="output-box">
              <button @click="fetchUsersFetch">Load Users (fetch)</button>
              <div v-if="fetchLoading">Loading...</div>
              <ul v-else-if="fetchUsers.length">
                <li v-for="user in fetchUsers.slice(0, 5)" :key="user.id">
                  {{ user.name }} - {{ user.email }}
                </li>
              </ul>
              <p class="note">Loaded {{ fetchUsers.length }} users</p>
            </div>
          </div>
        </div>
      </div>

      <div class="example-item">
        <h3>2. fetch() with Error Handling</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>JavaScript Code:</h4>
            <pre
              v-pre
            ><code class="language-javascript">fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return response.json()
  })
  .then(data => {
    console.log('Success:', data)
  })
  .catch(error => {
    console.error('Error:', error.message)
  })
  .finally(() => {
    console.log('Request completed')
  })</code></pre>

            <h4>Data Setup:</h4>
            <pre v-pre><code class="language-javascript">data() {
  return {
    users: [],
    loading: false,
    errorMessage: ''
  }
}</code></pre>

            <h4>Vue Methods:</h4>
            <pre v-pre><code class="language-javascript">methods: {
  fetchWithError() {
    this.loading = true
    this.errorMessage = ''

    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        this.users = data
      })
      .catch(error => {
        this.errorMessage = error.message
      })
      .finally(() => {
        this.loading = false
      })
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <div class="output-box">
              <button @click="fetchWithError">
                Load Users (with error handling)
              </button>
              <div v-if="errorLoading">Loading...</div>
              <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
              <ul v-else-if="errorUsers.length">
                <li v-for="user in errorUsers.slice(0, 5)" :key="user.id">
                  {{ user.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Example 3: HTTP Methods (CRUD) -->
    <section v-if="currentExample === 2" class="example-section">
      <h2>{{ examples[2].name }}</h2>

      <div class="example-item">
        <h3>1. POST Request - Create User</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>JavaScript Code:</h4>
            <pre
              v-pre
            ><code class="language-javascript">fetch('https://jsonplaceholder.typicode.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Alice',
    email: 'alice@example.com'
  })
})
  .then(response => response.json())
  .then(data => console.log('Created:', data))</code></pre>

            <h4>Data Setup:</h4>
            <pre v-pre><code class="language-javascript">data() {
  return {
    newUser: {
      name: '',
      email: ''
    },
    createdUser: null
  }
}</code></pre>

            <h4>Vue Methods:</h4>
            <pre v-pre><code class="language-javascript">methods: {
  createUser() {
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.newUser)
    })
      .then(response => response.json())
      .then(data => {
        this.createdUser = data
        this.newUser = { name: '', email: '' }
      })
  }
}</code></pre>

            <h4>Template Code:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;input v-model="newUser.name" placeholder="Name"&gt;
&lt;input v-model="newUser.email" placeholder="Email"&gt;
&lt;button @click="createUser"&gt;Create User&lt;/button&gt;
&lt;div v-if="createdUser" class="success"&gt;
  Created: {{ createdUser.name }} (ID: {{ createdUser.id }})
&lt;/div&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <div class="output-box">
              <input v-model="newUser.name" placeholder="Name" />
              <input v-model="newUser.email" placeholder="Email" />
              <button @click="createUser">Create User (POST)</button>
              <div v-if="createdUser" class="success">
                Created user: {{ createdUser.name }} (ID: {{ createdUser.id }})
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="example-item">
        <h3>2. PUT Request - Update User</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>JavaScript Code:</h4>
            <pre
              v-pre
            ><code class="language-javascript">fetch('https://jsonplaceholder.typicode.com/users/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Alice Updated',
    email: 'alice.new@example.com'
  })
})
  .then(response => response.json())
  .then(data => console.log('Updated:', data))</code></pre>

            <h4>Data Setup:</h4>
            <pre v-pre><code class="language-javascript">data() {
  return {
    updateUser: {
      name: ''
    },
    updatedUser: null
  }
}</code></pre>

            <h4>Vue Methods:</h4>
            <pre v-pre><code class="language-javascript">methods: {
  updateUserData() {
    fetch('https://jsonplaceholder.typicode.com/users/1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: this.updateUser.name })
    })
      .then(response => response.json())
      .then(data => {
        this.updatedUser = data
      })
  }
}</code></pre>

            <h4>Template Code:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;input v-model="updateUser.name" placeholder="New Name"&gt;
&lt;button @click="updateUserData"&gt;Update User 1&lt;/button&gt;
&lt;div v-if="updatedUser" class="success"&gt;
  Updated: {{ updatedUser.name }}
&lt;/div&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <div class="output-box">
              <input v-model="updateUser.name" placeholder="New Name" />
              <button @click="updateUserData">Update User 1 (PUT)</button>
              <div v-if="updatedUser" class="success">
                Updated: {{ updatedUser.name }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="example-item">
        <h3>3. DELETE Request - Remove User</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>JavaScript Code:</h4>
            <pre
              v-pre
            ><code class="language-javascript">fetch('https://jsonplaceholder.typicode.com/users/1', {
  method: 'DELETE'
})
  .then(response => {
    if (response.ok) {
      console.log('User deleted')
    }
  })</code></pre>

            <h4>Data Setup:</h4>
            <pre v-pre><code class="language-javascript">data() {
  return {
    deleteMessage: ''
  }
}</code></pre>

            <h4>Vue Methods:</h4>
            <pre v-pre><code class="language-javascript">methods: {
  deleteUser() {
    fetch('https://jsonplaceholder.typicode.com/users/1', {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          this.deleteMessage = 'User deleted successfully'
        }
      })
  }
}</code></pre>

            <h4>Template Code:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;button @click="deleteUser"&gt;Delete User 1&lt;/button&gt;
&lt;div v-if="deleteMessage" class="success"&gt;
  {{ deleteMessage }}
&lt;/div&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <div class="output-box">
              <button @click="deleteUser">Delete User 1 (DELETE)</button>
              <div v-if="deleteMessage" class="success">
                {{ deleteMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Example 4: Promises -->
    <section v-if="currentExample === 3" class="example-section">
      <h2>{{ examples[3].name }}</h2>

      <div class="example-item">
        <h3>Understanding Promises</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Promise States:</h4>
            <pre
              v-pre
            ><code class="language-javascript">// Promise has 3 states:
// 1. Pending - Initial state
// 2. Fulfilled - Operation completed successfully
// 3. Rejected - Operation failed

fetch(url)  // Returns Promise (Pending)
  .then()   // Handles Fulfilled
  .catch()  // Handles Rejected</code></pre>

            <h4>Promise Chaining:</h4>
            <pre v-pre><code class="language-javascript">fetch(url)
  .then(response => response.json())  // Returns Promise
  .then(data => console.log(data))    // Handles data
  .catch(error => console.error(error)) // Handles errors</code></pre>
          </div>

          <div class="output-section">
            <h4>Explanation:</h4>
            <div class="info-box">
              <p><strong>Pending:</strong> Waiting for operation to complete</p>
              <p>
                <strong>Fulfilled:</strong> Operation succeeded, .then()
                executes
              </p>
              <p>
                <strong>Rejected:</strong> Operation failed, .catch() executes
              </p>
              <p>
                <strong>Chaining:</strong> Each .then() can return a value for
                the next .then()
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      currentExample: 0,
      examples: [
        { name: "jQuery $.getJSON()" },
        { name: "fetch() API" },
        { name: "HTTP Methods (CRUD)" },
        { name: "Promises" },
      ],

      // jQuery example data
      jqueryUsers: [],
      jqueryLoading: false,

      // fetch example data
      fetchUsers: [],
      fetchLoading: false,

      // Error handling example
      errorUsers: [],
      errorLoading: false,
      errorMessage: "",

      // POST example
      newUser: {
        name: "",
        email: "",
      },
      createdUser: null,

      // PUT example
      updateUser: {
        name: "",
      },
      updatedUser: null,

      // DELETE example
      deleteMessage: "",
    };
  },
  methods: {
    // jQuery $.getJSON() example
    fetchUsersJQuery() {
      this.jqueryLoading = true;
      $.getJSON("https://jsonplaceholder.typicode.com/users", (data) => {
        this.jqueryUsers = data;
        this.jqueryLoading = false;
      });
    },

    // fetch() basic example
    fetchUsersFetch() {
      this.fetchLoading = true;
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
          this.fetchUsers = data;
          this.fetchLoading = false;
        });
    },

    // fetch() with error handling
    fetchWithError() {
      this.errorLoading = true;
      this.errorMessage = "";

      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          this.errorUsers = data;
        })
        .catch((error) => {
          this.errorMessage = error.message;
        })
        .finally(() => {
          this.errorLoading = false;
        });
    },

    // POST request
    createUser() {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.newUser),
      })
        .then((response) => response.json())
        .then((data) => {
          this.createdUser = data;
          this.newUser = { name: "", email: "" };
          setTimeout(() => {
            this.createdUser = null;
          }, 3000);
        });
    },

    // PUT request
    updateUserData() {
      fetch("https://jsonplaceholder.typicode.com/users/1", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: this.updateUser.name }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.updatedUser = data;
          setTimeout(() => {
            this.updatedUser = null;
          }, 3000);
        });
    },

    // DELETE request
    deleteUser() {
      fetch("https://jsonplaceholder.typicode.com/users/1", {
        method: "DELETE",
      }).then((response) => {
        if (response.ok) {
          this.deleteMessage = "User deleted successfully";
          setTimeout(() => {
            this.deleteMessage = "";
          }, 3000);
        }
      });
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

.output-box button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
}

.output-box button:hover {
  background-color: #35a372;
}

.output-box input {
  padding: 8px;
  border: 1px solid #ddd;
  margin: 5px 0;
  width: 100%;
  max-width: 300px;
  display: block;
}

.output-box ul {
  padding-left: 20px;
  margin: 10px 0;
}

.output-box li {
  margin: 5px 0;
}

.note {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
  font-style: italic;
}

.error {
  color: #d32f2f;
  background-color: #ffebee;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
}

.success {
  color: #388e3c;
  background-color: #e8f5e9;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
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
