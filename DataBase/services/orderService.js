import { storage } from "../utils/storage.js";

export const orderService = {
  create(order) {
    return storage.add("orders", order);
  },

  getByUser(userId) {
    return storage.get("orders").filter((o) => o.userId === userId);
  },

  getAll() {
    return storage.get("orders");
  },

  updateStatus(orderId, status) {
    return storage.update("orders", orderId, {
      status,
    });
  },
};
