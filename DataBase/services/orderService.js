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

  getByVendor(vendorId) {
    let products = [];
    const allOrders = this.getAll();
    allOrders.forEach((element) => {
      products.push(element.items.filter((p) => p.vendorId === vendorId));
    });
    return products;
  },

  updateStatus(orderId, status) {
    return storage.update("orders", orderId, {
      status,
    });
  },
};
