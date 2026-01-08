<template>
  <div class="app-container">
    <!-- Navigation -->
    <nav class="navigation">
      <h1>Week 11: Vuex State Management</h1>
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

    <!-- Example 1: State & Getters -->
    <section v-if="currentExample === 0" class="example-section">
      <h2>{{ examples[0].name }}</h2>

      <div class="example-item">
        <h3>Accessing State and Getters</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Store Definition:</h4>
            <pre v-pre><code class="language-javascript">// store/index.js
const store = createStore({
  state() {
    return {
      count: 0,
      user: {
        name: 'John Doe',
        email: 'john@example.com'
      },
      todos: [...]
    }
  },
  getters: {
    doneTodos(state) {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount(state, getters) {
      return getters.doneTodos.length
    }
  }
})</code></pre>

            <h4>Component Usage:</h4>
            <pre v-pre><code class="language-javascript">export default {
  computed: {
    count() {
      return this.$store.state.count
    },
    userName() {
      return this.$store.state.user.name
    },
    doneTodos() {
      return this.$store.getters.doneTodos
    }
  }
}</code></pre>

            <h4>Template:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;p&gt;Count: {{ count }}&lt;/p&gt;
&lt;p&gt;User: {{ userName }}&lt;/p&gt;
&lt;p&gt;Done Todos: {{ doneTodos.length }}&lt;/p&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Live State:</h4>
            <div class="output-box">
              <p><strong>Count:</strong> {{ count }}</p>
              <p><strong>User:</strong> {{ userName }} ({{ userEmail }})</p>
              <p><strong>Total Todos:</strong> {{ todos.length }}</p>
              <p><strong>Done Todos:</strong> {{ doneTodos.length }}</p>
              <div class="todo-list">
                <div v-for="todo in todos" :key="todo.id" class="todo-item">
                  <span :class="{ done: todo.done }">{{ todo.text }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Example 2: Mutations -->
    <section v-if="currentExample === 1" class="example-section">
      <h2>{{ examples[1].name }}</h2>

      <div class="example-item">
        <h3>Committing Mutations</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Mutation Definitions:</h4>
            <pre v-pre><code class="language-javascript">mutations: {
  increment(state) {
    state.count++
  },
  incrementBy(state, payload) {
    state.count += payload
  },
  setUser(state, payload) {
    state.user = {
      name: payload.name,
      email: payload.email
    }
  }
}</code></pre>

            <h4>Template:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;button @click="increment"&gt;+1&lt;/button&gt;
&lt;button @click="incrementByTen"&gt;+10&lt;/button&gt;
&lt;p&gt;Count: {{ count }}&lt;/p&gt;</code></pre>

            <h4>Committing in Component:</h4>
            <pre v-pre><code class="language-javascript">methods: {
  increment() {
    this.$store.commit('increment')
  },
  incrementByTen() {
    this.$store.commit('incrementBy', 10)
  },
  updateUser() {
    this.$store.commit('setUser', {
      name: 'Jane Smith',
      email: 'jane@example.com'
    })
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <div class="output-box">
              <p><strong>Count:</strong> {{ count }}</p>
              <button @click="increment">+1 (increment)</button>
              <button @click="incrementByFive">+5 (incrementBy)</button>
              <button @click="updateUser">Update User</button>

              <div class="user-info">
                <p><strong>Current User:</strong></p>
                <p>{{ userName }}</p>
                <p>{{ userEmail }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Example 3: Actions -->
    <section v-if="currentExample === 2" class="example-section">
      <h2>{{ examples[2].name }}</h2>

      <div class="example-item">
        <h3>Dispatching Actions</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Action Definitions:</h4>
            <pre v-pre><code class="language-javascript">actions: {
  fetchUser({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = {
          name: 'Jane Smith',
          email: 'jane@example.com'
        }
        commit('setUser', user)
        resolve(user)
      }, 1000)
    })
  },
  incrementAsync({ commit }, amount) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit('incrementBy', amount)
        resolve()
      }, 500)
    })
  }
}</code></pre>

            <h4>Template:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;button @click="loadUser"&gt;Fetch User&lt;/button&gt;
&lt;p v-if="loading"&gt;Loading...&lt;/p&gt;
&lt;p&gt;User: {{ userName }}&lt;/p&gt;</code></pre>

            <h4>Dispatching in Component:</h4>
            <pre v-pre><code class="language-javascript">methods: {
  loadUser() {
    this.loading = true
    this.$store.dispatch('fetchUser')
      .then(user => {
        this.loading = false
        console.log('User loaded:', user)
      })
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <div class="output-box">
              <button @click="fetchUser" :disabled="loading">
                {{ loading ? "Loading..." : "Fetch User (async)" }}
              </button>
              <button @click="incrementAsync">+10 (async)</button>

              <div class="user-info">
                <p><strong>Count:</strong> {{ count }}</p>
                <p><strong>User:</strong> {{ userName }}</p>
                <p><strong>Email:</strong> {{ userEmail }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Example 4: Shopping Cart -->
    <section v-if="currentExample === 3" class="example-section">
      <h2>{{ examples[3].name }}</h2>

      <div class="example-item">
        <h3>Complete Vuex Example</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Cart Mutations:</h4>
            <pre v-pre><code class="language-javascript">mutations: {
  addToCart(state, product) {
    const item = state.cart.find(i => i.id === product.id)
    if (item) {
      item.quantity++
    } else {
      state.cart.push({ ...product, quantity: 1 })
    }
  },
  removeFromCart(state, productId) {
    state.cart = state.cart.filter(i => i.id !== productId)
  }
}</code></pre>

            <h4>Cart Getters:</h4>
            <pre v-pre><code class="language-javascript">getters: {
  cartTotal(state) {
    return state.cart.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  },
  cartItemCount(state) {
    return state.cart.reduce((count, item) => {
      return count + item.quantity
    }, 0)
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <div class="output-box">
              <h4>Products:</h4>
              <div
                v-for="product in products"
                :key="product.id"
                class="product-item"
              >
                <span>{{ product.name }} - ${{ product.price }}</span>
                <button @click="addToCart(product)">Add to Cart</button>
              </div>

              <h4>Shopping Cart:</h4>
              <p><strong>Items:</strong> {{ cartItemCount }}</p>
              <p><strong>Total:</strong> ${{ cartTotal.toFixed(2) }}</p>
              <div v-for="item in cart" :key="item.id" class="cart-item">
                <span>{{ item.name }} x {{ item.quantity }}</span>
                <button @click="removeFromCart(item.id)" class="btn-remove">
                  Remove
                </button>
              </div>
              <button
                v-if="cart.length > 0"
                @click="clearCart"
                class="btn-clear"
              >
                Clear Cart
              </button>
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
        { name: "State & Getters" },
        { name: "Mutations" },
        { name: "Actions" },
        { name: "Shopping Cart Example" },
      ],
      loading: false,
    };
  },
  computed: {
    // State
    count() {
      return this.$store.state.count;
    },
    userName() {
      return this.$store.state.user.name;
    },
    userEmail() {
      return this.$store.state.user.email;
    },
    todos() {
      return this.$store.state.todos;
    },
    cart() {
      return this.$store.state.cart;
    },
    products() {
      return this.$store.state.products;
    },

    // Getters
    doneTodos() {
      return this.$store.getters.doneTodos;
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    },
    cartItemCount() {
      return this.$store.getters.cartItemCount;
    },
  },
  methods: {
    // Mutations
    increment() {
      this.$store.commit("increment");
    },
    incrementByFive() {
      this.$store.commit("incrementBy", 5);
    },
    updateUser() {
      this.$store.commit("setUser", {
        name: "Jane Smith",
        email: "jane@example.com",
      });
    },
    addToCart(product) {
      this.$store.commit("addToCart", product);
    },
    removeFromCart(productId) {
      this.$store.commit("removeFromCart", productId);
    },
    clearCart() {
      this.$store.commit("clearCart");
    },

    // Actions
    fetchUser() {
      this.loading = true;
      this.$store.dispatch("fetchUser").then(() => {
        this.loading = false;
      });
    },
    incrementAsync() {
      this.$store.dispatch("incrementAsync", 10);
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
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  margin: 5px;
}

.output-box button:hover {
  background-color: #35a372;
}

.output-box button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.user-info {
  margin-top: 15px;
  padding: 10px;
  background-color: #e3f2fd;
  border-radius: 4px;
}

.todo-list {
  margin-top: 10px;
}

.todo-item {
  padding: 5px;
  margin: 3px 0;
}

.todo-item .done {
  text-decoration: line-through;
  color: #999;
}

.product-item,
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.btn-remove {
  background-color: #f44336 !important;
}

.btn-clear {
  background-color: #ff9800 !important;
  margin-top: 10px;
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
