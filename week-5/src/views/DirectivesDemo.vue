<template>
  <div class="page-container">
    <h2>Custom Directives Demo</h2>

    <!-- Example 1: v-focus Directive -->
    <div class="example-item">
      <h3>1. v-focus - Auto Focus Input</h3>

      <div class="code-output-pair">
        <div class="code-section">
          <h4>Directive Definition (main.js):</h4>
          <pre v-pre><code class="language-javascript">app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})</code></pre>

          <h4>Template Code:</h4>
          <pre
            v-pre
          ><code class="language-markup">&lt;input v-focus placeholder="Auto-focused"&gt;
&lt;input placeholder="Not focused"&gt;</code></pre>
        </div>

        <div class="output-section">
          <h4>Output:</h4>
          <div class="output-box">
            <input v-focus placeholder="Auto-focused (this input is focused)" />
            <input placeholder="Not focused" />
          </div>
        </div>
      </div>
    </div>

    <!-- Example 2: v-color Directive -->
    <div class="example-item">
      <h3>2. v-color - Dynamic Text Color</h3>

      <div class="code-output-pair">
        <div class="code-section">
          <h4>Directive Definition (main.js):</h4>
          <pre v-pre><code class="language-javascript">app.directive('color', {
  mounted(el, binding) {
    el.style.color = binding.value
  },
  updated(el, binding) {
    el.style.color = binding.value
  }
})</code></pre>

          <h4>Template Code:</h4>
          <pre
            v-pre
          ><code class="language-markup">&lt;p v-color="'red'"&gt;Red text&lt;/p&gt;
&lt;p v-color="'blue'"&gt;Blue text&lt;/p&gt;
&lt;p v-color="'green'"&gt;Green text&lt;/p&gt;
&lt;p v-color="userColor"&gt;Dynamic color&lt;/p&gt;</code></pre>
        </div>

        <div class="output-section">
          <h4>Output:</h4>
          <div class="output-box">
            <p v-color="'red'">Red text</p>
            <p v-color="'blue'">Blue text</p>
            <p v-color="'green'">Green text</p>
            <p v-color="userColor">Dynamic color ({{ userColor }})</p>
            <input v-model="userColor" placeholder="Enter color name" />
          </div>
        </div>
      </div>
    </div>

    <!-- Example 3: Local Custom Directive -->
    <div class="example-item">
      <h3>3. Local Custom Directive - v-highlight</h3>

      <div class="code-output-pair">
        <div class="code-section">
          <h4>Local Directive Definition:</h4>
          <pre v-pre><code class="language-javascript">export default {
  directives: {
    highlight: {
      mounted(el, binding) {
        el.style.backgroundColor = binding.value || 'yellow'
      }
    }
  }
}</code></pre>

          <h4>Template Code:</h4>
          <pre
            v-pre
          ><code class="language-markup">&lt;p v-highlight&gt;Default yellow highlight&lt;/p&gt;
&lt;p v-highlight="'lightblue'"&gt;Blue highlight&lt;/p&gt;
&lt;p v-highlight="'lightgreen'"&gt;Green highlight&lt;/p&gt;</code></pre>
        </div>

        <div class="output-section">
          <h4>Output:</h4>
          <div class="output-box">
            <p v-highlight>Default yellow highlight</p>
            <p v-highlight="'lightblue'">Blue highlight</p>
            <p v-highlight="'lightgreen'">Green highlight</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DirectivesDemo",
  data() {
    return {
      userColor: "purple",
    };
  },
  directives: {
    highlight: {
      mounted(el, binding) {
        el.style.backgroundColor = binding.value || "yellow";
        el.style.padding = "5px";
        el.style.borderRadius = "4px";
      },
    },
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

.output-box p {
  margin: 10px 0;
  font-size: 16px;
}

.output-box input {
  padding: 8px;
  border: 1px solid #ddd;
  margin-top: 10px;
  width: 100%;
  max-width: 300px;
}

@media (max-width: 768px) {
  .code-output-pair {
    grid-template-columns: 1fr;
  }
}
</style>
