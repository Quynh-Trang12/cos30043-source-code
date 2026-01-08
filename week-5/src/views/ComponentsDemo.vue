<template>
  <div class="page-container">
    <h2>Components Demo</h2>

    <!-- Example 1: Basic Component Usage -->
    <div class="example-item">
      <h3>1. Creating and Using Components</h3>

      <div class="code-output-pair">
        <div class="code-section">
          <h4>Component Code (UserCard.vue):</h4>
          <pre v-pre><code class="language-markup">&lt;template&gt;
  &lt;div class="user-card"&gt;
    &lt;h3&gt;{{ name }}&lt;/h3&gt;
    &lt;p&gt;Age: {{ age }}&lt;/p&gt;
    &lt;p&gt;Email: {{ email }}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  name: 'UserCard',
  props: {
    name: String,
    age: Number,
    email: String
  }
}
&lt;/script&gt;</code></pre>

          <h4>Using Component:</h4>
          <pre v-pre><code class="language-javascript">&lt;script&gt;
import UserCard from './components/UserCard.vue'

export default {
  components: {
    UserCard
  }
}
&lt;/script&gt;

&lt;template&gt;
  &lt;UserCard
    name="Alice"
    :age="25"
    email="alice@example.com"
  /&gt;
&lt;/template&gt;</code></pre>
        </div>

        <div class="output-section">
          <h4>Output:</h4>
          <div class="output-box">
            <UserCard name="Alice" :age="25" email="alice@example.com" />
          </div>
        </div>
      </div>
    </div>

    <!-- Example 2: Multiple Component Instances -->
    <div class="example-item">
      <h3>2. Reusing Components</h3>

      <div class="code-output-pair">
        <div class="code-section">
          <h4>Template Code:</h4>
          <pre v-pre><code class="language-markup">&lt;UserCard
  name="Alice"
  :age="25"
  email="alice@example.com"
/&gt;
&lt;UserCard
  name="Bob"
  :age="30"
  email="bob@example.com"
/&gt;
&lt;UserCard
  name="Charlie"
  :age="28"
  email="charlie@example.com"
/&gt;</code></pre>
        </div>

        <div class="output-section">
          <h4>Output:</h4>
          <div class="output-box">
            <UserCard name="Alice" :age="25" email="alice@example.com" />
            <UserCard name="Bob" :age="30" email="bob@example.com" />
            <UserCard name="Charlie" :age="28" email="charlie@example.com" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from "../components/UserCard.vue";

export default {
  name: "ComponentsDemo",
  components: {
    UserCard,
  },
};
</script>

<style scoped>
.page-container {
  padding: 20px;
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.example-item {
  background-color: white;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid #ddd;
}

.example-item h3 {
  color: #42b983;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

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

.output-box {
  padding: 15px;
  border: 1px solid #e0e0e0;
  background-color: white;
  min-height: 100px;
}

@media (max-width: 768px) {
  .code-output-pair {
    grid-template-columns: 1fr;
  }
}
</style>
