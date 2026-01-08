import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      // Counter state
      count: 0,

      // User state
      user: {
        name: "Guest",
        email: "",
        isLoggedIn: false,
      },

      // Todo state
      todos: [
        { id: 1, text: "Learn Vue.js", completed: true },
        { id: 2, text: "Learn Vuex", completed: false },
        { id: 3, text: "Build awesome apps", completed: false },
      ],

      // Shopping cart state
      cart: [],
      products: [
        { id: 1, name: "Laptop", price: 999.99, stock: 5 },
        { id: 2, name: "Mouse", price: 29.99, stock: 10 },
        { id: 3, name: "Keyboard", price: 79.99, stock: 7 },
        { id: 4, name: "Monitor", price: 299.99, stock: 3 },
      ],
    };
  },

  getters: {
    // Counter getters
    doubleCount(state) {
      return state.count * 2;
    },

    // Todo getters
    completedTodos(state) {
      return state.todos.filter((todo) => todo.completed);
    },
    activeTodos(state) {
      return state.todos.filter((todo) => !todo.completed);
    },
    todosCount(state) {
      return state.todos.length;
    },

    // Cart getters
    cartTotal(state) {
      return state.cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
    cartItemsCount(state) {
      return state.cart.reduce((count, item) => {
        return count + item.quantity;
      }, 0);
    },
  },

  mutations: {
    // Counter mutations
    INCREMENT(state) {
      state.count++;
    },
    DECREMENT(state) {
      state.count--;
    },
    INCREMENT_BY(state, amount) {
      state.count += amount;
    },
    RESET_COUNT(state) {
      state.count = 0;
    },

    // User mutations
    SET_USER(state, user) {
      state.user = {
        name: user.name,
        email: user.email,
        isLoggedIn: true,
      };
    },
    LOGOUT_USER(state) {
      state.user = {
        name: "Guest",
        email: "",
        isLoggedIn: false,
      };
    },

    // Todo mutations
    ADD_TODO(state, text) {
      state.todos.push({
        id: Date.now(),
        text: text,
        completed: false,
      });
    },
    TOGGLE_TODO(state, id) {
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    REMOVE_TODO(state, id) {
      state.todos = state.todos.filter((t) => t.id !== id);
    },

    // Cart mutations
    ADD_TO_CART(state, product) {
      const cartItem = state.cart.find((item) => item.id === product.id);

      if (cartItem) {
        cartItem.quantity++;
      } else {
        state.cart.push({
          ...product,
          quantity: 1,
        });
      }

      // Decrease stock
      const productItem = state.products.find((p) => p.id === product.id);
      if (productItem && productItem.stock > 0) {
        productItem.stock--;
      }
    },
    REMOVE_FROM_CART(state, productId) {
      const cartItem = state.cart.find((item) => item.id === productId);
      if (cartItem) {
        // Restore stock
        const productItem = state.products.find((p) => p.id === productId);
        if (productItem) {
          productItem.stock += cartItem.quantity;
        }
      }
      state.cart = state.cart.filter((item) => item.id !== productId);
    },
    CLEAR_CART(state) {
      // Restore all stock
      state.cart.forEach((item) => {
        const product = state.products.find((p) => p.id === item.id);
        if (product) {
          product.stock += item.quantity;
        }
      });
      state.cart = [];
    },
  },

  actions: {
    // Async counter action
    incrementAsync({ commit }, amount) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("INCREMENT_BY", amount);
          resolve();
        }, 1000);
      });
    },

    // Async user login
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate API call
          if (credentials.email && credentials.password) {
            commit("SET_USER", {
              name: credentials.name || "User",
              email: credentials.email,
            });
            resolve({ success: true });
          } else {
            reject(new Error("Invalid credentials"));
          }
        }, 1000);
      });
    },

    logout({ commit }) {
      commit("LOGOUT_USER");
    },

    // Todo actions
    addTodo({ commit }, text) {
      if (text.trim()) {
        commit("ADD_TODO", text);
      }
    },

    // Cart actions
    checkout({ state, commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("CLEAR_CART");
          resolve({
            success: true,
            message: "Order placed successfully!",
          });
        }, 1500);
      });
    },
  },
});
