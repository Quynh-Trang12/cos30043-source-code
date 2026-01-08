<template>
  <div class="login-container">
    <h3>Login Form</h3>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <p class="hint">Hint: Enter any username and password</p>
  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    login() {
      this.error = "";

      // Simulate authentication
      if (this.username && this.password) {
        // Emit authenticated event to parent
        this.$emit("authenticated", true);

        // Simulate storing token
        localStorage.setItem("token", "demo-token-123");
      } else {
        this.error = "Please enter username and password";
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}

.login-container h3 {
  margin-top: 0;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #35a372;
}

.error {
  color: #d32f2f;
  margin: 5px 0;
}

.hint {
  color: #666;
  font-size: 12px;
  margin-top: 10px;
}
</style>
