import User from "../models/User.js";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

import { userService } from "../services/userService.js";
import { productService } from "../services/productService.js";
import { cartService } from "../services/cartService.js";
import { orderService } from "../services/orderService.js";
import { storage } from "../utils/storage.js";

// Reset storage
storage.set("users", []);
storage.set("products", []);
storage.set("carts", []);
storage.set("orders", []);

// 1️⃣ Create Admin
const admin = new User({
  name: "Admin User",
  email: "admin@example.com",
  password: "admin123",
  role: "admin",
});
userService.create(admin);

// 2️⃣ Create Vendors
const vendor1 = new User({
  name: "Vendor One",
  email: "vendor1@example.com",
  password: "vendor123",
  role: "vendor",
});
const vendor2 = new User({
  name: "Vendor Two",
  email: "vendor2@example.com",
  password: "vendor123",
  role: "vendor",
});
userService.create(vendor1);
userService.create(vendor2);

// 3️⃣ Create Products
const products = [
  new Product({
    vendorId: vendor1.id,
    title: "Wireless Headphones",
    desc: "Noise-cancelling over-ear headphones",
    category: "Electronics",
    price: 120,
    discount: 10,
    rating: 4.5,
    stock: 50,
    images: [
      "https://example.com/images/headphones1.jpg",
      "https://example.com/images/headphones2.jpg",
    ],
    featured: true,
    approved: true,
  }),
  new Product({
    vendorId: vendor1.id,
    title: "Smart Watch",
    desc: "Fitness tracker and notifications",
    category: "Electronics",
    price: 80,
    stock: 30,
    images: ["https://example.com/images/smartwatch.jpg"],
    approved: true,
  }),
  new Product({
    vendorId: vendor2.id,
    title: "Yoga Mat",
    desc: "Eco-friendly non-slip yoga mat",
    category: "Fitness",
    price: 25,
    stock: 100,
    images: ["https://example.com/images/yogamat.jpg"],
    approved: true,
  }),
  new Product({
    vendorId: vendor2.id,
    title: "Dumbbell Set",
    desc: "Adjustable dumbbells for home workouts",
    category: "Fitness",
    price: 60,
    stock: 40,
    images: ["https://example.com/images/dumbbells.jpg"],
    approved: true,
  }),
];

products.forEach((p) => productService.create(p));

// 4️⃣ Create Customers
const customer1 = new User({
  name: "John Doe",
  email: "john@example.com",
  password: "customer123",
  role: "customer",
});
const customer2 = new User({
  name: "Jane Smith",
  email: "jane@example.com",
  password: "customer123",
  role: "customer",
});
userService.create(customer1);
userService.create(customer2);

// 5️⃣ Create Carts
const cart1 = new Cart(customer1.id);
cart1.addItem(products[0].id, 2); // 2 Wireless Headphones
cart1.addItem(products[2].id, 1); // 1 Yoga Mat
cartService.saveCart(cart1);

const cart2 = new Cart(customer2.id);
cart2.addItem(products[1].id, 1); // 1 Smart Watch
cart2.addItem(products[3].id, 2); // 2 Dumbbell Set
cartService.saveCart(cart2);

// 6️⃣ Create Orders
const order1 = new Order(customer1.id, cart1.items, productService.getAll());
orderService.create(order1);

const order2 = new Order(customer2.id, cart2.items, productService.getAll());
orderService.create(order2);

console.log("✅ Seed data initialized successfully!");
