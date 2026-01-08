<template>
  <v-card class="mt-4">
    <v-card-title>HTML5 Form Validation</v-card-title>
    <v-card-text>
      <!-- Example 1: Required Attribute -->
      <div class="example-section">
        <h3>1. required Attribute</h3>
        <div class="code-output-pair">
          <div class="code-section">
            <h4>HTML Code:</h4>
            <pre v-pre><code class="language-markup">&lt;form&gt;
  &lt;label&gt;Username:&lt;/label&gt;
  &lt;input type="text" required&gt;
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <form
              @submit.prevent="showMessage('Form submitted!')"
              class="demo-form"
            >
              <label>Username:</label>
              <input type="text" required />
              <button type="submit">Submit</button>
            </form>
            <p class="note">Try submitting without filling the field!</p>
          </div>
        </div>
      </div>

      <!-- Example 2: Type Validation -->
      <div class="example-section">
        <h3>2. type Attribute (email, url, number)</h3>
        <div class="code-output-pair">
          <div class="code-section">
            <h4>HTML Code:</h4>
            <pre v-pre><code class="language-markup">&lt;form&gt;
  &lt;input type="email" placeholder="Email" required&gt;
  &lt;input type="url" placeholder="Website" required&gt;
  &lt;input type="number" placeholder="Age" required&gt;
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <form @submit.prevent="showMessage('Valid!')" class="demo-form">
              <input type="email" placeholder="Email" required />
              <input type="url" placeholder="Website" required />
              <input type="number" placeholder="Age" required />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Example 3: min and max -->
      <div class="example-section">
        <h3>3. min and max Attributes</h3>
        <div class="code-output-pair">
          <div class="code-section">
            <h4>HTML Code:</h4>
            <pre v-pre><code class="language-markup">&lt;form&gt;
  &lt;label&gt;Age (18-100):&lt;/label&gt;
  &lt;input type="number" min="18" max="100" required&gt;
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <form @submit.prevent="showMessage('Valid age!')" class="demo-form">
              <label>Age (18-100):</label>
              <input type="number" min="18" max="100" required />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Example 4: pattern Attribute -->
      <div class="example-section">
        <h3>4. pattern Attribute (Regex)</h3>
        <div class="code-output-pair">
          <div class="code-section">
            <h4>HTML Code:</h4>
            <pre v-pre><code class="language-markup">&lt;form&gt;
  &lt;label&gt;Phone (XXX-XXX-XXXX):&lt;/label&gt;
  &lt;input type="tel"
         pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
         placeholder="123-456-7890"
         required&gt;
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <form
              @submit.prevent="showMessage('Valid phone!')"
              class="demo-form"
            >
              <label>Phone (XXX-XXX-XXXX):</label>
              <input
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="123-456-7890"
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>

      <v-alert v-if="message" type="success" class="mt-4">
        {{ message }}
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "HTML5Validation",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    showMessage(msg) {
      this.message = msg;
      setTimeout(() => {
        this.message = "";
      }, 3000);
    },
  },
};
</script>

<style scoped>
.example-section {
  margin: 30px 0;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.example-section h3 {
  color: #1976d2;
  margin-bottom: 15px;
}

.code-output-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 15px;
}

.code-section,
.output-section {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.code-section {
  background-color: #fffef7;
  border-left: 4px solid #f92672;
}

.output-section {
  background-color: white;
}

h4 {
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
  margin: 0;
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

.demo-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.demo-form label {
  font-weight: bold;
  margin-bottom: 5px;
}

.demo-form input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.demo-form input:valid {
  border-color: green;
}

.demo-form input:invalid {
  border-color: red;
}

.demo-form button {
  padding: 10px 20px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.demo-form button:hover {
  background-color: #1565c0;
}

.note {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
  font-style: italic;
}

@media (max-width: 768px) {
  .code-output-pair {
    grid-template-columns: 1fr;
  }
}
</style>
