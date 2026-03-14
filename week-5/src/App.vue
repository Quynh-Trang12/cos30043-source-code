<template>
  <div class="app-container">
    <!-- Navigation -->
    <nav class="navigation">
      <h1>Week 5: Components and Router</h1>
      <div class="nav-links">
        <router-link to="/">Components</router-link>
        <router-link to="/props">Props</router-link>
        <router-link to="/directives">Directives</router-link>
        <router-link to="/user/1">User Profile</router-link>
        <router-link to="/router-demo">Router Demo</router-link>
        <router-link to="/blog">Blog</router-link>
      </div>
    </nav>

    <!-- Router View -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
}

.app-container {
  min-height: 100vh;
}

/* Navigation */
.navigation {
  background-color: #42b983;
  padding: 20px;
  color: white;
}

.navigation h1 {
  margin-bottom: 15px;
}

.nav-links {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border: 2px solid white;
  border-radius: 4px;
  transition: all 0.3s;
}

.nav-links a:hover {
  background-color: white;
  color: #42b983;
}

.nav-links a.router-link-active {
  background-color: #2c3e50;
  border-color: #2c3e50;
}

/* Main Content */
.main-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-links {
    flex-direction: column;
  }

  .nav-links a {
    text-align: center;
  }
}
</style>
