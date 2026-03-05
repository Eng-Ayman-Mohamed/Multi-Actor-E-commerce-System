import { storage } from "../utils/storage.js";
import { productService } from "./productService.js";

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

  getById(orderId) {
    const orders = this.getAll();
    return orders.filter((o) => o.id === orderId)[0];
  },

  updateStock(order) {
    const products = order.items;
    products.forEach((element) => {
      let product = productService.getById(element.productId);
      console.log(product);
      const newStock = product.stock - element.quantity;
      if (newStock < 0) return false;
      productService.updateProductStock(element.productId, newStock);
      console.log(productService.getById(element.productId));
      return true;
    });
  },
};
