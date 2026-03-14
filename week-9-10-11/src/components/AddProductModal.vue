<template>
  <div v-if="visible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Add New Product</h2>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="submitProduct">
          <div class="form-group">
            <label for="title">Title:</label>
            <input
              id="title"
              v-model="product.title"
              type="text"
              required
              placeholder="Enter product title"
            />
          </div>
          <div class="form-group">
            <label for="price">Price:</label>
            <input
              id="price"
              v-model.number="product.price"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="Enter price"
            />
          </div>
          <div class="form-group">
            <label for="category">Category:</label>
            <select id="category" v-model="product.category" required>
              <option value="" disabled>Select a category</option>
              <option value="jewelery">jewelery</option>
              <option value="electronics">electronics</option>
              <option value="men's clothing">men's clothing</option>
              <option value="women's clothing">women's clothing</option>
            </select>
          </div>
          <div class="form-group">
            <label for="description">Description:</label>
            <textarea
              id="description"
              v-model="product.description"
              rows="4"
              required
              placeholder="Enter product description"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="image">Image URL:</label>
            <input
              id="image"
              v-model="product.image"
              type="url"
              required
              placeholder="Enter image URL"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-cancel" @click="closeModal">
              Cancel
            </button>
            <button type="submit" class="btn-submit">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddProductModal",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      product: {
        title: "",
        price: 0,
        category: "",
        description: "",
        image: "",
      },
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.product = {
          title: "",
          price: 0,
          category: "",
          description: "",
          image: "",
        };
      }
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    submitProduct() {
      this.$emit("add", { ...this.product });
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #333;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #007bff;
}

.modal-footer {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn-cancel,
.btn-submit {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.btn-cancel {
  background-color: #f5f5f5;
  color: #333;
}

.btn-cancel:hover {
  background-color: #e0e0e0;
}

.btn-submit {
  background-color: #007bff;
  color: white;
}

.btn-submit:hover {
  background-color: #0056b3;
}
</style>
