<template>
  <div class="page-container">
    <div v-if="loading" class="loading">
      <p>Loading post...</p>
    </div>

    <div v-else class="blog-post">
      <h2>{{ post.title }}</h2>
      <div class="post-meta">
        <span class="author">By {{ post.author }}</span>
        <span class="date">{{ post.date }}</span>
      </div>

      <div class="post-content">
        <p>{{ post.content }}</p>
      </div>

      <div class="post-actions">
        <button @click="goBack" class="btn-back">← Back to Blog</button>
        <button @click="goToAuthor" class="btn-author">
          View Author Profile
        </button>
      </div>
    </div>

    <div class="example-section">
      <h3>Code Example: Route Props</h3>

      <div class="code-output-pair">
        <div class="code-section">
          <h4>Router Configuration:</h4>
          <pre v-pre><code class="language-javascript">const routes = [
  {
    path: '/blog/post/:id',
    component: BlogPost,
    props: true  // Enable route props
  }
]</code></pre>

          <h4>Component Code:</h4>
          <pre v-pre><code class="language-javascript">export default {
  props: {
    id: String  // Receive as prop
  },
  data() {
    return {
      post: null,
      loading: true
    }
  },
  async mounted() {
    this.loading = true
    // Simulate API call
    await new Promise(resolve =>
      setTimeout(resolve, 1000))
    this.post = this.fetchPost(this.id)
    this.loading = false
  },
  methods: {
    goBack() {
      this.$router.push('/blog')
    }
  }
}</code></pre>
        </div>

        <div class="output-section">
          <h4>Output:</h4>
          <div class="output-box">
            <p><strong>Current Post ID:</strong> {{ id }}</p>
            <p><strong>Received as prop:</strong> ✓</p>
            <p>
              <strong>Cleaner than:</strong> <code>this.$route.params.id</code>
            </p>
            <p class="note">
              Route props make components more reusable and testable!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogPost",
  props: {
    id: String,
  },
  data() {
    return {
      post: null,
      loading: true,
    };
  },
  async mounted() {
    this.loading = true;
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.post = this.fetchPost(this.id);
    this.loading = false;
  },
  methods: {
    fetchPost(id) {
      // Simulate fetching post data
      const posts = {
        1: {
          title: "Getting Started with Vue Router",
          author: "Alice",
          date: "January 15, 2026",
          content:
            "Vue Router is the official routing library for Vue.js. It deeply integrates with Vue.js core to make building Single Page Applications with Vue.js a breeze. Features include nested routes, modular route configuration, route params, query, wildcards, and much more. In this comprehensive guide, we'll explore all the essential concepts you need to master Vue Router.",
        },
        2: {
          title: "Advanced Routing Techniques",
          author: "Bob",
          date: "January 20, 2026",
          content:
            "Once you've mastered the basics of Vue Router, it's time to dive into advanced techniques. We'll cover route guards for authentication, lazy loading components for better performance, nested routes for complex layouts, and programmatic navigation for dynamic user flows. These techniques will help you build more sophisticated and performant applications.",
        },
        3: {
          title: "Building SPAs with Vue",
          author: "Charlie",
          date: "January 25, 2026",
          content:
            "Single Page Applications (SPAs) provide a seamless user experience by loading content dynamically without full page reloads. Vue.js, combined with Vue Router, makes building SPAs incredibly straightforward. Learn how to structure your application, manage state, handle navigation, and create smooth transitions between views.",
        },
        4: {
          title: "Dynamic Routes Explained",
          author: "Alice",
          date: "January 30, 2026",
          content:
            "Dynamic routes are a powerful feature of Vue Router that allow you to create flexible, data-driven applications. By using route parameters, you can create routes that match patterns and extract values from the URL. This is essential for building features like user profiles, product pages, and blog posts where the content depends on the URL.",
        },
      };

      return (
        posts[id] || {
          title: `Blog Post ${id}`,
          author: "Unknown",
          date: "Unknown",
          content: `Content for post ID: ${id}`,
        }
      );
    },
    goBack() {
      this.$router.push("/blog");
    },
    goToAuthor() {
      this.$router.push(`/blog/author/${this.post.author}`);
    },
  },
  watch: {
    id: {
      immediate: false,
      async handler(newId) {
        // Reload when route parameter changes
        this.loading = true;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.post = this.fetchPost(newId);
        this.loading = false;
      },
    },
  },
};
</script>

<style scoped>
.page-container {
  padding: 20px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 18px;
}

.blog-post {
  background-color: white;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 30px;
}

.blog-post h2 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 15px;
}

.post-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
  color: #666;
  font-size: 14px;
}

.author {
  font-weight: bold;
}

.post-content {
  line-height: 1.8;
  color: #333;
  margin-bottom: 30px;
}

.post-content p {
  margin: 15px 0;
}

.post-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn-back,
.btn-author {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.btn-back {
  background-color: #42b983;
  color: white;
}

.btn-back:hover {
  background-color: #35a372;
}

.btn-author {
  background-color: #2c3e50;
  color: white;
}

.btn-author:hover {
  background-color: #1a252f;
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
  margin-bottom: 20px;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
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

.output-box {
  padding: 15px;
  border: 1px solid #e0e0e0;
  background-color: white;
  min-height: 100px;
}

.output-box p {
  margin: 10px 0;
}

.note {
  font-size: 12px;
  color: #666;
  font-style: italic;
  margin-top: 15px;
}

@media (max-width: 768px) {
  .code-output-pair {
    grid-template-columns: 1fr;
  }

  .post-actions {
    flex-direction: column;
  }

  .btn-back,
  .btn-author {
    width: 100%;
  }
}
</style>
