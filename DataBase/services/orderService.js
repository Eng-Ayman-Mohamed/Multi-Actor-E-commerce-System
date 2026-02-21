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
      // 1. Filter the items in this specific order
      const vendorItems = order.items.filter(
        (item) => item.vendorId === vendorId,
      );

      // 2. Map them to include order info (optional but helpful for the UI)
      return vendorItems.map((item) => {
        return {
          ...item,
          orderId: order.id, // So you know which order it came from
          status: order.status, // So the vendor knows if it's pending
          date: order.createdAt, // So the vendor knows when it was bought
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
