import { storage } from "../utils/storage.js";

export const userService = {
  //helper functions
  emailExists(email) {
    const users = storage.get("users");
    return users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  },

  getCurrentUser() {
    return storage.get("currentUser");
  },

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
