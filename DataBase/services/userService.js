import { storage } from "../utils/storage.js";

export const userService = {
  // ==================== HELPER FUNCTIONS ====================

  emailExists(email) {
    const users = storage.get("users");
    return users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  },

  getCurrentUser() {
    // First check localStorage
    const localUser = localStorage.getItem("currentUser");
    if (localUser) return JSON.parse(localUser);

    // Then check sessionStorage
    const sessionUser = sessionStorage.getItem("currentUser");
    if (sessionUser) return JSON.parse(sessionUser);

    return null;
  },

  setCurrentUser(user, remember = false) {
    if (remember) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      sessionStorage.removeItem("currentUser");
    } else {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.removeItem("currentUser");
    }
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