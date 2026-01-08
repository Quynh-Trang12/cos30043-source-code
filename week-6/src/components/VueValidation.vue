<template>
  <v-card class="mt-4">
    <v-card-title>VueJS Custom Validation</v-card-title>
    <v-card-text>
      <!-- Example 1: Basic checkForm Method -->
      <div class="example-section">
        <h3>1. checkForm Method with Custom Validation</h3>
        <div class="code-output-pair">
          <div class="code-section">
            <h4>Template Code:</h4>
            <pre v-pre><code>&lt;form @submit="checkForm" novalidate&gt;
  &lt;input v-model="email" type="email"&gt;
  &lt;p v-if="errors.email" class="error"&gt;
    {{ errors.email }}
  &lt;/p&gt;
  &lt;button type="submit"&gt;Submit&lt;/button&gt;
&lt;/form&gt;</code></pre>

            <h4>Script Code:</h4>
            <pre v-pre><code>methods: {
  checkForm(e) {
    e.preventDefault()
    this.errors.email = null

    if (!this.email) {
      this.errors.email = 'Email is required'
      return
    }

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!pattern.test(this.email)) {
      this.errors.email = 'Invalid email format'
      return
    }

    this.submitForm()
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <form @submit="checkForm1" novalidate class="demo-form">
              <label>Email:</label>
              <input v-model="form1.email" type="email" />
              <p v-if="form1.errors.email" class="error">
                {{ form1.errors.email }}
              </p>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Example 2: Multiple Field Validation -->
      <div class="example-section">
        <h3>2. Multiple Fields with Validation</h3>
        <div class="code-output-pair">
          <div class="code-section">
            <h4>Script Code:</h4>
            <pre v-pre><code>checkForm(e) {
  e.preventDefault()
  this.errors = { username: null, email: null }

  if (!this.username) {
    this.errors.username = 'Username is required'
    return
  }

  if (this.username.length < 3) {
    this.errors.username = 'Username must be at least 3 characters'
    return
  }

  if (!this.email) {
    this.errors.email = 'Email is required'
    return
  }

  this.submitForm()
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <form @submit="checkForm2" novalidate class="demo-form">
              <label>Username:</label>
              <input v-model="form2.username" type="text" />
              <p v-if="form2.errors.username" class="error">
                {{ form2.errors.username }}
              </p>

              <label>Email:</label>
              <input v-model="form2.email" type="email" />
              <p v-if="form2.errors.email" class="error">
                {{ form2.errors.email }}
              </p>

              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>

      <!-- Example 3: Multiple Errors List -->
      <div class="example-section">
        <h3>3. Displaying Multiple Errors</h3>
        <div class="code-output-pair">
          <div class="code-section">
            <h4>Script Code:</h4>
            <pre v-pre><code>checkForm(e) {
  e.preventDefault()
  this.errorList = []

  if (!this.username) {
    this.errorList.push('Username is required')
  }
  if (this.username.length < 3) {
    this.errorList.push('Username too short')
  }
  if (!this.email) {
    this.errorList.push('Email is required')
  }

  if (this.errorList.length === 0) {
    this.submitForm()
  }
}</code></pre>

            <h4>Template Code:</h4>
            <pre
              v-pre
            ><code>&lt;div v-if="errorList.length > 0" class="error-box"&gt;
  &lt;p&gt;Please correct the following errors:&lt;/p&gt;
  &lt;ul&gt;
    &lt;li v-for="(error, index) in errorList" :key="index"&gt;
      {{ error }}
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <form @submit="checkForm3" novalidate class="demo-form">
              <div v-if="form3.errorList.length > 0" class="error-box">
                <p><strong>Please correct the following errors:</strong></p>
                <ul>
                  <li v-for="(error, index) in form3.errorList" :key="index">
                    {{ error }}
                  </li>
                </ul>
              </div>

              <label>Username:</label>
              <input v-model="form3.username" type="text" />

              <label>Email:</label>
              <input v-model="form3.email" type="email" />

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>

      <v-alert v-if="successMessage" type="success" class="mt-4">
        {{ successMessage }}
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "VueValidation",
  data() {
    return {
      // Form 1
      form1: {
        email: "",
        errors: {
          email: null,
        },
      },
      // Form 2
      form2: {
        username: "",
        email: "",
        errors: {
          username: null,
          email: null,
        },
      },
      // Form 3
      form3: {
        username: "",
        email: "",
        errorList: [],
      },
      successMessage: "",
    };
  },
  methods: {
    // Form 1 validation
    checkForm1(e) {
      e.preventDefault();
      this.form1.errors.email = null;

      if (!this.form1.email) {
        this.form1.errors.email = "Email is required";
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.form1.email)) {
        this.form1.errors.email = "Invalid email format";
        return;
      }

      this.showSuccess("Form 1 submitted successfully!");
    },

    // Form 2 validation
    checkForm2(e) {
      e.preventDefault();
      this.form2.errors = { username: null, email: null };

      if (!this.form2.username) {
        this.form2.errors.username = "Username is required";
        return;
      }

      if (this.form2.username.length < 3) {
        this.form2.errors.username = "Username must be at least 3 characters";
        return;
      }

      if (!this.form2.email) {
        this.form2.errors.email = "Email is required";
        return;
      }

      this.showSuccess("Form 2 submitted successfully!");
    },

    // Form 3 validation
    checkForm3(e) {
      e.preventDefault();
      this.form3.errorList = [];

      if (!this.form3.username) {
        this.form3.errorList.push("Username is required");
      }
      if (this.form3.username && this.form3.username.length < 3) {
        this.form3.errorList.push("Username must be at least 3 characters");
      }
      if (!this.form3.email) {
        this.form3.errorList.push("Email is required");
      }

      if (this.form3.errorList.length === 0) {
        this.showSuccess("Form 3 submitted successfully!");
      }
    },

    showSuccess(msg) {
      this.successMessage = msg;
      setTimeout(() => {
        this.successMessage = "";
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

.error {
  color: #d32f2f;
  font-size: 14px;
  margin: 5px 0;
}

.error-box {
  background-color: #ffebee;
  border: 1px solid #ef5350;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.error-box p {
  margin: 0 0 10px 0;
  color: #c62828;
}

.error-box ul {
  margin: 0;
  padding-left: 20px;
  color: #d32f2f;
}

@media (max-width: 768px) {
  .code-output-pair {
    grid-template-columns: 1fr;
  }
}
</style>
