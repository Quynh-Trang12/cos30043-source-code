<template>
  <v-card class="mt-4">
    <v-card-title>Vuetify Forms with Rules-Based Validation</v-card-title>
    <v-card-text>
      <!-- Example 1: Basic Vuetify Form -->
      <div class="example-section">
        <h3>1. Basic v-form with Validation Rules</h3>
        <div class="code-output-pair">
          <div class="code-section">
            <h4>Template Code:</h4>
            <pre v-pre><code>&lt;v-form ref="form" v-model="valid"&gt;
  &lt;v-text-field
    v-model="email"
    :rules="emailRules"
    label="Email"
    type="email"
    required
  &gt;&lt;/v-text-field&gt;

  &lt;v-btn :disabled="!valid" @click="submit"&gt;
    Submit
  &lt;/v-btn&gt;
&lt;/v-form&gt;</code></pre>

            <h4>Script Code:</h4>
            <pre v-pre><code>data() {
  return {
    valid: false,
    email: '',
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'Email must be valid'
    ]
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <v-form ref="form1" v-model="form1.valid">
              <v-text-field
                v-model="form1.email"
                :rules="form1.emailRules"
                label="Email"
                type="email"
                required
              ></v-text-field>

              <v-btn
                :disabled="!form1.valid"
                color="primary"
                @click="submitForm1"
              >
                Submit
              </v-btn>
            </v-form>
          </div>
        </div>
      </div>

      <!-- Example 2: Complete Registration Form -->
      <div class="example-section">
        <h3>2. Complete Registration Form</h3>
        <div class="code-output-pair">
          <div class="code-section">
            <h4>Script Code:</h4>
            <pre v-pre><code>data() {
  return {
    valid: false,
    username: '',
    email: '',
    password: '',
    usernameRules: [
      v => !!v || 'Username is required',
      v => v.length >= 3 || 'Username must be at least 3 characters'
    ],
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'Email must be valid'
    ],
    passwordRules: [
      v => !!v || 'Password is required',
      v => v.length >= 8 || 'Password must be at least 8 characters'
    ]
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <v-form ref="form2" v-model="form2.valid">
              <v-text-field
                v-model="form2.username"
                :rules="form2.usernameRules"
                label="Username"
                required
              ></v-text-field>

              <v-text-field
                v-model="form2.email"
                :rules="form2.emailRules"
                label="Email"
                type="email"
                required
              ></v-text-field>

              <v-text-field
                v-model="form2.password"
                :rules="form2.passwordRules"
                label="Password"
                type="password"
                counter
                required
              ></v-text-field>

              <v-btn
                :disabled="!form2.valid"
                color="success"
                @click="submitForm2"
              >
                Register
              </v-btn>
            </v-form>
          </div>
        </div>
      </div>

      <!-- Example 3: Advanced Form with Select and Checkbox -->
      <div class="example-section">
        <h3>3. Advanced Form Components</h3>
        <div class="code-output-pair">
          <div class="code-section">
            <h4>Template Code:</h4>
            <pre v-pre><code>&lt;v-select
  v-model="country"
  :items="countries"
  :rules="[v => !!v || 'Country is required']"
  label="Country"
  required
&gt;&lt;/v-select&gt;

&lt;v-checkbox
  v-model="terms"
  :rules="[v => !!v || 'You must agree to continue']"
  label="I agree to terms and conditions"
  required
&gt;&lt;/v-checkbox&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <v-form ref="form3" v-model="form3.valid">
              <v-text-field
                v-model="form3.name"
                :rules="[(v) => !!v || 'Name is required']"
                label="Full Name"
                required
              ></v-text-field>

              <v-select
                v-model="form3.country"
                :items="form3.countries"
                :rules="[(v) => !!v || 'Country is required']"
                label="Country"
                required
              ></v-select>

              <v-checkbox
                v-model="form3.terms"
                :rules="[(v) => !!v || 'You must agree to continue']"
                label="I agree to terms and conditions"
                required
              ></v-checkbox>

              <v-btn
                :disabled="!form3.valid"
                color="primary"
                @click="submitForm3"
              >
                Submit
              </v-btn>
            </v-form>
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
  name: "VuetifyForms",
  data() {
    return {
      // Form 1
      form1: {
        valid: false,
        email: "",
        emailRules: [
          (v) => !!v || "Email is required",
          (v) => /.+@.+\..+/.test(v) || "Email must be valid",
        ],
      },
      // Form 2
      form2: {
        valid: false,
        username: "",
        email: "",
        password: "",
        usernameRules: [
          (v) => !!v || "Username is required",
          (v) => v.length >= 3 || "Username must be at least 3 characters",
        ],
        emailRules: [
          (v) => !!v || "Email is required",
          (v) => /.+@.+\..+/.test(v) || "Email must be valid",
        ],
        passwordRules: [
          (v) => !!v || "Password is required",
          (v) => v.length >= 8 || "Password must be at least 8 characters",
        ],
      },
      // Form 3
      form3: {
        valid: false,
        name: "",
        country: null,
        terms: false,
        countries: ["USA", "Canada", "UK", "Australia", "Vietnam"],
      },
      successMessage: "",
    };
  },
  methods: {
    submitForm1() {
      if (this.$refs.form1.validate()) {
        this.showSuccess("Form 1 submitted successfully!");
      }
    },
    submitForm2() {
      if (this.$refs.form2.validate()) {
        this.showSuccess("Registration successful!");
      }
    },
    submitForm3() {
      if (this.$refs.form3.validate()) {
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

@media (max-width: 768px) {
  .code-output-pair {
    grid-template-columns: 1fr;
  }
}
</style>
