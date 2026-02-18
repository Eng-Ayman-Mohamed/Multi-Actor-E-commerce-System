export default class Order {
  constructor(userId, cartItems, productsDB) {
    this.id = crypto.randomUUID();
    this.userId = userId;
    this.items = cartItems.map((item) => {
      const product = productsDB.find((p) => p.id === item.productId);
      return {
        productId: item.productId,
        price: product.finalPrice,
        quantity: item.quantity,
        total: product.finalPrice * item.quantity,
      };
    });
    this.totalPrice = this.items.reduce((sum, item) => sum + item.total, 0);

    this.createdAt = new Date();

    this.status = "pending";
  }

  updateStatus(stat) {
    // Simple enum validation
    if (!["pending", "shipped", "delivered", "cancelled"].includes(stat)) {
      throw new Error("Invalid status");
    }
    this.status = stat;
  }
}
