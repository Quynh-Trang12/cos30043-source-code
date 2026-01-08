<template>
  <div class="crud-container">
    <h3>User Management (CRUD)</h3>

    <!-- CREATE Form -->
    <div class="create-form">
      <h4>Add New User</h4>
      <form @submit.prevent="addUser">
        <input v-model="newName" placeholder="Name" required />
        <input v-model="newEmail" placeholder="Email" type="email" required />
        <button type="submit">Add User (POST)</button>
      </form>
    </div>

    <!-- Loading State -->
    <div v-if="loading">Loading users...</div>

    <!-- User List -->
    <div v-else class="user-list">
      <div v-for="user in users" :key="user.id" class="user-card">
        <!-- View Mode -->
        <div v-if="editingId !== user.id">
          <p>
            <strong>{{ user.name }}</strong>
          </p>
          <p>{{ user.email }}</p>
          <div class="actions">
            <button @click="startEdit(user)" class="btn-edit">Edit</button>
            <button @click="deleteUser(user.id)" class="btn-delete">
              Delete
            </button>
          </div>
        </div>

        <!-- Edit Mode -->
        <div v-else>
          <input v-model="editName" placeholder="Name" />
          <input v-model="editEmail" placeholder="Email" />
          <div class="actions">
            <button @click="updateUser(user.id)" class="btn-save">
              Save (PUT)
            </button>
            <button @click="cancelEdit" class="btn-cancel">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Status Messages -->
    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "CrudComponent",
  data() {
    return {
      users: [],
      loading: false,
      message: "",

      // Create
      newName: "",
      newEmail: "",

      // Update
      editingId: null,
      editName: "",
      editEmail: "",
    };
  },
  mounted() {
    this.loadUsers();
  },
  methods: {
    // READ - GET
    loadUsers() {
      this.loading = true;
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
          this.users = data.slice(0, 5); // Only show first 5 for demo
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error loading users:", error);
          this.loading = false;
        });
    },

    // CREATE - POST
    addUser() {
      const newUser = {
        name: this.newName,
        email: this.newEmail,
      };

      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => response.json())
        .then((data) => {
          // Add to local array with new ID
          this.users.push({ ...data, id: Date.now() });
          this.newName = "";
          this.newEmail = "";
          this.showMessage("User added successfully!");
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });
    },

    // UPDATE - PUT
    startEdit(user) {
      this.editingId = user.id;
      this.editName = user.name;
      this.editEmail = user.email;
    },

    updateUser(userId) {
      const updatedUser = {
        name: this.editName,
        email: this.editEmail,
      };

      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      })
        .then((response) => response.json())
        .then((data) => {
          // Update local array
          const index = this.users.findIndex((u) => u.id === userId);
          if (index !== -1) {
            this.users[index] = { ...data, id: userId };
          }
          this.cancelEdit();
          this.showMessage("User updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    },

    cancelEdit() {
      this.editingId = null;
      this.editName = "";
      this.editEmail = "";
    },

    // DELETE - DELETE
    deleteUser(userId) {
      if (!confirm("Are you sure you want to delete this user?")) {
        return;
      }

      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // Remove from local array
            this.users = this.users.filter((u) => u.id !== userId);
            this.showMessage("User deleted successfully!");
          }
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    },

    showMessage(msg) {
      this.message = msg;
      setTimeout(() => {
        this.message = "";
      }, 3000);
    },
  },
};
</script>

<style scoped>
.crud-container {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}

.crud-container h3 {
  margin-top: 0;
}

.create-form {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.create-form h4 {
  margin-top: 0;
}

.create-form form {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.create-form input {
  flex: 1;
  min-width: 200px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.create-form button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.user-card {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #fafafa;
}

.user-card p {
  margin: 5px 0;
}

.user-card input {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.actions button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-edit {
  background-color: #2196f3;
  color: white;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-save {
  background-color: #4caf50;
  color: white;
}

.btn-cancel {
  background-color: #9e9e9e;
  color: white;
}

.message {
  margin-top: 15px;
  padding: 10px;
  background-color: #e8f5e9;
  color: #388e3c;
  border-radius: 4px;
}
</style>
