// main.js
import User from "./models/User.js";
import Product from "./models/Product.js";
import Cart from "./models/Cart.js";
import Order from "./models/Order.js";

// ===== Step 1: Create Users =====

// Vendor
const vendor1 = new User({
  name: "Vendor A",
  email: "vendorA@mail.com",
  password: "vendor123",
  role: "vendor",
});

// Customer
const customer1 = new User({
  name: "Ayman",
  email: "ayman@mail.com",
  password: "123456",
  role: "customer",
});

console.log("Users Created:");
console.log(vendor1);
console.log(customer1);

// ===== Step 2: Vendor Adds Products =====
const product1 = new Product({
  vendorId: vendor1.id,
  title: "Laptop Dell XPS",
  desc: "High performance laptop",
  category: "Electronics",
  price: 1500,
  discount: 10,
  stock: 5,
  images: ["laptop.png"],
  featured: true,
  approved: true,
});

const product2 = new Product({
  vendorId: vendor1.id,
  title: "Wireless Mouse",
  category: "Electronics",
  price: 50,
  stock: 20,
  approved: true,
});

console.log("\nProducts Created by Vendor:");
console.log(product1);
console.log(product2);

// ===== Step 3: Customer Adds Products to Cart =====
const customerCart = new Cart(customer1.id);

// Add products
customerCart.addItem(product1.id, 1); // 1 laptop
customerCart.addItem(product2.id, 2); // 2 mice

console.log("\nCustomer Cart After Adding Products:");
console.log(customerCart);

// Update quantity
customerCart.updateQuantity(product2.id, 3);
console.log("\nCustomer Cart After Updating Quantity:");
console.log(customerCart);

// ===== Step 4: Checkout → Create Order =====
const productsDB = [product1, product2]; // Simulate database
const order1 = new Order(customer1.id, customerCart.items, productsDB);

console.log("\nOrder Created:");
console.log(order1);

// Clear cart after checkout
customerCart.clearCart();
console.log("\nCart After Checkout:");
console.log(customerCart);

// ===== Step 5: Update Order Status =====
order1.updateStatus("shipped");
console.log("\nOrder After Shipping:");
console.log(order1);

order1.updateStatus("delivered");
console.log("\nOrder After Delivery:");
console.log(order1);

// ===== Step 6: Display Final Prices =====
console.log(`\nOrder Total Price: $${order1.totalPrice.toFixed(2)}`);
console.log(
  `Final Price for Laptop after discount: $${product1.getFinalPrice().toFixed(2)}`,
);
