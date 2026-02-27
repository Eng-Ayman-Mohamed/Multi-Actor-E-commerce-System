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
    const allOrders = this.getAll();

    return allOrders.flatMap((order) => {
      const vendorItems = order.items.filter(
        (item) => item.vendorId === vendorId,
      );
      return vendorItems.map((item) => {
        return {
          ...item,
          orderId: order.id,
          status: order.status,
          date: order.createdAt,
        };
      });
    });
  },

  updateStatus(orderId, status) {
    return storage.update("orders", orderId, {
      status,
    });
  },
};
