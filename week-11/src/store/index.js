import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      count: 0,
      user: {
        name: "John Doe",
        email: "john@example.com",
      },
      todos: [
        { id: 1, text: "Learn Vue", done: true },
        { id: 2, text: "Learn Vuex", done: false },
        { id: 3, text: "Build awesome apps", done: false },
      ],
      cart: [],
      products: [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 49.99 },
        { id: 3, name: "Product 3", price: 19.99 },
      ],
    };
  },

  getters: {
    // Todo getters
    doneTodos(state) {
      return state.todos.filter((todo) => todo.done);
    },
    doneTodosCount(state, getters) {
      return getters.doneTodos.length;
    },

    // Cart getters
    cartTotal(state) {
      return state.cart.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
    cartItemCount(state) {
      return state.cart.reduce((count, item) => {
        return count + item.quantity;
      }, 0);
    },
  },

  mutations: {
    // Counter mutations
    increment(state) {
      state.count++;
    },
    incrementBy(state, payload) {
      state.count += payload;
    },

    // User mutations
    setUser(state, payload) {
      state.user = {
        name: payload.name,
        email: payload.email,
      };
    },

    // Todo mutations
    addTodo(state, text) {
      state.todos.push({
        id: Date.now(),
        text: text,
        done: false,
      });
    },
    toggleTodo(state, id) {
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        todo.done = !todo.done;
      }
    },

    // Cart mutations
    addToCart(state, product) {
      const item = state.cart.find((i) => i.id === product.id);

      if (item) {
        item.quantity++;
      } else {
        state.cart.push({
          ...product,
          quantity: 1,
        });
      }
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter((item) => item.id !== productId);
    },
    clearCart(state) {
      state.cart = [];
    },
  },

  actions: {
    // Async action example
    fetchUser({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const user = {
            name: "Jane Smith",
            email: "jane@example.com",
          };
          commit("setUser", user);
          resolve(user);
        }, 1000);
      });
    },

    // Action with payload
    incrementAsync({ commit }, amount) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("incrementBy", amount);
          resolve();
        }, 500);
      });
    },
  },
});

export default store;
