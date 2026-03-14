<template>
  <div class="page-container">
    <h2>Blog Home</h2>

    <div class="blog-section">
      <h3>Recent Blog Posts</h3>
      <div class="blog-grid">
        <div v-for="post in posts" :key="post.id" class="blog-card">
          <h4>{{ post.title }}</h4>
          <p class="author">By {{ post.author }}</p>
          <p class="excerpt">{{ post.excerpt }}</p>
          <router-link :to="`/blog/post/${post.id}`" class="read-more">
            Read More →
          </router-link>
        </div>
      </div>
    </div>

    <div class="blog-section">
      <h3>Featured Authors</h3>
      <div class="author-grid">
        <div v-for="author in authors" :key="author.name" class="author-card">
          <div class="author-avatar">{{ author.name.charAt(0) }}</div>
          <h4>{{ author.name }}</h4>
          <p>{{ author.bio }}</p>
          <router-link :to="`/blog/author/${author.name}`" class="view-profile">
            View Profile
          </router-link>
        </div>
      </div>
    </div>

    <div class="example-section">
      <h3>Code Example: Dynamic Routes</h3>
      <pre v-pre><code class="language-javascript">// Router configuration
const routes = [
  { path: '/blog', component: BlogHome },
  { path: '/blog/post/:id', component: BlogPost, props: true },
  { path: '/blog/author/:name', component: BlogAuthor, props: true }
]

// Navigate to dynamic routes
&lt;router-link :to="`/blog/post/${post.id}`"&gt;Read More&lt;/router-link&gt;
&lt;router-link :to="`/blog/author/${author.name}`"&gt;View Profile&lt;/router-link&gt;</code></pre>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogHome",
  data() {
    return {
      posts: [
        {
          id: 1,
          title: "Getting Started with Vue Router",
          author: "Alice",
          excerpt:
            "Learn the basics of Vue Router and how to set up routing in your Vue.js applications.",
        },
        {
          id: 2,
          title: "Advanced Routing Techniques",
          author: "Bob",
          excerpt:
            "Explore advanced features like route guards, lazy loading, and nested routes.",
        },
        {
          id: 3,
          title: "Building SPAs with Vue",
          author: "Charlie",
          excerpt:
            "Discover how to build powerful single-page applications using Vue.js and Vue Router.",
        },
        {
          id: 4,
          title: "Dynamic Routes Explained",
          author: "Alice",
          excerpt:
            "Understanding dynamic route parameters and how to use them effectively.",
        },
      ],
      authors: [
        {
          name: "Alice",
          bio: "Frontend developer passionate about Vue.js",
        },
        {
          name: "Bob",
          bio: "Full-stack engineer and tech blogger",
        },
        {
          name: "Charlie",
          bio: "UI/UX designer and Vue enthusiast",
        },
      ],
    };
  },
};
</script>

<style scoped>
.page-container {
  padding: 20px;
}

h2 {
  color: #2c3e50;
  margin-bottom: 30px;
}

.blog-section {
  margin-bottom: 40px;
}

.blog-section h3 {
  color: #42b983;
  margin-bottom: 20px;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.blog-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.blog-card h4 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 10px;
}

.author {
  color: #666;
  font-size: 14px;
  margin: 5px 0;
}

.excerpt {
  color: #555;
  line-height: 1.6;
  margin: 15px 0;
}

.read-more {
  display: inline-block;
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
  margin-top: 10px;
}

.read-more:hover {
  color: #35a372;
}

.author-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.author-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.author-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #42b983;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin: 0 auto 15px;
}

.author-card h4 {
  color: #2c3e50;
  margin: 10px 0;
}

.author-card p {
  color: #666;
  font-size: 14px;
  margin: 10px 0;
}

.view-profile {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.view-profile:hover {
  background-color: #35a372;
}

.example-section {
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.example-section h3 {
  color: #42b983;
  margin-top: 0;
  margin-bottom: 15px;
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

@media (max-width: 768px) {
  .blog-grid,
  .author-grid {
    grid-template-columns: 1fr;
  }
}
</style>
