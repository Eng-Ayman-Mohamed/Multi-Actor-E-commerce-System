export default class Cart {
  constructor(userId) {
    this.userId = userId;
    this.items = [];
  }

  addItem(productId, qty = 1) {
    const existing = this.items.find((item) => item.productId === productId);

    if (existing) {
      existing.quantity += qty;
    } else {
      this.items.push({
        productId,
        quantity: qty,
      });
    }
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.productId !== productId);
  }

  updateQuantity(productId, qty) {
    const item = this.items.find((item) => item.productId === productId);

    if (!item) return;

    item.quantity = qty;

    if (item.quantity <= 0) {
      this.removeItem(productId);
    }
  }

  clearCart() {
    this.items = [];
  }
}
