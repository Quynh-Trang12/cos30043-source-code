<template>
  <div class="page-container">
    <div class="author-profile">
      <div class="author-header">
        <div class="author-avatar-large">{{ name.charAt(0) }}</div>
        <div class="author-info">
          <h2>{{ name }}</h2>
          <p class="bio">{{ authorData.bio }}</p>
          <p class="stats">{{ authorData.posts.length }} posts published</p>
        </div>
      </div>

      <div class="author-posts">
        <h3>Posts by {{ name }}</h3>
        <div class="posts-grid">
          <div
            v-for="post in authorData.posts"
            :key="post.id"
            class="post-card"
          >
            <h4>{{ post.title }}</h4>
            <p class="date">{{ post.date }}</p>
            <p class="excerpt">{{ post.excerpt }}</p>
            <router-link :to="`/blog/post/${post.id}`" class="read-more">
              Read More →
            </router-link>
          </div>
        </div>
      </div>

      <div class="actions">
        <button @click="goBack" class="btn-back">← Back to Blog</button>
      </div>
    </div>

    <div class="example-section">
      <h3>Code Example: Route Props with String Parameter</h3>

      <div class="code-output-pair">
        <div class="code-section">
          <h4>Router Configuration:</h4>
          <pre v-pre><code class="language-javascript">const routes = [
  {
    path: '/blog/author/:name',
    component: BlogAuthor,
    props: true  // Pass name as prop
  }
]</code></pre>

          <h4>Component Code:</h4>
          <pre v-pre><code class="language-javascript">export default {
  props: {
    name: String  // Receive author name
  },
  data() {
    return {
      authorData: null
    }
  },
  mounted() {
    this.authorData = this.fetchAuthor(this.name)
  },
  methods: {
    fetchAuthor(name) {
      // Fetch author data by name
      return {
        bio: 'Author bio...',
        posts: [...]
      }
    }
  }
}</code></pre>
        </div>

        <div class="output-section">
          <h4>Output:</h4>
          <div class="output-box">
            <p><strong>Author Name:</strong> {{ name }}</p>
            <p><strong>Received as prop:</strong> ✓</p>
            <p><strong>Total Posts:</strong> {{ authorData.posts.length }}</p>
            <p class="note">
              Route props work with any parameter type (String, Number, etc.)
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogAuthor",
  props: {
    name: String,
  },
  data() {
    return {
      authorData: null,
    };
  },
  mounted() {
    this.authorData = this.fetchAuthor(this.name);
  },
  methods: {
    fetchAuthor(name) {
      // Simulate fetching author data
      const authors = {
        Alice: {
          bio: "Frontend developer passionate about Vue.js and modern web technologies. Love sharing knowledge through writing.",
          posts: [
            {
              id: 1,
              title: "Getting Started with Vue Router",
              date: "January 15, 2026",
              excerpt:
                "Learn the basics of Vue Router and how to set up routing in your Vue.js applications.",
            },
            {
              id: 4,
              title: "Dynamic Routes Explained",
              date: "January 30, 2026",
              excerpt:
                "Understanding dynamic route parameters and how to use them effectively.",
            },
          ],
        },
        Bob: {
          bio: "Full-stack engineer and tech blogger with 10+ years of experience. Specializing in Vue.js, Node.js, and cloud architecture.",
          posts: [
            {
              id: 2,
              title: "Advanced Routing Techniques",
              date: "January 20, 2026",
              excerpt:
                "Explore advanced features like route guards, lazy loading, and nested routes.",
            },
          ],
        },
        Charlie: {
          bio: "UI/UX designer and Vue enthusiast. Creating beautiful and functional user interfaces with Vue.js.",
          posts: [
            {
              id: 3,
              title: "Building SPAs with Vue",
              date: "January 25, 2026",
              excerpt:
                "Discover how to build powerful single-page applications using Vue.js and Vue Router.",
            },
          ],
        },
      };

      return (
        authors[name] || {
          bio: `Bio for ${name}`,
          posts: [],
        }
      );
    },
    goBack() {
      this.$router.push("/blog");
    },
  },
  watch: {
    name: {
      immediate: false,
      handler(newName) {
        this.authorData = this.fetchAuthor(newName);
      },
    },
  },
};
</script>

<style scoped>
.page-container {
  padding: 20px;
}

.author-profile {
  background-color: white;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 30px;
}

.author-header {
  display: flex;
  gap: 30px;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 2px solid #42b983;
}

.author-avatar-large {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #42b983;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: bold;
  flex-shrink: 0;
}

.author-info {
  flex: 1;
}

.author-info h2 {
  color: #2c3e50;
  margin: 0 0 10px 0;
}

.bio {
  color: #555;
  line-height: 1.6;
  margin: 10px 0;
}

.stats {
  color: #666;
  font-size: 14px;
  font-weight: bold;
  margin: 10px 0 0 0;
}

.author-posts h3 {
  color: #42b983;
  margin-bottom: 20px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.post-card {
  background-color: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.post-card h4 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 10px;
}

.date {
  color: #666;
  font-size: 13px;
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

.actions {
  margin-top: 30px;
}

.btn-back {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-back:hover {
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
  .author-header {
    flex-direction: column;
    text-align: center;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }

  .code-output-pair {
    grid-template-columns: 1fr;
  }
}
</style>
