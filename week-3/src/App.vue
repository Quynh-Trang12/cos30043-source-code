<template>
  <div class="app-container">
    <!-- Navigation -->
    <nav class="navigation">
      <h1>Week 3: VueJS Data Binding and Directives</h1>
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

    <!-- Example 1: Data Binding -->
    <section v-if="currentExample === 0" class="example-section">
      <h2>{{ examples[0].name }}</h2>

      <!-- Mustache Syntax -->
      <div class="example-item">
        <h3>1. Mustache Syntax - Text Interpolation</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Template Code:</h4>
            <pre v-pre><code>&lt;p&gt;Message: {{ message }}&lt;/p&gt;
&lt;p&gt;Count doubled: {{ count * 2 }}&lt;/p&gt;
&lt;p&gt;Status: {{ isActive ? 'Active' : 'Inactive' }}&lt;/p&gt;</code></pre>

            <h4>Script Code:</h4>
            <pre><code>data() {
  return {
    message: 'Hello Vue!',
    count: 5,
    isActive: true
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Output:</h4>
            <div class="output-box">
              <p>Message: {{ message }}</p>
              <p>Count doubled: {{ count * 2 }}</p>
              <p>Status: {{ isActive ? "Active" : "Inactive" }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- v-bind -->
      <div class="example-item">
        <h3>2. v-bind - Dynamic Attribute Binding</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Template Code:</h4>
            <pre><code>&lt;img :src="logoUrl" :alt="logoAlt"&gt;
&lt;a :href="websiteUrl"&gt;Visit Website&lt;/a&gt;
&lt;div :class="boxClass"&gt;Dynamic Class&lt;/div&gt;</code></pre>

            <h4>Script Code:</h4>
            <pre><code>data() {
  return {
    logoUrl: 'https://vuejs.org/images/logo.png',
    logoAlt: 'Vue.js Logo',
    websiteUrl: 'https://vuejs.org',
    boxClass: 'highlight'
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Output:</h4>
            <div class="output-box">
              <img :src="logoUrl" :alt="logoAlt" style="max-width: 80px" />
              <br />
              <a :href="websiteUrl" target="_blank">Visit Website</a>
              <br />
              <div :class="boxClass">Dynamic Class: {{ boxClass }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- v-model -->
      <div class="example-item">
        <h3>3. v-model - Two-Way Data Binding</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Template Code:</h4>
            <pre
              v-pre
            ><code>&lt;input v-model="username" placeholder="Username"&gt;
&lt;p&gt;Hello, {{ username }}!&lt;/p&gt;

&lt;textarea v-model="userMessage"&gt;&lt;/textarea&gt;
&lt;p&gt;Message: {{ userMessage }}&lt;/p&gt;</code></pre>

            <h4>Script Code:</h4>
            <pre><code>data() {
  return {
    username: '',
    userMessage: ''
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Output:</h4>
            <div class="output-box">
              <input v-model="username" placeholder="Enter username" />
              <p>Hello, {{ username }}!</p>

              <textarea
                v-model="userMessage"
                placeholder="Enter message"
              ></textarea>
              <p>Message: {{ userMessage }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- v-once -->
      <div class="example-item">
        <h3>4. v-once - Render Once</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Template Code:</h4>
            <pre v-pre><code>&lt;p&gt;Dynamic: {{ dynamicCounter }}&lt;/p&gt;
&lt;p v-once&gt;Static (v-once): {{ dynamicCounter }}&lt;/p&gt;
&lt;button @click="dynamicCounter++"&gt;Increment&lt;/button&gt;</code></pre>

            <h4>Script Code:</h4>
            <pre><code>data() {
  return {
    dynamicCounter: 0
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Output:</h4>
            <div class="output-box">
              <p>Dynamic: {{ dynamicCounter }}</p>
              <p v-once>Static (v-once): {{ dynamicCounter }}</p>
              <button @click="dynamicCounter++">Increment</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Example 2: Conditional Directives -->
    <section v-if="currentExample === 1" class="example-section">
      <h2>{{ examples[1].name }}</h2>

      <!-- v-if / v-else-if / v-else -->
      <div class="example-item">
        <h3>1. v-if / v-else-if / v-else</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Template Code:</h4>
            <pre><code class="language-markup">&lt;p v-if="score >= 90"&gt;Excellent! Grade: A&lt;/p&gt;
&lt;p v-else-if="score >= 75"&gt;Good job! Grade: B&lt;/p&gt;
&lt;p v-else-if="score >= 50"&gt;Pass. Grade: C&lt;/p&gt;
&lt;p v-else&gt;Need improvement. Grade: F&lt;/p&gt;

&lt;button @click="score += 10"&gt;Increase&lt;/button&gt;
&lt;button @click="score -= 10"&gt;Decrease&lt;/button&gt;</code></pre>

            <h4>Script Code:</h4>
            <pre><code class="language-javascript">data() {
  return {
    score: 60
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Output:</h4>
            <div class="output-box">
              <input type="number" v-model.number="score" min="0" max="100" />
              <p v-if="score >= 90" class="grade excellent">
                🎉 Excellent! Grade: A
              </p>
              <p v-else-if="score >= 75" class="grade good">
                👍 Good job! Grade: B
              </p>
              <p v-else-if="score >= 50" class="grade pass">✓ Pass. Grade: C</p>
              <p v-else class="grade fail">⚠️ Need improvement. Grade: F</p>

              <button @click="score += 10">Increase</button>
              <button @click="score -= 10">Decrease</button>
            </div>
          </div>
        </div>
      </div>

      <!-- v-show -->
      <div class="example-item">
        <h3>2. v-show - Toggle Visibility</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Template Code:</h4>
            <pre><code class="language-markup">&lt;p v-show="isVisible"&gt;Now you see me!&lt;/p&gt;
&lt;button @click="isVisible = !isVisible"&gt;
  Toggle
&lt;/button&gt;</code></pre>

            <h4>Script Code:</h4>
            <pre><code class="language-javascript">data() {
  return {
    isVisible: true
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Output:</h4>
            <div class="output-box">
              <p v-show="isVisible">👋 Now you see me!</p>
              <button @click="isVisible = !isVisible">Toggle</button>
              <p>
                <small>State: {{ isVisible ? "Visible" : "Hidden" }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Example 3: List Rendering & Events -->
    <section v-if="currentExample === 2" class="example-section">
      <h2>{{ examples[2].name }}</h2>

      <!-- v-for with simple array -->
      <div class="example-item">
        <h3>1. v-for - Simple Array</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Template Code:</h4>
            <pre v-pre><code>&lt;ul&gt;
  &lt;li v-for="fruit in fruits" :key="fruit"&gt;
    {{ fruit }}
  &lt;/li&gt;
&lt;/ul&gt;</code></pre>

            <h4>Script Code:</h4>
            <pre><code class="language-javascript">data() {
  return {
    fruits: ['Apple', 'Banana', 'Orange', 'Mango']
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Output:</h4>
            <div class="output-box">
              <ul>
                <li v-for="fruit in fruits" :key="fruit">{{ fruit }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- v-for with index -->
      <div class="example-item">
        <h3>2. v-for - Array with Index</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Template Code:</h4>
            <pre v-pre><code>&lt;ul&gt;
  &lt;li v-for="(fruit, index) in fruits" :key="index"&gt;
    {{ index + 1 }}. {{ fruit }}
  &lt;/li&gt;
&lt;/ul&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Output:</h4>
            <div class="output-box">
              <ul>
                <li v-for="(fruit, index) in fruits" :key="index">
                  {{ index + 1 }}. {{ fruit }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- v-for with array of objects -->
      <div class="example-item">
        <h3>3. v-for - Array of Objects</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Template Code:</h4>
            <pre
              v-pre
            ><code>&lt;div v-for="student in students" :key="student.id"&gt;
  &lt;h4&gt;{{ student.name }}&lt;/h4&gt;
  &lt;p&gt;ID: {{ student.id }}&lt;/p&gt;
  &lt;p&gt;Grade: {{ student.grade }}&lt;/p&gt;
&lt;/div&gt;</code></pre>

            <h4>Script Code:</h4>
            <pre><code class="language-javascript">data() {
  return {
    students: [
      { id: 1, name: 'Alice', grade: 'A' },
      { id: 2, name: 'Bob', grade: 'B' },
      { id: 3, name: 'Charlie', grade: 'A' }
    ]
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Output:</h4>
            <div class="output-box">
              <div
                v-for="student in students"
                :key="student.id"
                class="student-card"
              >
                <h4>{{ student.name }}</h4>
                <p>ID: {{ student.id }}</p>
                <p>Grade: {{ student.grade }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- v-on event handling -->
      <div class="example-item">
        <h3>4. v-on - Event Handling</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Template Code:</h4>
            <pre v-pre><code>&lt;p&gt;Count: {{ count }}&lt;/p&gt;
&lt;button @click="count++"&gt;Increment&lt;/button&gt;
&lt;button @click="count--"&gt;Decrement&lt;/button&gt;
&lt;button @click="reset"&gt;Reset&lt;/button&gt;</code></pre>

            <h4>Script Code:</h4>
            <pre><code class="language-javascript">data() {
  return {
    count: 0
  }
},
methods: {
  reset() {
    this.count = 0
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Output:</h4>
            <div class="output-box">
              <p>Count: {{ eventCount }}</p>
              <button @click="eventCount++">Increment</button>
              <button @click="eventCount--">Decrement</button>
              <button @click="resetCount">Reset</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Event Modifiers -->
      <div class="example-item">
        <h3>5. Event Modifiers</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Template Code:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;!-- .prevent: Prevent default --&gt;
&lt;form @submit.prevent="onSubmit"&gt;
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;

&lt;!-- .stop: Stop propagation --&gt;
&lt;div @click="outerClick"&gt;
  &lt;button @click.stop="innerClick"&gt;Click&lt;/button&gt;
&lt;/div&gt;

&lt;!-- .once: Trigger once --&gt;
&lt;button @click.once="onceClick"&gt;Once&lt;/button&gt;

&lt;!-- .enter: Enter key --&gt;
&lt;input @keyup.enter="onEnter"&gt;</code></pre>

            <h4>Script Code:</h4>
            <pre><code class="language-javascript">methods: {
  onSubmit() {
    console.log('Form submitted')
  },
  outerClick() {
    console.log('Outer clicked')
  },
  innerClick() {
    console.log('Inner clicked')
  },
  onceClick() {
    console.log('Clicked once')
  },
  onEnter() {
    console.log('Enter pressed')
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Output:</h4>
            <div class="output-box">
              <p><strong>.prevent modifier:</strong></p>
              <form @submit.prevent="handleFormSubmit">
                <button type="submit">Submit Form</button>
              </form>
              <p v-if="formSubmitCount > 0">
                Form submitted {{ formSubmitCount }} times (no page reload)
              </p>

              <p><strong>.stop modifier:</strong></p>
              <div @click="handleOuterClick" class="outer-box">
                Outer (clicks: {{ outerClickCount }})
                <button @click.stop="handleInnerClick">
                  Inner (clicks: {{ innerClickCount }})
                </button>
              </div>

              <p><strong>.once modifier:</strong></p>
              <button @click.once="handleOnceClick">Click Once</button>
              <p>Once clicks: {{ onceClickCount }} (max: 1)</p>

              <p><strong>.enter modifier:</strong></p>
              <input
                @keyup.enter="handleEnterKey"
                v-model="enterInput"
                placeholder="Press Enter"
              />
              <p v-if="enterMessage">{{ enterMessage }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Submit Example -->
      <div class="example-item">
        <h3>6. Form Submit with .prevent</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Template Code:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;form @submit.prevent="handleSubmit"&gt;
  &lt;input v-model="username" placeholder="Username"&gt;
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;
&lt;p v-if="submitted"&gt;Submitted: {{ username }}&lt;/p&gt;</code></pre>

            <h4>Script Code:</h4>
            <pre><code class="language-javascript">data() {
  return {
    username: '',
    submitted: false
  }
},
methods: {
  handleSubmit() {
    this.submitted = true
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Output:</h4>
            <div class="output-box">
              <form @submit.prevent="handleUserSubmit">
                <input v-model="formUsername" placeholder="Username" />
                <button type="submit">Submit</button>
              </form>
              <p v-if="userSubmitted" class="success-msg">
                ✓ Submitted: {{ formUsername }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Complete Todo List Example -->
      <div class="example-item">
        <h3>7. Complete Example: Todo List</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Template Code:</h4>
            <pre
              v-pre
            ><code>&lt;input v-model="newTodo" @keyup.enter="addTodo"&gt;
&lt;button @click="addTodo"&gt;Add&lt;/button&gt;

&lt;ul&gt;
  &lt;li v-for="(todo, index) in todos" :key="index"&gt;
    {{ todo }}
    &lt;button @click="removeTodo(index)"&gt;×&lt;/button&gt;
  &lt;/li&gt;
&lt;/ul&gt;

&lt;p v-if="todos.length === 0"&gt;No todos yet!&lt;/p&gt;</code></pre>

            <h4>Script Code:</h4>
            <pre><code class="language-javascript">data() {
  return {
    newTodo: '',
    todos: []
  }
},
methods: {
  addTodo() {
    if (this.newTodo.trim()) {
      this.todos.push(this.newTodo)
      this.newTodo = ''
    }
  },
  removeTodo(index) {
    this.todos.splice(index, 1)
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Output:</h4>
            <div class="output-box">
              <input
                v-model="newTodo"
                @keyup.enter="addTodo"
                placeholder="Enter a todo"
              />
              <button @click="addTodo">Add</button>

              <ul>
                <li v-for="(todo, index) in todos" :key="index">
                  {{ todo }}
                  <button @click="removeTodo(index)">×</button>
                </li>
              </ul>

              <p v-if="todos.length === 0">
                <em>No todos yet! Add one above.</em>
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
      // Navigation
      currentExample: 0,
      examples: [
        {
          name: "Data Binding",
          description:
            "Mustache syntax, v-bind, v-model, and v-once directives",
        },
        {
          name: "Conditional Directives",
          description: "v-if, v-else-if, v-else, and v-show directives",
        },
        {
          name: "List Rendering & Events",
          description: "v-for directive and v-on event handling",
        },
      ],

      // Example 1: Data Binding
      message: "Hello Vue!",
      count: 5,
      isActive: true,
      logoUrl: "https://vuejs.org/images/logo.png",
      logoAlt: "Vue.js Logo",
      websiteUrl: "https://vuejs.org",
      boxClass: "highlight",
      username: "",
      userMessage: "",
      dynamicCounter: 0,

      // Example 2: Conditional Directives
      score: 60,
      isVisible: true,
      showContent: true,

      // Example 3: List Rendering & Events
      fruits: ["Apple", "Banana", "Orange", "Mango"],
      students: [
        { id: 1, name: "Alice", grade: "A" },
        { id: 2, name: "Bob", grade: "B" },
        { id: 3, name: "Charlie", grade: "A" },
      ],
      eventCount: 0,
      newTodo: "",
      todos: [],

      // Event Modifiers
      formSubmitCount: 0,
      outerClickCount: 0,
      innerClickCount: 0,
      onceClickCount: 0,
      enterInput: "",
      enterMessage: "",

      // Form Submit Example
      formUsername: "",
      userSubmitted: false,
    };
  },
  methods: {
    // Example 3: Event handling methods
    resetCount() {
      this.eventCount = 0;
    },
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push(this.newTodo);
        this.newTodo = "";
      }
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },

    // Event Modifiers methods
    handleFormSubmit() {
      this.formSubmitCount++;
    },
    handleOuterClick() {
      this.outerClickCount++;
    },
    handleInnerClick() {
      this.innerClickCount++;
    },
    handleOnceClick() {
      this.onceClickCount++;
    },
    handleEnterKey() {
      this.enterMessage = `You entered: ${this.enterInput}`;
      this.enterInput = "";
    },

    // Form Submit method
    handleUserSubmit() {
      this.userSubmitted = true;
    },
  },
};
</script>

<style scoped>
/* Minimal CSS - Focus on functionality, not design */

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
textarea,
select {
  padding: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  margin: 5px 0;
  width: 100%;
  max-width: 300px;
}

textarea {
  min-height: 60px;
  font-family: Arial, sans-serif;
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

/* Grade Styles */
.grade {
  padding: 10px;
  margin: 10px 0;
  font-weight: bold;
}

.excellent {
  background-color: #d4edda;
  color: #155724;
}
.good {
  background-color: #d1ecf1;
  color: #0c5460;
}
.pass {
  background-color: #fff3cd;
  color: #856404;
}
.fail {
  background-color: #f8d7da;
  color: #721c24;
}

/* Highlight Class */
.highlight {
  background-color: #ffffcc;
  padding: 10px;
  border: 1px solid #ffeb3b;
}

/* Student Card */
.student-card {
  background-color: #f9f9f9;
  padding: 10px;
  margin: 10px 0;
  border-left: 3px solid #42b983;
}

.student-card h4 {
  margin: 0 0 5px 0;
}

.student-card p {
  margin: 3px 0;
}

/* Lists */
ul {
  padding-left: 20px;
}

li {
  margin: 5px 0;
}

/* Event Modifiers Styling */
.outer-box {
  background-color: #e3f2fd;
  padding: 15px;
  border: 2px solid #2196f3;
  cursor: pointer;
  margin: 10px 0;
}

.outer-box button {
  margin-top: 10px;
}

.success-msg {
  background-color: #d4edda;
  color: #155724;
  padding: 10px;
  border-left: 4px solid #28a745;
  margin-top: 10px;
  font-weight: 600;
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
