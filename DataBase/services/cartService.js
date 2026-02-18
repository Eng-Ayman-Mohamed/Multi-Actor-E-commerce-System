import { storage } from "../utils/storage.js";

export const cartService = {
  getCart(userId) {
    const carts = storage.get("carts");
    return carts.find((c) => c.userId === userId);
  },

  saveCart(cart) {
    const carts = storage.get("carts");
    const index = carts.findIndex((c) => c.userId === cart.userId);

    if (index === -1) {
      carts.push(cart);
    } else {
      carts[index] = cart;
    }
    storage.set("carts", carts);
  },
  removeItem(userId, productId) {
    const cart = this.getCart(userId);
    if (!cart) return;

    cart.removeItem(productId);
    this.saveCart(cart);
  },

  clearCart(userId) {
    const carts = storage.get("carts").filter((c) => c.userId !== userId);

    storage.set("carts", carts);
  },

  getCartTotal(userId) {
    const cart = this.getCart(userId);
    if (!cart) return { items: [], cartTotal: 0 };

    const products = storage.get("products");

    let total = 0;
    const items = cart.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      const price =
        product.price - (product.price * (product.discount || 0)) / 100;
      const itemTotal = price * item.quantity;
      total += itemTotal;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price,
        total: itemTotal,
      };
    });

    return { items, cartTotal: total };
  },
};
