# Vuex State Management Demo

A comprehensive demonstration of Vuex state management for Vue.js students.

## 🎯 What You'll Learn

This application demonstrates all core Vuex concepts:

1. **State** - Centralized application data
2. **Getters** - Computed properties for state
3. **Mutations** - Synchronous state changes
4. **Actions** - Asynchronous operations
5. **Helpers** - mapState, mapGetters, mapMutations, mapActions

## 📚 Features

### 1. Counter Example

- **State**: Simple counter value
- **Getters**: Computed double value
- **Mutations**: Increment, decrement, increment by amount, reset
- **Actions**: Async increment with 1-second delay

### 2. User Authentication

- **State**: User object with name, email, login status
- **Mutations**: Set user, logout
- **Actions**: Async login simulation
- Demonstrates async operations with promises

### 3. Todo List

- **State**: Array of todos
- **Getters**: Completed todos, active todos, total count
- **Mutations**: Add, toggle, remove todos
- Shows how to work with arrays in state

### 4. Shopping Cart

- **State**: Products and cart arrays
- **Getters**: Cart total, items count
- **Mutations**: Add to cart, remove from cart, clear cart
- **Actions**: Async checkout
- Complete real-world example with stock management

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📖 Key Concepts Demonstrated

### State

```javascript
state() {
  return {
    count: 0,
    user: { name: 'Guest', email: '' }
  }
}
```

### Getters

```javascript
getters: {
  doubleCount(state) {
    return state.count * 2
  }
}
```

### Mutations (Synchronous)

```javascript
mutations: {
  INCREMENT(state) {
    state.count++
  }
}
```

### Actions (Asynchronous)

```javascript
actions: {
  incrementAsync({ commit }, amount) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit('INCREMENT_BY', amount)
        resolve()
      }, 1000)
    })
  }
}
```

### Using Helpers in Components

```javascript
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['count', 'user']),
    ...mapGetters(['doubleCount'])
  },
  methods: {
    ...mapMutations(['INCREMENT']),
    ...mapActions(['incrementAsync'])
  }
}
```

## 🎓 Learning Path

1. **Start with Counter** - Understand basic state, mutations, and actions
2. **Move to User Auth** - Learn async actions and promises
3. **Try Todo List** - Work with arrays and getters
4. **Explore Shopping Cart** - See a complete real-world example

## 💡 Best Practices Shown

- ✅ Mutations are UPPERCASE (convention)
- ✅ Mutations are synchronous
- ✅ Actions handle async operations
- ✅ Use getters for computed state
- ✅ Use helpers (map*) to reduce boilerplate
- ✅ Keep mutations simple and focused
- ✅ Actions can call multiple mutations

## 📝 File Structure

```
src/
├── store/
│   └── index.js          # Vuex store configuration
├── App.vue               # Main component with all examples
└── main.js              # App initialization
```

## 🔍 What to Observe

- Open Vue DevTools to see state changes in real-time
- Notice how mutations are tracked in DevTools
- See how actions commit mutations
- Observe getter values update automatically
- Watch how state changes trigger component re-renders

## 🎯 Try These Exercises

1. Add a new mutation to multiply the counter
2. Create a getter for pending todos
3. Add a "complete all" action for todos
4. Implement a discount system in the cart
5. Add product categories with filtering

## 📚 Resources

- [Vuex Official Documentation](https://vuex.vuejs.org/)
- [Vue DevTools](https://devtools.vuejs.org/)
- [Vue.js Guide](https://vuejs.org/guide/)

---

Built for educational purposes to demonstrate Vuex state management patterns.
