<template>
  <div class="user-card">
    <h3>{{ name }}</h3>
    <p>Age: {{ age }}</p>
    <p>Email: {{ email }}</p>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: 18,
    },
    email: {
      type: String,
      validator(value) {
        return value.includes("@");
      },
    },
  },
};
</script>

<style scoped>
.user-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.user-card h3 {
  color: #42b983;
  margin-bottom: 10px;
}

.user-card p {
  margin: 5px 0;
}
</style>
