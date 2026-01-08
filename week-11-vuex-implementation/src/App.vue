<template>
  <div id="app">
    <header class="app-header">
      <h1>🎯 Vuex State Management Demo</h1>
      <p class="subtitle">
        Practical examples of State, Getters, Mutations & Actions
      </p>
    </header>

    <nav class="tabs">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="currentTab = index"
        :class="{ active: currentTab === index }"
      >
        {{ tab }}
      </button>
    </nav>

    <!-- Tab 1: Counter Example -->
    <div v-if="currentTab === 0" class="tab-content">
      <h2>📊 Counter - State & Mutations</h2>
      <div class="demo-section">
        <div class="state-display">
          <h3>State</h3>
          <p class="count">{{ count }}</p>
          <p class="double">Double: {{ doubleCount }}</p>
        </div>

        <div class="controls">
          <h3>Mutations</h3>
          <button @click="increment" class="btn-primary">+1 Increment</button>
          <button @click="decrement" class="btn-secondary">-1 Decrement</button>
          <button @click="incrementBy(5)" class="btn-primary">+5</button>
          <button @click="reset" class="btn-danger">Reset</button>
        </div>

        <div class="controls">
          <h3>Actions (Async)</h3>
          <button
            @click="handleIncrementAsync(10)"
            :disabled="loading"
            class="btn-success"
          >
            {{ loading ? "Loading..." : "+10 (Async)" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Tab 2: User Authentication -->
    <div v-if="currentTab === 1" class="tab-content">
      <h2>👤 User Authentication - Actions</h2>
      <div class="demo-section">
        <div v-if="!user.isLoggedIn" class="login-form">
          <h3>Login Form</h3>
          <input v-model="loginForm.name" placeholder="Name" />
          <input v-model="loginForm.email" type="email" placeholder="Email" />
          <input
            v-model="loginForm.password"
            type="password"
            placeholder="Password"
          />
          <button
            @click="handleLogin"
            :disabled="loginLoading"
            class="btn-primary"
          >
            {{ loginLoading ? "Logging in..." : "Login" }}
          </button>
          <p v-if="loginError" class="error">{{ loginError }}</p>
        </div>

        <div v-else class="user-info">
          <h3>✅ Logged In</h3>
          <p><strong>Name:</strong> {{ user.name }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <button @click="handleLogout" class="btn-danger">Logout</button>
        </div>
      </div>
    </div>

    <!-- Tab 3: Todo List -->
    <div v-if="currentTab === 2" class="tab-content">
      <h2>✅ Todo List - State & Getters</h2>
      <div class="demo-section">
        <div class="todo-input">
          <input
            v-model="newTodo"
            @keyup.enter="handleAddTodo"
            placeholder="Add a new todo..."
          />
          <button @click="handleAddTodo" class="btn-primary">Add</button>
        </div>

        <div class="stats">
          <span class="badge">Total: {{ todosCount }}</span>
          <span class="badge badge-success"
            >Completed: {{ completedTodos.length }}</span
          >
          <span class="badge badge-warning"
            >Active: {{ activeTodos.length }}</span
          >
        </div>

        <div class="todo-list">
          <div
            v-for="todo in todos"
            :key="todo.id"
            class="todo-item"
            :class="{ completed: todo.completed }"
          >
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="toggleTodo(todo.id)"
            />
            <span>{{ todo.text }}</span>
            <button @click="removeTodo(todo.id)" class="btn-remove">×</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab 4: Shopping Cart -->
    <div v-if="currentTab === 3" class="tab-content">
      <h2>🛒 Shopping Cart - Complete Example</h2>
      <div class="demo-section">
        <div class="products-grid">
          <h3>Products</h3>
          <div class="product-list">
            <div
              v-for="product in products"
              :key="product.id"
              class="product-card"
            >
              <h4>{{ product.name }}</h4>
              <p class="price">${{ product.price.toFixed(2) }}</p>
              <p class="stock">Stock: {{ product.stock }}</p>
              <button
                @click="addToCart(product)"
                :disabled="product.stock === 0"
                class="btn-primary"
              >
                {{ product.stock === 0 ? "Out of Stock" : "Add to Cart" }}
              </button>
            </div>
          </div>
        </div>

        <div class="cart-section">
          <h3>Shopping Cart</h3>
          <div class="cart-summary">
            <p><strong>Items:</strong> {{ cartItemsCount }}</p>
            <p><strong>Total:</strong> ${{ cartTotal.toFixed(2) }}</p>
          </div>

          <div v-if="cart.length === 0" class="empty-cart">Cart is empty</div>

          <div v-else class="cart-items">
            <div v-for="item in cart" :key="item.id" class="cart-item">
              <span>{{ item.name }} × {{ item.quantity }}</span>
              <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
              <button @click="removeFromCart(item.id)" class="btn-remove">
                Remove
              </button>
            </div>

            <div class="cart-actions">
              <button @click="clearCart" class="btn-secondary">
                Clear Cart
              </button>
              <button
                @click="handleCheckout"
                :disabled="checkoutLoading"
                class="btn-success"
              >
                {{ checkoutLoading ? "Processing..." : "Checkout" }}
              </button>
            </div>

            <p v-if="checkoutMessage" class="success">{{ checkoutMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {
      currentTab: 0,
      tabs: ["Counter", "User Auth", "Todo List", "Shopping Cart"],

      // Counter
      loading: false,

      // User
      loginForm: {
        name: "",
        email: "",
        password: "",
      },
      loginLoading: false,
      loginError: "",

      // Todo
      newTodo: "",

      // Cart
      checkoutLoading: false,
      checkoutMessage: "",
    };
  },

  computed: {
    // Map state
    ...mapState(["count", "user", "todos", "cart", "products"]),

    // Map getters
    ...mapGetters([
      "doubleCount",
      "completedTodos",
      "activeTodos",
      "todosCount",
      "cartTotal",
      "cartItemsCount",
    ]),
  },

  methods: {
    // Map mutations
    ...mapMutations({
      increment: "INCREMENT",
      decrement: "DECREMENT",
      incrementBy: "INCREMENT_BY",
      reset: "RESET_COUNT",
      toggleTodo: "TOGGLE_TODO",
      removeTodo: "REMOVE_TODO",
      addToCart: "ADD_TO_CART",
      removeFromCart: "REMOVE_FROM_CART",
      clearCart: "CLEAR_CART",
    }),

    // Map actions
    ...mapActions(["incrementAsync", "login", "logout", "addTodo", "checkout"]),

    // Custom methods
    async handleLogin() {
      this.loginLoading = true;
      this.loginError = "";

      try {
        await this.login(this.loginForm);
        this.loginForm = { name: "", email: "", password: "" };
      } catch (error) {
        this.loginError = error.message;
      } finally {
        this.loginLoading = false;
      }
    },

    handleLogout() {
      this.logout();
    },

    async handleIncrementAsync(amount) {
      this.loading = true;
      await this.incrementAsync(amount);
      this.loading = false;
    },

    handleAddTodo() {
      if (this.newTodo.trim()) {
        this.$store.dispatch("addTodo", this.newTodo);
        this.newTodo = "";
      }
    },

    async handleCheckout() {
      this.checkoutLoading = true;
      this.checkoutMessage = "";

      try {
        const result = await this.$store.dispatch("checkout");
        this.checkoutMessage = result.message;
        setTimeout(() => {
          this.checkoutMessage = "";
        }, 3000);
      } finally {
        this.checkoutLoading = false;
      }
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.app-header {
  text-align: center;
  padding: 30px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  margin-bottom: 30px;
}

.app-header h1 {
  margin: 0;
  font-size: 2.5em;
}

.subtitle {
  margin: 10px 0 0 0;
  opacity: 0.9;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.tabs button {
  flex: 1;
  padding: 15px 20px;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

.tabs button:hover {
  background: #e0e0e0;
}

.tabs button.active {
  background: #667eea;
  color: white;
  font-weight: bold;
}

.tab-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.tab-content h2 {
  margin-top: 0;
  color: #333;
  border-bottom: 3px solid #667eea;
  padding-bottom: 10px;
}

.demo-section {
  margin-top: 20px;
}

.state-display {
  text-align: center;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 20px;
}

.count {
  font-size: 4em;
  font-weight: bold;
  color: #667eea;
  margin: 10px 0;
}

.double {
  font-size: 1.2em;
  color: #666;
}

.controls {
  margin: 20px 0;
}

.controls h3 {
  margin-bottom: 15px;
  color: #555;
}

button {
  padding: 12px 24px;
  margin: 5px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #5568d3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #5a6268;
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #218838;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover:not(:disabled) {
  background: #c82333;
}

.login-form,
.user-info {
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 8px;
}

.login-form input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.user-info {
  text-align: center;
}

.user-info p {
  margin: 15px 0;
  font-size: 16px;
}

.error {
  color: #dc3545;
  margin-top: 10px;
}

.success {
  color: #28a745;
  margin-top: 10px;
  font-weight: bold;
}

.todo-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input input {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.stats {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.badge {
  padding: 8px 16px;
  background: #667eea;
  color: white;
  border-radius: 20px;
  font-size: 14px;
}

.badge-success {
  background: #28a745;
}

.badge-warning {
  background: #ffc107;
  color: #333;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
  transition: all 0.3s;
}

.todo-item:hover {
  background: #e9ecef;
}

.todo-item.completed span {
  text-decoration: line-through;
  color: #999;
}

.todo-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-item span {
  flex: 1;
}

.btn-remove {
  background: #dc3545;
  color: white;
  padding: 5px 12px;
  font-size: 18px;
  font-weight: bold;
}

.products-grid,
.cart-section {
  margin: 20px 0;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.product-card {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  text-align: center;
}

.product-card h4 {
  margin: 0 0 10px 0;
  color: #333;
}

.price {
  font-size: 1.5em;
  font-weight: bold;
  color: #667eea;
  margin: 10px 0;
}

.stock {
  color: #666;
  margin: 5px 0;
}

.cart-summary {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 15px 0;
}

.cart-summary p {
  margin: 10px 0;
  font-size: 16px;
}

.empty-cart {
  text-align: center;
  padding: 40px;
  color: #999;
  font-style: italic;
}

.cart-items {
  margin-top: 15px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 6px;
  margin: 10px 0;
}

.cart-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .tabs {
    flex-direction: column;
  }

  .product-list {
    grid-template-columns: 1fr;
  }
}
</style>
