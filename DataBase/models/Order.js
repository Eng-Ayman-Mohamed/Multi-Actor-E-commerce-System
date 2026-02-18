export default class Order {
  constructor(userId, cartItems, productsDB) {
    this.id = Date.now();
    this.userId = userId;
    this.items = cartItems.map((item) => {
      const product = productsDB.find((p) => p.id === item.productId);

      return {
        productId: item.productId,
        price: product.price,
        quantity: item.quantity,
        total: product.price * item.quantity,
      };
    });
    this.totalPrice = this.items.reduce((sum, item) => sum + item.total, 0);

    this.createdAt = new Date();

    this.status = "Pending";
  }

  updateStatus(stat) {
    // Simple enum validation
    if (!["pending", "shipped", "delivered", "cancelled"].includes(stat)) {
      throw new Error("Invalid status");
    }
    this.status = stat;
  }
}
