<template>
  <div class="user-card">
    <h2>{{ user.name }}</h2>
    <p>Email: {{ user.email }}</p>
    <button @click="sendMessage">Contact</button>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    sendMessage() {
      alert(`Sending message to ${this.user.name}`);
      console.log("Sending message to", this.user.name);
    },
  },
};
</script>

<style scoped>
.user-card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
}

h2 {
  color: #42b983;
  margin: 0 0 10px 0;
}

p {
  margin: 10px 0;
  color: #666;
}

button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #35a372;
}
</style>
