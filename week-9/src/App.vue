<template>
  <div class="app-container">
    <!-- Navigation -->
    <nav class="navigation">
      <h1>Week 9: API 2 and Pagination</h1>
      <div class="nav-buttons">
        <button
          v-for="(example, index) in examples"
          :key="index"
          @click="currentExample = index"
          :class="{ active: currentExample === index }"
        >
          {{ example.name }}
        </button>
      </div>
    </nav>

    <!-- Example 1: Basic Pagination -->
    <section v-if="currentExample === 0" class="example-section">
      <h2>{{ examples[0].name }}</h2>

      <div class="example-item">
        <h3>1. Basic Client-Side Pagination</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Data Setup:</h4>
            <pre v-pre><code class="language-javascript">data() {
  return {
    items: [], // All items from API
    currentPage: 1,
    perPage: 10,
    loading: false
  }
}</code></pre>

            <h4>Methods - API Call:</h4>
            <pre v-pre><code class="language-javascript">methods: {
  async loadData() {
    this.loading = true
    const response = await fetch('https://api.example.com/users')
    this.items = await response.json()
    this.loading = false
  },
  handlePageChange(page) {
    this.currentPage = page
  }
}</code></pre>

            <h4>Computed Properties:</h4>
            <pre v-pre><code class="language-javascript">computed: {
  pageCount() {
    return Math.ceil(this.items.length / this.perPage)
  },
  paginatedItems() {
    const start = (this.currentPage - 1) * this.perPage
    const end = start + this.perPage
    return this.items.slice(start, end)
  }
}</code></pre>

            <h4>Template - Complete Flow:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;button @click="loadData"&gt;Load Users&lt;/button&gt;
&lt;div v-if="loading"&gt;Loading...&lt;/div&gt;
&lt;div v-else-if="items.length"&gt;
  &lt;!-- Display paginated items --&gt;
  &lt;div v-for="user in paginatedItems" :key="user.id"&gt;
    {{ user.name }} - {{ user.email }}
  &lt;/div&gt;

  &lt;!-- Pagination component --&gt;
  &lt;Paginate
    :page-count="pageCount"
    :page-range="5"
    :click-handler="handlePageChange"
  /&gt;
&lt;/div&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <div class="output-box">
              <button @click="loadBasicData">Load Users</button>
              <div v-if="basicLoading">Loading...</div>
              <div v-else-if="basicUsers.length">
                <p class="info">
                  Showing {{ startIndex1 + 1 }} to {{ endIndex1 }} of
                  {{ basicUsers.length }} users
                </p>
                <div
                  v-for="user in paginatedBasicUsers"
                  :key="user.id"
                  class="user-item"
                >
                  <strong>{{ user.name }}</strong> - {{ user.email }}
                </div>
                <Paginate
                  :page-count="pageCount1"
                  :page-range="5"
                  :click-handler="handlePageChange1"
                  :prev-text="'Previous'"
                  :next-text="'Next'"
                  :container-class="'pagination'"
                  :page-class="'page-item'"
                  :active-class="'active'"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="example-item">
        <h3>2. Understanding slice() Method</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>JavaScript Code:</h4>
            <pre
              v-pre
            ><code class="language-javascript">const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const perPage = 3

// Page 1: items 0-2
items.slice(0, 3)  // [1, 2, 3]

// Page 2: items 3-5
items.slice(3, 6)  // [4, 5, 6]

// Page 3: items 6-8
items.slice(6, 9)  // [7, 8, 9]

// Formula:
const start = (currentPage - 1) * perPage
const end = start + perPage
items.slice(start, end)</code></pre>
          </div>

          <div class="output-section">
            <h4>Explanation:</h4>
            <div class="info-box">
              <p>
                <strong>slice(start, end):</strong> Extracts portion of array
              </p>
              <p><strong>Start index:</strong> (currentPage - 1) × perPage</p>
              <p><strong>End index:</strong> start + perPage</p>
              <p>
                <strong>Example:</strong> Page 2 with 10 items/page = slice(10,
                20)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Example 2: Pagination with Filtering -->
    <section v-if="currentExample === 1" class="example-section">
      <h2>{{ examples[1].name }}</h2>

      <div class="example-item">
        <h3>Pagination with Search Filter</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Data Setup:</h4>
            <pre v-pre><code class="language-javascript">data() {
  return {
    allItems: [],
    searchQuery: '',
    currentPage: 1,
    perPage: 10
  }
}</code></pre>

            <h4>Computed Properties:</h4>
            <pre v-pre><code class="language-javascript">computed: {
  filteredItems() {
    return this.allItems.filter(item => {
      return item.name.toLowerCase()
        .includes(this.searchQuery.toLowerCase())
    })
  },
  pageCount() {
    return Math.ceil(this.filteredItems.length / this.perPage)
  },
  paginatedItems() {
    const start = (this.currentPage - 1) * this.perPage
    const end = start + this.perPage
    return this.filteredItems.slice(start, end)
  }
}</code></pre>

            <h4>Template - Search & Pagination:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;input v-model="searchQuery" placeholder="Search..."&gt;
&lt;p&gt;Found {{ filteredItems.length }} items&lt;/p&gt;

&lt;div v-for="item in paginatedItems" :key="item.id"&gt;
  {{ item.name }}
&lt;/div&gt;

&lt;Paginate
  :page-count="pageCount"
  :click-handler="handlePageChange"
/&gt;</code></pre>

            <h4>Watch for Filter Changes:</h4>
            <pre v-pre><code class="language-javascript">watch: {
  searchQuery() {
    this.currentPage = 1  // Reset to page 1
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <div class="output-box">
              <button @click="loadFilterData">Load Posts</button>
              <div v-if="filterLoading">Loading...</div>
              <div v-else-if="filterPosts.length">
                <input
                  v-model="searchQuery"
                  placeholder="Search posts..."
                  class="search-input"
                />
                <p class="info">Found {{ filteredPosts.length }} posts</p>
                <div
                  v-for="post in paginatedFilterPosts"
                  :key="post.id"
                  class="post-item"
                >
                  <strong>{{ post.title }}</strong>
                </div>
                <Paginate
                  :page-count="pageCount2"
                  :page-range="5"
                  :click-handler="handlePageChange2"
                  :container-class="'pagination'"
                  :page-class="'page-item'"
                  :active-class="'active'"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Example 3: Items Per Page Selector -->
    <section v-if="currentExample === 2" class="example-section">
      <h2>{{ examples[2].name }}</h2>

      <div class="example-item">
        <h3>Dynamic Items Per Page</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>Template - Complete Flow:</h4>
            <pre
              v-pre
            ><code class="language-markup">&lt;label&gt;Items per page:
  &lt;select v-model.number="perPage" @change="resetPage"&gt;
    &lt;option :value="10"&gt;10&lt;/option&gt;
    &lt;option :value="25"&gt;25&lt;/option&gt;
    &lt;option :value="50"&gt;50&lt;/option&gt;
  &lt;/select&gt;
&lt;/label&gt;

&lt;p&gt;Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ items.length }}&lt;/p&gt;

&lt;div v-for="item in paginatedItems" :key="item.id"&gt;
  {{ item.name }}
&lt;/div&gt;

&lt;Paginate
  :page-count="pageCount"
  :click-handler="handlePageChange"
/&gt;</code></pre>

            <h4>Methods:</h4>
            <pre v-pre><code class="language-javascript">methods: {
  resetPage() {
    this.currentPage = 1
  }
}</code></pre>
          </div>

          <div class="output-section">
            <h4>Try it:</h4>
            <div class="output-box">
              <button @click="loadPerPageData">Load Comments</button>
              <div v-if="perPageLoading">Loading...</div>
              <div v-else-if="perPageComments.length">
                <label
                  >Items per page:
                  <select v-model.number="perPage3" @change="resetPage3">
                    <option :value="5">5</option>
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                  </select>
                </label>
                <p class="info">
                  Showing {{ startIndex3 + 1 }} to {{ endIndex3 }} of
                  {{ perPageComments.length }} comments
                </p>
                <div
                  v-for="comment in paginatedPerPageComments"
                  :key="comment.id"
                  class="comment-item"
                >
                  <strong>{{ comment.name }}</strong
                  ><br />
                  {{ comment.body.substring(0, 100) }}...
                </div>
                <Paginate
                  :page-count="pageCount3"
                  :page-range="5"
                  :click-handler="handlePageChange3"
                  :container-class="'pagination'"
                  :page-class="'page-item'"
                  :active-class="'active'"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Example 4: Pagination Configuration -->
    <section v-if="currentExample === 3" class="example-section">
      <h2>{{ examples[3].name }}</h2>

      <div class="example-item">
        <h3>Paginate Component Props</h3>

        <div class="code-output-pair">
          <div class="code-section">
            <h4>All Props:</h4>
            <pre v-pre><code class="language-markup">&lt;Paginate
  :page-count="pageCount"
  :page-range="5"
  :margin-pages="2"
  :click-handler="handlePageChange"
  :prev-text="'← Previous'"
  :next-text="'Next →'"
  :break-view-text="'...'"
  :container-class="'pagination'"
  :page-class="'page-item'"
  :active-class="'active'"
  :disabled-class="'disabled'"
  :hide-prev-next="false"
/&gt;</code></pre>
          </div>

          <div class="output-section">
            <h4>Props Explained:</h4>
            <div class="info-box">
              <p><strong>page-count:</strong> Total number of pages</p>
              <p><strong>page-range:</strong> Number of visible page links</p>
              <p><strong>margin-pages:</strong> Pages shown at start/end</p>
              <p>
                <strong>click-handler:</strong> Function called on page change
              </p>
              <p><strong>prev-text/next-text:</strong> Custom button text</p>
              <p><strong>container-class:</strong> CSS class for wrapper</p>
              <p><strong>active-class:</strong> CSS class for current page</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Paginate from "vuejs-paginate-next";

export default {
  name: "App",
  components: {
    Paginate,
  },
  data() {
    return {
      currentExample: 0,
      examples: [
        { name: "Basic Pagination" },
        { name: "Pagination with Filtering" },
        { name: "Items Per Page" },
        { name: "Configuration" },
      ],

      // Example 1: Basic pagination
      basicUsers: [],
      basicLoading: false,
      currentPage1: 1,
      perPage1: 10,

      // Example 2: Filtering
      filterPosts: [],
      filterLoading: false,
      searchQuery: "",
      currentPage2: 1,
      perPage2: 10,

      // Example 3: Items per page
      perPageComments: [],
      perPageLoading: false,
      currentPage3: 1,
      perPage3: 10,
    };
  },
  computed: {
    // Example 1: Basic pagination
    pageCount1() {
      return Math.ceil(this.basicUsers.length / this.perPage1);
    },
    paginatedBasicUsers() {
      const start = (this.currentPage1 - 1) * this.perPage1;
      const end = start + this.perPage1;
      return this.basicUsers.slice(start, end);
    },
    startIndex1() {
      return (this.currentPage1 - 1) * this.perPage1;
    },
    endIndex1() {
      return Math.min(this.startIndex1 + this.perPage1, this.basicUsers.length);
    },

    // Example 2: Filtering
    filteredPosts() {
      if (!this.searchQuery) return this.filterPosts;
      return this.filterPosts.filter((post) => {
        return post.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    },
    pageCount2() {
      return Math.ceil(this.filteredPosts.length / this.perPage2);
    },
    paginatedFilterPosts() {
      const start = (this.currentPage2 - 1) * this.perPage2;
      const end = start + this.perPage2;
      return this.filteredPosts.slice(start, end);
    },

    // Example 3: Items per page
    pageCount3() {
      return Math.ceil(this.perPageComments.length / this.perPage3);
    },
    paginatedPerPageComments() {
      const start = (this.currentPage3 - 1) * this.perPage3;
      const end = start + this.perPage3;
      return this.perPageComments.slice(start, end);
    },
    startIndex3() {
      return (this.currentPage3 - 1) * this.perPage3;
    },
    endIndex3() {
      return Math.min(
        this.startIndex3 + this.perPage3,
        this.perPageComments.length
      );
    },
  },
  watch: {
    searchQuery() {
      this.currentPage2 = 1; // Reset to page 1 when search changes
    },
  },
  methods: {
    // Example 1: Basic pagination
    async loadBasicData() {
      this.basicLoading = true;
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        // Duplicate data to have more items for pagination demo
        this.basicUsers = [...data, ...data, ...data, ...data, ...data];
        this.currentPage1 = 1;
      } catch (error) {
        console.error("Error:", error);
      } finally {
        this.basicLoading = false;
      }
    },
    handlePageChange1(page) {
      this.currentPage1 = page;
      window.scrollTo(0, 0);
    },

    // Example 2: Filtering
    async loadFilterData() {
      this.filterLoading = true;
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        this.filterPosts = await response.json();
        this.currentPage2 = 1;
      } catch (error) {
        console.error("Error:", error);
      } finally {
        this.filterLoading = false;
      }
    },
    handlePageChange2(page) {
      this.currentPage2 = page;
      window.scrollTo(0, 0);
    },

    // Example 3: Items per page
    async loadPerPageData() {
      this.perPageLoading = true;
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/comments"
        );
        this.perPageComments = await response.json();
        this.currentPage3 = 1;
      } catch (error) {
        console.error("Error:", error);
      } finally {
        this.perPageLoading = false;
      }
    },
    handlePageChange3(page) {
      this.currentPage3 = page;
      window.scrollTo(0, 0);
    },
    resetPage3() {
      this.currentPage3 = 1;
    },
  },
};
</script>

<style scoped>
/* Minimal CSS - Focus on functionality */

.app-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Navigation */
.navigation {
  background-color: #42b983;
  padding: 20px;
  margin-bottom: 30px;
}

.navigation h1 {
  color: white;
  margin: 0 0 15px 0;
}

.nav-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.nav-buttons button {
  padding: 10px 20px;
  background-color: white;
  border: 2px solid white;
  cursor: pointer;
}

.nav-buttons button.active {
  background-color: #2c3e50;
  color: white;
}

/* Example Sections */
.example-section {
  background-color: #f5f5f5;
  padding: 20px;
  margin-bottom: 20px;
}

.example-section h2 {
  margin-top: 0;
  color: #2c3e50;
}

.example-item {
  background-color: white;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid #ddd;
}

.example-item h3 {
  margin-top: 0;
  color: #42b983;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
}

/* Code and Output Layout */
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

/* Code Display */
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

/* Output Box */
.output-box {
  padding: 15px;
  border: 1px solid #e0e0e0;
  background-color: white;
  min-height: 100px;
}

.output-box button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 15px;
}

.output-box button:hover {
  background-color: #35a372;
}

.search-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
}

.info {
  color: #666;
  font-size: 14px;
  margin: 10px 0;
}

.user-item,
.post-item,
.comment-item {
  padding: 10px;
  border: 1px solid #e0e0e0;
  margin: 5px 0;
  background-color: #fafafa;
}

.info-box {
  padding: 15px;
  background-color: #e3f2fd;
  border-left: 4px solid #2196f3;
  border-radius: 4px;
}

.info-box p {
  margin: 8px 0;
}

.info-box strong {
  color: #1976d2;
}

/* Pagination Styles */
.pagination {
  display: flex;
  list-style: none;
  gap: 5px;
  padding: 0;
  margin: 15px 0;
  flex-wrap: wrap;
}

.page-item {
  padding: 8px 12px;
  border: 1px solid #ddd;
  cursor: pointer;
  background-color: white;
  transition: all 0.3s;
}

.page-item:hover {
  background-color: #f0f0f0;
}

.page-item.active {
  background-color: #42b983;
  color: white;
  border-color: #42b983;
}

.page-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .code-output-pair {
    grid-template-columns: 1fr;
  }

  .nav-buttons {
    flex-direction: column;
  }

  .nav-buttons button {
    width: 100%;
  }
}
</style>
