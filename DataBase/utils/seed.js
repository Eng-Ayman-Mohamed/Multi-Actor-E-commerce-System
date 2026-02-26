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

  const sysAdmin = new User({
    name: "System Admin",
    email: "admin@vendra.com",
    password: "admin1234",
    role: "admin",
  });
  userService.create(sysAdmin);

  const sysVendor = new User({
    name: "Vendra",
    email: "vendor@vendra.com",
    password: "vendor1234",
    role: "vendor",
  });
  userService.create(sysVendor);

  const sysUser = new User({
    name: "Vendra Customer",
    email: "customer@vendra.com",
    password: "customer1234",
    role: "customer",
  });

  userService.create(sysUser);

  try {
    const response = await fetch("https://dummyjson.com/products?limit=50");
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
      productService.create(p);
    });
  } catch (error) {
    console.error("Seeding failed:", error);
  }
}

export const seedReady = initSeed();
