# Full Stack Vue.js - Product Management Application

## Requirements

- Users can view a list of products.
- Users can add new product
- Users can edit existing product information.
- Users can delete products.
- The application should provide form validation for product data.

## API Endpoints

**Base URL:** `https://fakestoreapi.com`

| Method | Endpoint | Description | Function | Parameters | Response | Status |
|--------|----------|-------------|----------|------------|----------|--------|
| GET | `/products` | Retrieves a list of all products from the store | `getAllProducts()` | None | Array of product objects | ✅ Implemented |
| GET | `/products/{id}` | Retrieves a single product by its ID | `getProductById(id)` | `id` (number) - Product ID | Single product object | 🔄 TODO |
| POST | `/products` | Creates a new product in the store | `createProduct(productData)` | Product object (title, price, description, category, image) | Created product object with ID | ✅ Implemented |
| PUT | `/products/{id}` | Performs a full update of a product (replaces all fields) | `updateProduct(id, productData)` | `id` (number), Complete product object | Updated product object | 🔄 TODO |
| PATCH | `/products/{id}` | Performs a partial update (updates only specified fields) | `patchProduct(id, productData)` | `id` (number), Partial product object | Updated product object | 🔄 TODO |
| DELETE | `/products/{id}` | Deletes a product from the store by its ID | `deleteProduct(id)` | `id` (number) - Product ID to delete | Deleted product object | ✅ Implemented |

### Product Object Structure

```json
{
  "id": 1,
  "title": "Product Title",
  "price": 109.95,
  "description": "Product description",
  "category": "men's clothing",
  "image": "https://fakestoreapi.com/img/example.jpg"
}
```

## Folder Structure

| Path | Type | Description |
|------|------|-------------|
| **src/** | Folder | Main source code directory |
| `src/main.js` | File | Application entry point - initializes Vue app, router, and mounts to DOM |
| `src/App.vue` | File | Root Vue component - main application layout wrapper |
| `src/style.css` | File | Global CSS styles for the application |
| **src/api/** | Folder | API service layer for backend communication |
| `src/api/productApi.js` | File | Product API functions using Axios (getAllProducts, createProduct, deleteProduct, etc.) |
| **src/assets/** | Folder | Static assets (images, icons) used in components |
| **src/components/** | Folder | Reusable Vue components |
| `src/components/AddProductModal.vue` | File | Modal component for adding new products with form inputs (title, price, category, description, image) |
| **src/router/** | Folder | Vue Router configuration for navigation |
| `src/router/index.js` | File | Router setup with routes: Home (/), About (/about), Products (/products) |
| **src/views/** | Folder | Page-level Vue components (route views) |
| `src/views/HomeView.vue` | File | Home page component |
| `src/views/AboutView.vue` | File | About page component |
| `src/views/ProductView.vue` | File | Products page with CRUD operations, table display, pagination, and product management |

### Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Vue.js | 3.5.30 | Progressive JavaScript framework for building user interfaces |
| Vue Router | 4.6.4 | Official routing library for Vue.js single-page applications |
| Axios | 1.13.6 | Promise-based HTTP client for API requests |
| Vuejs-paginate-next | 1.0.2 | Pagination component for Vue 3 |
| Vite | 8.0.0 | Fast build tool and development server |

## C4 Container Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                                    User                                      │
│                              [Person]                                        │
│                                                                              │
│              A user managing products through the web interface              │
└───────────────────────────────┬──────────────────────────────────────────────┘
                                │
                                │ Uses
                                │ [HTTPS]
                                v
┌───────────────────────────────────────────────────────────────────────────────┐
│                     Vue.js Single Page Application                            │
│                          [Container: Web App]                                 │
│                   Technology: Vue 3, Vue Router, Vite                         │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────────┐  │
│  │  main.js + App.vue                                                      │  │
│  │  [Application Bootstrap]                                                │  │
│  │  - Initializes Vue app                                                  │  │
│  │  - Mounts router                                                        │  │
│  └────────────────┬────────────────────────────────────────────────────────┘  │
│                   │                                                           │
│                   │                                                           │
│  ┌────────────────v─────────────────┐     ┌──────────────────────────────┐    │
│  │      router/ (index.js)          │     │     assets/                  │    │
│  │   [Routing Layer]                │     │  [Static Resources]          │    │
│  │   - Route definitions            │     │  - Images (hero.png)         │    │
│  │   - Navigation logic             │     │  - Icons (vite.svg, vue.svg) │    │
│  └────┬─────┬──────────┬────────────┘     └──────────────────────────────┘    │
│       │     │          │                                                      │
│       │     │          │                                                      │
│  ┌────v─────v──────────v────────────────────────────────────────────────────┐ │
│  │                     views/                                               │ │
│  │                  [Page Views]                                            │ │
│  │  ┌──────────────┐  ┌───────────────┐  ┌───────────────────────────┐      │ │
│  │  │ HomeView.vue │  │AboutView.vue  │  │   ProductView.vue         │      │ │
│  │  │   [/]        │  │  [/about]     │  │     [/products]           │      │ │
│  │  └──────────────┘  └───────────────┘  └────────┬──────────────────┘      │ │
│  │                                                │                         │ │
│  │                                                │ Uses                    │ │
│  └────────────────────────────────────────────────┼─────────────────────────┘ │
│                                                   │                           │
│  ┌────────────────────────────────────────────────v─────────────────────────┐ │
│  │                      components/                                         │ │
│  │                 [Reusable Components]                                    │ │
│  │  ┌──────────────────────────────────────────────────────────────────┐    │ │
│  │  │            AddProductModal.vue                                   │    │ │
│  │  │  - Product form (title, price, category, description, image)     │    │ │
│  │  │  - Form validation                                               │    │ │
│  │  │  - Emit events to parent                                         │    │ │
│  │  └──────────────────────────────────────────────────────────────────┘    │ │
│  └──────────────────────────────────────────────────────────────────────────┘ │
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────────────┐ │
│  │                          api/ (productApi.js)                            │ │
│  │                         [API Service Layer]                              │ │
│  │                        Technology: Axios                                 │ │
│  │  - getAllProducts()         - createProduct()                            │ │
│  │  - getProductById()         - updateProduct()                            │ │
│  │  - getProductsByCategory()  - patchProduct()                             │ │
│  │  - deleteProduct()                                                       │ │
│  └────────────────────────────────┬─────────────────────────────────────────┘ │
└───────────────────────────────────┴───────────────────────────────────────────┘
                                    │
                                    │ Makes API calls to
                                    │ [HTTPS/JSON]
                                    v
┌───────────────────────────────────────────────────────────────────────────────┐
│                      Fake Store API                                           │
│                   [External System]                                           │
│              https://fakestoreapi.com                                         │
│                                                                               │
│  Provides RESTful API for product data (GET, POST, PUT, PATCH, DELETE)        │
└───────────────────────────────────────────────────────────────────────────────┘

Legend:
────────   Relationship/Data Flow
┌──────┐   Container/Component Boundary
```

### Architecture Overview

**Application Flow:**

1. **User** interacts with the **Vue.js SPA** through a web browser
2. **main.js + App.vue** initializes the application and Vue Router
3. **Router** directs users to different **Views** (Home, About, Products)
4. **ProductView** uses **AddProductModal** component for creating products
5. **Views** call **API Service Layer** (productApi.js) for data operations
6. **API Service** makes HTTP requests to **Fake Store API** using Axios
7. **Fake Store API** returns JSON data back through the chain

## Vue.js Component Communication - Emit Events Flow

### Overview

This application demonstrates **Parent-Child Communication** using Vue 3's emit event system between `ProductView.vue` (parent) and `AddProductModal.vue` (child component).

### Complete Event Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ProductView.vue (Parent)                            │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  Template:                                                         │     │
│  │  <button @click="addProduct">Add Product</button>                  │     │
│  │                                                                    │     │
│  │  <AddProductModal                                                 │     │
│  │    :visible="showAddModal"         ← Prop binding (data down)    │     │
│  │    @close="handleCloseModal"       ← Event listener (events up)  │     │
│  │    @add="handleAddProduct"         ← Event listener (events up)  │     │
│  │  />                                                               │     │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  data() {                                                          │    │
│  │    return { showAddModal: false, products: [] }                   │    │
│  │  }                                                                 │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │  methods: {                                                        │    │
│  │    addProduct() {                                                  │    │
│  │      this.showAddModal = true  ← Opens modal                      │    │
│  │    },                                                              │    │
│  │    handleCloseModal() {                                            │    │
│  │      this.showAddModal = false ← Closes modal                     │    │
│  │    },                                                              │    │
│  │    async handleAddProduct(productData) {                           │    │
│  │      const response = await createProduct(productData)            │    │
│  │      this.products.push(response.data)                            │    │
│  │      this.showAddModal = false                                    │    │
│  │    }                                                               │    │
│  │  }                                                                 │    │
│  └────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
                 Props Down ↓     │     ↑ Events Up
                                  │
┌─────────────────────────────────▼───────────────────────────────────────────┐
│                    AddProductModal.vue (Child Component)                    │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  props: {                                                          │     │
│  │    visible: { type: Boolean, default: false }                      │     │
│  │  }                                                                 │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  data() {                                                          │     │
│  │    return {                                                        │     │
│  │      product: {                                                    │     │
│  │        title: "", price: 0, category: "",                          │     │
│  │        description: "", image: ""                                  │     │
│  │      }                                                             │     │
│  │    }                                                               │     │
│  │  }                                                                 │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  methods: {                                                        │     │
│  │    closeModal() {                                                  │     │
│  │      this.$emit('close')  ← Emits 'close' event to parent          │     │
│  │    },                                                              │     │
│  │    submitProduct() {                                               │     │
│  │      this.$emit('add', { ...this.product })                        │     │
│  │             ↑      ↑                                               │     │
│  │       Event Name   Payload (product data)                          │     │
│  │      this.closeModal()                                             │     │
│  │    }                                                               │     │
│  │  }                                                                 │     │
│  └────────────────────────────────────────────────────────────────────┘     │
│                                                                             │
│  ┌────────────────────────────────────────────────────────────────────┐     │
│  │  Template Actions:                                                 │     │
│  │  <button @click="closeModal">Cancel</button>                       │    │
│  │  <form @submit.prevent="submitProduct">                            │    │
│  │    <input v-model="product.title" />                               │    │
│  │    <input v-model="product.price" />                               │    │
│  │    <button type="submit">Add Product</button>                      │    │
│  │  </form>                                                           │    │
│  └────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Step-by-Step Event Flow

#### Scenario 1: User Adds a New Product

```
┌────────┐      ┌──────────────┐      ┌──────────────────┐      ┌──────────┐
│  User  │      │ ProductView  │      │AddProductModal   │      │   API    │
└───┬────┘      └──────┬───────┘      └────────┬─────────┘      └────┬─────┘
    │                  │                       │                     │
    │ 1. Clicks        │                       │                     │
    │ "Add Product"    │                       │                     │
    ├─────────────────>│                       │                     │
    │                  │                       │                     │
    │                  │ 2. Sets               │                     │
    │                  │ showAddModal = true   │                     │
    │                  │                       │                     │
    │                  │ 3. Props update       │                     │
    │                  │ :visible="true"       │                     │
    │                  ├──────────────────────>│                     │
    │                  │                       │                     │
    │                  │ 4. Modal opens        │                     │
    │                  │    displays form      │                     │
    │                  │                       │                     │
    │ 5. Fills form    │                       │                     │
    │ and submits      │                       │                     │
    ├──────────────────┼──────────────────────>│                     │
    │                  │                       │                     │
    │                  │                       │ 6. Validates data   │
    │                  │                       │    collects input   │
    │                  │                       │                     │
    │                  │ 7. Emits 'add' event  │                     │
    │                  │    with productData   │                     │
    │                  │<──────────────────────┤                     │
    │                  │                       │                     │
    │                  │ 8. handleAddProduct() │                     │
    │                  │    receives data      │                     │
    │                  │                       │                     │
    │                  │ 9. POST /products     │                     │
    │                  ├───────────────────────┼────────────────────>│
    │                  │                       │                     │
    │                  │ 10. Response (201)    │                     │
    │                  │<────────────────────────────────────────────┤
    │                  │                       │                     │
    │                  │ 11. Adds to           │                     │
    │                  │     products array    │                     │
    │                  │                       │                     │
    │                  │ 12. Sets              │                     │
    │                  │ showAddModal = false  │                     │
    │                  │                       │                     │
    │                  │ 13. Props update      │                     │
    │                  │ :visible="false"      │                     │
    │                  ├──────────────────────>│                     │
    │                  │                       │                     │
    │                  │ 14. Modal closes      │                     │
    │ 15. Sees new     │                       │                     │
    │     product in   │                       │                     │
    │     table        │                       │                     │
    │<─────────────────┤                       │                     │
```

#### Scenario 2: User Cancels Modal

```
┌────────┐      ┌──────────────┐      ┌──────────────────┐
│  User  │      │ ProductView  │      │AddProductModal   │
└───┬────┘      └──────┬───────┘      └────────┬─────────┘
    │                  │                       │
    │ 1. Opens modal   │                       │
    ├─────────────────>│──────────────────────>│
    │                  │                       │
    │ 2. Clicks        │                       │
    │    Cancel or X   │                       │
    ├──────────────────┼──────────────────────>│
    │                  │                       │
    │                  │ 3. closeModal()       │
    │                  │    this.$emit('close')│
    │                  │<──────────────────────┤
    │                  │                       │
    │                  │ 4. handleCloseModal() │
    │                  │    showAddModal=false │
    │                  │                       │
    │                  │ 5. Modal hidden       │
    │                  ├──────────────────────>│
```

### Key Concepts

#### 1. Props Down (Parent → Child)

```javascript
// ProductView.vue (Parent)
<AddProductModal :visible="showAddModal" />

// AddProductModal.vue (Child)
props: {
  visible: { type: Boolean, default: false }
}
```

**Purpose:** Pass data from parent to child (one-way data flow)

#### 2. Events Up (Child → Parent)

```javascript
// AddProductModal.vue (Child) - Emitting events
methods: {
  closeModal() {
    this.$emit('close')  // No payload
  },
  submitProduct() {
    this.$emit('add', { ...this.product })  // With payload
  }
}

// ProductView.vue (Parent) - Listening to events
<AddProductModal
  @close="handleCloseModal"
  @add="handleAddProduct"
/>

methods: {
  handleCloseModal() {
    // Handle close event
  },
  handleAddProduct(productData) {
    // Handle add event with payload
  }
}
```

**Purpose:** Child notifies parent of user actions or state changes

#### 3. Event Payload

The `add` event sends the complete product data object:

```javascript
{
  title: "Fjallraven Backpack",
  price: 109.95,
  description: "Perfect for everyday use...",
  category: "men's clothing",
  image: "http://example.com/image.jpg"
}
```

### Event Types in This Application

| Event Name | Source | Target | Payload | Purpose |
|------------|--------|--------|---------|---------|
| `close` | AddProductModal | ProductView | None | Close the modal without saving |
| `add` | AddProductModal | ProductView | Product Object | Submit new product data to parent |

## How Pagination Works in ProductView.vue

### What is Pagination?

Pagination splits a large list of products into smaller pages. Instead of showing all 100 products at once, we show 5 products per page.

**Why?** Better performance and easier to read!

### The Three Main Parts

#### 1. Data - Store the Information

```javascript
data() {
  return {
    products: [],        // All products from API
    currentPage: 1,      // Which page we're on (starts at 1)
    itemsPerPage: 5      // Show 5 products per page
  }
}
```

#### 2. Computed - Calculate What to Show

```javascript
computed: {
  // How many pages do we need?
  pageCount() {
    return Math.ceil(this.products.length / this.itemsPerPage);
    // Example: 12 products ÷ 5 per page = 2.4 → rounds up to 3 pages
  },

  // Which products should display on current page?
  paginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.products.slice(start, end);
  }
}
```

#### 3. Method - Handle Page Changes

```javascript
methods: {
  handlePageChange(pageNum) {
    this.currentPage = pageNum;  // Update current page
    // Vue automatically recalculates paginatedProducts!
  }
}
```

### How It Works - Simple Example

**Scenario:** You have 12 products and show 5 per page

```
All Products: [P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12]
Items per page: 5
Total pages needed: 12 ÷ 5 = 2.4 → 3 pages

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PAGE 1 (currentPage = 1):
  start = (1-1) × 5 = 0
  end = 0 + 5 = 5
  Display: [P1, P2, P3, P4, P5]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PAGE 2 (currentPage = 2):
  start = (2-1) × 5 = 5
  end = 5 + 5 = 10
  Display: [P6, P7, P8, P9, P10]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PAGE 3 (currentPage = 3):
  start = (3-1) × 5 = 10
  end = 10 + 5 = 15
  Display: [P11, P12]  (only 2 items left)
```

### Template - Display the Pagination

```vue
<!-- Show only current page products -->
<tr v-for="product in paginatedProducts" :key="product.id">
  <td>{{ product.title }}</td>
</tr>

<!-- Pagination buttons -->
<paginate
  :page-count="pageCount"
  :click-handler="handlePageChange"
  :prev-text="'Previous'"
  :next-text="'Next'"
/>

```

### What Happens When User Clicks Page 2?

```bash

1. User clicks "2" button
   ↓
2. handlePageChange(2) is called
   ↓
3. currentPage changes from 1 to 2
   ↓
4. Vue recalculates paginatedProducts automatically
   ↓
5. Table updates to show products 6-10

```

### Key Points to Remember

✅ **Store all products** in `products` array
✅ **Computed properties** automatically recalculate when data changes
✅ **Display only** `paginatedProducts` in the table, not all products
✅ **Vue's reactivity** handles all updates automatically - no manual work!

## Student Tasks (TODO)

Complete the following incomplete features:

### 1. Implement API Functions in `productApi.js`

| Function | Method | Endpoint | Description |
|----------|--------|----------|-------------|
| `getProductById(id)` | GET | `/products/{id}` | Fetch a single product by ID |
| `getProductsByCategory(category)` | GET | `/products/category/{category}` | Fetch products by category |
| `updateProduct(id, productData)` | PUT | `/products/{id}` | Update complete product |
| `patchProduct(id, productData)` | PATCH | `/products/{id}` | Update partial product |

### 2. Implement View Functions in `ProductView.vue`

| Function | Description |
|----------|-------------|
| `editProduct(product)` | Create edit modal, update product, modify list |
| `viewProduct(product)` | Show product details in modal or new page |

### 3. Checklist

- [ ] All 4 API functions implemented
- [ ] Edit product works
- [ ] View product works
- [ ] Tested all features
