<template>
  <div class="app-container">
    <!-- Navigation -->
    <nav class="navigation">
      <h1>Week 4: View and ViewModel (MVVM)</h1>
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

    <!-- Example 1: data() Option -->
    <section v-if="currentExample === 0" class="example-section">
      <h2>{{ examples[0].name }}</h2>

      <!-- Basic data() -->
      <div class="example-item">
        <h3>1. Basic data() - Reactive State</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Script Code:</h4>
            <pre v-pre><code class="language-javascript">data() {
  return {
    message: 'Hello Vue!',
    count: 0,
    user: {
      name: 'Alice',
      age: 25
    },
    items: ['Apple', 'Banana', 'Orange']
  }
}</code></pre>

            <h4>Template Code:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;p&gt;{{ message }}&lt;/p&gt;
&lt;p&gt;Count: {{ count }}&lt;/p&gt;
&lt;p&gt;User: {{ user.name }}, Age: {{ user.age }}&lt;/p&gt;
&lt;ul&gt;
  &lt;li v-for="item in items" :key="item"&gt;
    {{ item }}
  &lt;/li&gt;
&lt;/ul&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Output:</h4>
            <div class="output-box">
              <p>{{ dataMessage }}</p>
              <p>Count: {{ dataCount }}</p>
              <p>User: {{ dataUser.name }}, Age: {{ dataUser.age }}</p>
              <ul>
                <li v-for="item in dataItems" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Example 2: methods Option -->
    <section v-if="currentExample === 1" class="example-section">
      <h2>{{ examples[1].name }}</h2>

      <!-- Basic methods -->
      <div class="example-item">
        <h3>1. methods - User Actions</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Script Code:</h4>
            <pre v-pre><code class="language-javascript">data() {
  return {
    count: 0
  }
},
methods: {
  increment() {
    this.count++
  },
  decrement() {
    this.count--
  },
  reset() {
    this.count = 0
  },
  addAmount(amount) {
    this.count += amount
  }
}</code></pre>

            <h4>Template Code:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;p&gt;Count: {{ count }}&lt;/p&gt;
&lt;button @click="increment"&gt;+1&lt;/button&gt;
&lt;button @click="decrement"&gt;-1&lt;/button&gt;
&lt;button @click="reset"&gt;Reset&lt;/button&gt;
&lt;button @click="addAmount(5)"&gt;+5&lt;/button&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Output:</h4>
            <div class="output-box">
              <p>Count: {{ methodsCount }}</p>
              <button @click="increment">+1</button>
              <button @click="decrement">-1</button>
              <button @click="reset">Reset</button>
              <button @click="addAmount(5)">+5</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Example 3: computed Properties -->
    <section v-if="currentExample === 2" class="example-section">
      <h2>{{ examples[2].name }}</h2>

      <!-- Full Name Example -->
      <div class="example-item">
        <h3>1. computed - Full Name</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Script Code:</h4>
            <pre v-pre><code class="language-javascript">data() {
  return {
    firstName: 'John',
    lastName: 'Doe'
  }
},
computed: {
  fullName() {
    return this.firstName + ' ' + this.lastName
  }
}</code></pre>

            <h4>Template Code:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;input v-model="firstName" placeholder="First Name"&gt;
&lt;input v-model="lastName" placeholder="Last Name"&gt;
&lt;p&gt;Full Name: {{ fullName }}&lt;/p&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Output:</h4>
            <div class="output-box">
              <input v-model="firstName" placeholder="First Name" />
              <input v-model="lastName" placeholder="Last Name" />
              <p>Full Name: {{ fullName }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Price Example -->
      <div class="example-item">
        <h3>2. computed - Shopping Cart Total</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Script Code:</h4>
            <pre v-pre><code class="language-javascript">data() {
  return {
    cartItems: [
      { name: 'Item 1', price: 10, quantity: 2 },
      { name: 'Item 2', price: 20, quantity: 1 },
      { name: 'Item 3', price: 15, quantity: 3 }
    ]
  }
},
computed: {
  totalPrice() {
    return this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  }
}</code></pre>

            <h4>Template Code:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;div v-for="(item, index) in cartItems" :key="index"&gt;
  {{ item.name }}: ${{ item.price }} x {{ item.quantity }}
&lt;/div&gt;
&lt;p&gt;&lt;strong&gt;Total: ${{ totalPrice }}&lt;/strong&gt;&lt;/p&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Output:</h4>
            <div class="output-box">
              <div
                v-for="(item, index) in cartItems"
                :key="index"
                class="cart-item"
              >
                <span
                  >{{ item.name }}: ${{ item.price }} x
                  {{ item.quantity }}</span
                >
              </div>
              <p>
                <strong>Total: ${{ totalPrice }}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filtered List Example -->
      <div class="example-item">
        <h3>3. computed - Filtered List</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Script Code:</h4>
            <pre v-pre><code class="language-javascript">data() {
  return {
    searchQuery: '',
    students: [
      { id: 1, name: 'Alice', grade: 85 },
      { id: 2, name: 'Bob', grade: 92 },
      { id: 3, name: 'Charlie', grade: 78 }
    ]
  }
},
computed: {
  filteredStudents() {
    return this.students.filter(student => {
      return student.name.toLowerCase()
        .includes(this.searchQuery.toLowerCase())
    })
  }
}</code></pre>

            <h4>Template Code:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;input v-model="searchQuery" placeholder="Search students..."&gt;
&lt;div v-for="student in filteredStudents" :key="student.id"&gt;
  &lt;strong&gt;{{ student.name }}&lt;/strong&gt; - Grade: {{ student.grade }}
&lt;/div&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Output:</h4>
            <div class="output-box">
              <input v-model="searchQuery" placeholder="Search students..." />
              <div
                v-for="student in filteredStudents"
                :key="student.id"
                class="student-card"
              >
                <p>
                  <strong>{{ student.name }}</strong> - Grade:
                  {{ student.grade }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Example 4: watch Option -->
    <section v-if="currentExample === 3" class="example-section">
      <h2>{{ examples[3].name }}</h2>

      <!-- Username Validation -->
      <div class="example-item">
        <h3>1. watch - Input Validation</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Script Code:</h4>
            <pre v-pre><code class="language-javascript">data() {
  return {
    username: '',
    statusMessage: ''
  }
},
watch: {
  username(newValue, oldValue) {
    console.log('Changed from', oldValue, 'to', newValue)

    if (newValue.length < 3) {
      this.statusMessage = 'Username too short'
    } else {
      this.statusMessage = 'Username valid'
    }
  }
}</code></pre>

            <h4>Template Code:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;input v-model="username" placeholder="Enter username"&gt;
&lt;p&gt;{{ statusMessage }}&lt;/p&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Output:</h4>
            <div class="output-box">
              <input v-model="username" placeholder="Enter username" />
              <p
                :class="{
                  error: statusMessage.includes('short'),
                  success: statusMessage.includes('valid'),
                }"
              >
                {{ statusMessage }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Search with Loading -->
      <div class="example-item">
        <h3>2. watch - Search with Loading State</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Script Code:</h4>
            <pre v-pre><code class="language-javascript">data() {
  return {
    searchTerm: '',
    results: [],
    loading: false
  }
},
watch: {
  searchTerm(newValue) {
    this.loading = true

    // Simulate API call
    setTimeout(() => {
      this.results = [`Result for: ${newValue}`]
      this.loading = false
    }, 1000)
  }
}</code></pre>

            <h4>Template Code:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;input v-model="searchTerm" placeholder="Search..."&gt;
&lt;p v-if="loading"&gt;Loading...&lt;/p&gt;
&lt;ul v-else&gt;
  &lt;li v-for="(result, index) in results" :key="index"&gt;
    {{ result }}
  &lt;/li&gt;
&lt;/ul&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Output:</h4>
            <div class="output-box">
              <input v-model="searchTerm" placeholder="Search..." />
              <p v-if="loading">Loading...</p>
              <ul v-else>
                <li v-for="(result, index) in results" :key="index">
                  {{ result }}
                </li>
              </ul>
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
      // Navigation
      currentExample: 0,
      examples: [
        { name: "data() Option" },
        { name: "methods Option" },
        { name: "computed Properties" },
        { name: "watch Option" },
      ],

      // Example 1: data()
      dataMessage: "Hello Vue!",
      dataCount: 0,
      dataUser: {
        name: "Alice",
        age: 25,
      },
      dataItems: ["Apple", "Banana", "Orange"],

      // Example 2: methods
      methodsCount: 0,

      // Example 3: computed
      firstName: "John",
      lastName: "Doe",
      cartItems: [
        { name: "Item 1", price: 10, quantity: 2 },
        { name: "Item 2", price: 20, quantity: 1 },
        { name: "Item 3", price: 15, quantity: 3 },
      ],
      searchQuery: "",
      students: [
        { id: 1, name: "Alice", grade: 85 },
        { id: 2, name: "Bob", grade: 92 },
        { id: 3, name: "Charlie", grade: 78 },
      ],

      // Example 4: watch
      username: "",
      statusMessage: "",
      searchTerm: "",
      results: [],
      loading: false,
    };
  },
  computed: {
    // Full Name
    fullName() {
      return this.firstName + " " + this.lastName;
    },
    // Total Price
    totalPrice() {
      return this.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
    // Filtered Students
    filteredStudents() {
      return this.students.filter((student) => {
        return student.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    },
  },
  methods: {
    // Counter methods
    increment() {
      this.methodsCount++;
    },
    decrement() {
      this.methodsCount--;
    },
    reset() {
      this.methodsCount = 0;
    },
    addAmount(amount) {
      this.methodsCount += amount;
    },
  },
  watch: {
    // Username validation
    username(newValue, oldValue) {
      console.log("Username changed from", oldValue, "to", newValue);

      if (newValue.length < 3) {
        this.statusMessage = "Username too short";
      } else {
        this.statusMessage = "Username valid";
      }
    },
    // Search with loading
    searchTerm(newValue) {
      if (!newValue) {
        this.results = [];
        this.loading = false;
        return;
      }

      this.loading = true;

      // Simulate API call
      setTimeout(() => {
        this.results = [`Result for: ${newValue}`];
        this.loading = false;
      }, 1000);
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

/* Code Display - Monokai Light Theme */
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
.code-section pre[class*="language-"],
.code-section code[class*="language-"] {
  color: #272822;
  background: #fffef7;
}

.token.keyword,
.token.control,
.token.directive,
.token.unit {
  color: #f92672;
  font-weight: 600;
}

.token.string,
.token.attr-value {
  color: #e6db74;
}

.token.function,
.token.class-name {
  color: #66d9ef;
}

.token.number,
.token.boolean {
  color: #ae81ff;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #75715e;
  font-style: italic;
}

.token.operator,
.token.punctuation {
  color: #272822;
}

.token.tag {
  color: #f92672;
}

.token.attr-name {
  color: #a6e22e;
}

.token.property,
.token.variable {
  color: #272822;
}

.token.selector {
  color: #a6e22e;
}

/* Output Box */
.output-box {
  padding: 15px;
  border: 1px solid #e0e0e0;
  background-color: white;
  min-height: 100px;
}

/* Form Elements */
input[type="text"],
input[type="number"],
input {
  padding: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  margin: 5px 0;
  width: 100%;
  max-width: 300px;
}

/* Buttons */
button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  margin: 5px 5px 5px 0;
}

button:hover {
  background-color: #35a372;
}

/* Cart Item */
.cart-item {
  padding: 8px;
  background-color: #f9f9f9;
  margin: 5px 0;
  border-left: 3px solid #42b983;
}

/* Student Card */
.student-card {
  background-color: #f9f9f9;
  padding: 10px;
  margin: 10px 0;
  border-left: 3px solid #42b983;
}

.student-card p {
  margin: 0;
}

/* Status Messages */
.error {
  color: #d32f2f;
  font-weight: bold;
}

.success {
  color: #388e3c;
  font-weight: bold;
}

/* Lists */
ul {
  padding-left: 20px;
}

li {
  margin: 5px 0;
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
