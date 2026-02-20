// ===============================
// 🧪 FULL SYSTEM DEMO (Services‑Based)
// ===============================

import Product from "./models/Product.js";
import Cart from "./models/Cart.js";
import Order from "./models/Order.js";

import { storage } from "./utils/storage.js";
import { userService } from "./services/userService.js";
import { productService } from "./services/productService.js";
import { cartService } from "./services/cartService.js";
import { orderService } from "./services/orderService.js";

// ===============================
// Helper → Set Current User
// ===============================
function setCurrentUserByRole(role) {
  const users = userService.getAll();
  console.log("🔍 All Users in Storage:", users); // Check if this is empty or has data

  const user = users.find((u) => u.role === role);

  if (!user) {
    console.error(
      `❌ Role "${role}" not found in:`,
      users.map((u) => u.role),
    );
    return; // Stop execution before the .name crash
  }

  storage.set("currentUser", user);
  console.log(`\n👤 Current User → ${role.toUpperCase()} :`, user.name);
  return user;
}

// ===============================
// 1️⃣ Vendor Flow
// ===============================
function vendorFlow() {
  console.log("\n================ VENDOR FLOW ================");

  const vendor = setCurrentUserByRole("vendor");

  // ➕ Create Product
  const product = new Product({
    vendorId: vendor.id,
    title: "Eco-Friendly Yoga Mat",
    desc: "Non-slip natural rubber 6mm thick.",
    category: "Fitness",
    price: 55.0,
    rating: 4.3,
    stock: 60,
    featured: false,
    approved: true,
    images: [
      "https://images.unsplash.com/photo-1592432676556-28403f92afbf?q=80&w=1000",
    ],
    reviews: [],
  });

  productService.create(product);
  console.log("✅ Product Created:", product.title);

  // ✏️ Update Product
  product.stock = 40;
  product.price = 45;
  product.finalPrice = 45 - (45 * product.discount) / 100;

  storage.update("products", product.id, product);
  console.log("✏️ Product Updated (price + stock)");

  return product;
}

// ===============================
// 2️⃣ Admin Approval + Analytics
// ===============================
function adminFlow(product) {
  console.log("\n================ ADMIN FLOW ================");

  setCurrentUserByRole("admin");

  // ✔️ Approve Product
  productService.approve(product.id);
  console.log("✅ Product Approved");

  // 📊 Analytics Snapshot
  const users = userService.getAll();
  const products = productService.getAll();
  const orders = storage.get("orders");

  const analytics = {
    users: users.length,
    vendors: users.filter((u) => u.role === "vendor").length,
    customers: users.filter((u) => u.role === "customer").length,
    products: products.length,
    approvedProducts: products.filter((p) => p.approved).length,
    orders: orders.length,
    revenue: orders.reduce((sum, o) => sum + o.totalPrice, 0),
  };

  console.log("📊 Admin Analytics:", analytics);
}

// ===============================
// 3️⃣ Customer Cart + Checkout
// ===============================
function customerFlow(product) {
  console.log("\n================ CUSTOMER FLOW ================");

  const customer = setCurrentUserByRole("customer");
  // ✨ NEW WAY: The service handles creation, logic, and saving internally.
  cartService.addItem(customer.id, product.id, 2);
  console.log("🛒 Items Added To Cart (Logic & Save handled by Service)");

  // 💰 Cart Total
  // The service fetches the raw data and calculates totals on the fly
  const totals = cartService.getCartTotal(customer.id);
  console.log("💰 Cart Total Details:", totals);

  // 🧾 Checkout
  // We fetch the latest cart data from the service for the order
  const currentCart = cartService.getCart(customer.id);
  const productsDB = productService.getAll();

  const order = new Order(customer.id, currentCart.items, productsDB);

  orderService.create(order);
  console.log("✅ Order Created:", order.id);

  // 🧹 Clear Cart After Checkout
  cartService.clearCart(customer.id);
  console.log("🧹 Cart Cleared After Checkout");

  return order;
}

// ===============================
// 4️⃣ Order Lifecycle
// ===============================
function orderLifecycle(order) {
  console.log("\n================ ORDER LIFECYCLE ================");

  orderService.updateStatus(order.id, "shipped");
  console.log("📦 Status → Shipped");

  orderService.updateStatus(order.id, "delivered");
  console.log("📦 Status → Delivered");
}

// ===============================
// 🚀 RUN FULL DEMO
// ===============================
export function runFullDemo() {
  console.clear();
  console.log("🚀 RUNNING FULL SYSTEM DEMO...");

  const product = vendorFlow();
  adminFlow(product);
  const order = customerFlow(product);
  orderLifecycle(order);

  console.log("\n🎉 DEMO COMPLETED SUCCESSFULLY");
}

runFullDemo();
