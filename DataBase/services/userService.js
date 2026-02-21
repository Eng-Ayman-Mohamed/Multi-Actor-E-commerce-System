import { storage } from "../utils/storage.js";

export const userService = {
  // ==================== HELPER FUNCTIONS ====================

  emailExists(email) {
    const users = storage.get("users");
    return users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  },

  getCurrentUser() {
    // Try localStorage first
    let user = storage.get("currentUser");
    if (!user || (Array.isArray(user) && user.length === 0)) {
      // Fallback to sessionStorage
      const sessionUser = sessionStorage.getItem("currentUser");
      user = sessionUser ? JSON.parse(sessionUser) : null;
    }
    return user;
  },

  setCurrentUser(user) {
    // Always save to localStorage
    storage.set("currentUser", user);
    // Also save to sessionStorage for non-remembered sessions
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  },

  // ==================== CRUD ====================
  create(user) {
    if (this.emailExists(user.email)) {
      throw new Error("Email already registered");
    }
    return storage.add("users", user);
  },

  getAll() {
    return storage.get("users");
  },

  getById(id) {
    return storage.find("users", id);
  },

  update(id, data) {
    return storage.update("users", id, data);
  },

  delete(id) {
    return storage.delete("users", id);
  },
};