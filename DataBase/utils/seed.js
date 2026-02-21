import User from "../models/User.js";
import Product from "../models/Product.js";

import { userService } from "../services/userService.js";
import { productService } from "../services/productService.js";
import { storage } from "../utils/storage.js";

async function initSeed() {
  const existingProducts = productService.getAll() || [];

  if (existingProducts.length > 0) {
    console.log("📦 Data already exists in storage. Skipping seed.");
    return;
  }

  console.log("🌱 Storage is empty. Starting seed process...");

  // Reset storage
  storage.set("users", []);
  storage.set("products", []);
  storage.set("carts", []);
  storage.set("orders", []);

  const admin = new User({
    name: "System Admin",
    email: "admin@shopflow.com",
    password: "admin123password",
    role: "admin",
  });
  userService.create(admin);

  const sysVendor = new User({
    name: "Vendra",
    email: "system@vendra.com",
    password: "system1123password",
    role: "vendor",
  });

  userService.create(sysVendor);

  try {
    const response = await fetch("https://dummyjson.com/products?limit=10");
    const { products: rawProducts } = await response.json();

    rawProducts.forEach((item) => {
      const p = new Product({
        vendorId: sysVendor.id,
        title: item.title,
        desc: item.description,
        category: item.category,
        price: item.price,
        discount: item.discountPercentage,
        rating: item.rating,
        stock: item.stock,
        reviews: item.reviews,
        weight: item.weight,
        images: item.images,
        approved: true,
      });
      productService.create(p); // Save directly to service
    });
  } catch (error) {
    console.error("Seeding failed:", error);
  }
  // --- Create Customers ---
  const customer1 = new User({
    name: "Alex Johnson",
    email: "alex.j@gmail.com",
    password: "customer123password",
    role: "customer",
  });
  const customer2 = new User({
    name: "Sarah Miller",
    email: "s.miller@outlook.com",
    password: "customer123password",
    role: "customer",
  });
  userService.create(customer1);
  userService.create(customer2);
}

export const seedReady = initSeed();
