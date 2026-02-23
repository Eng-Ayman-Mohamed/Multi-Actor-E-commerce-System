# 🛒 Multi-Actor E-commerce System

A comprehensive, role-based e-commerce platform built with modern front-end technologies, designed to simulate real-world online marketplace operations.
The system supports **Customers, Sellers, and Admins** through dedicated dashboards, secure authentication, and fully responsive interfaces.

> Developed collaboratively by a team of five contributors as part of a structured software engineering project.

---

# 📌 Project Description

The **Multi-Actor E-commerce System** is a full front-end web application that replicates the core workflows of modern online shopping platforms.

It enables:

- Customers to browse and purchase products
- Sellers to manage inventories and orders
- Admins to supervise and control the entire ecosystem

The platform emphasizes **role-based access control**, **interactive UI/UX**, and **modular dashboard design**, making it suitable for portfolio demonstration and academic or training evaluation.

---

# 🎯 Objectives

- Build a scalable multi-role e-commerce architecture
- Implement secure authentication & authorization flows
- Simulate real marketplace operations
- Practice collaborative GitHub development
- Deliver responsive, production-style UI
- Apply JavaScript for dynamic state management
- Manage application data via Local Storage

---

## 🔐 Role-Based Access Strategy

- User role is stored in Local Storage after login.
- Each dashboard validates the stored role on page load.
- Unauthorized access triggers automatic redirection to login.
---

# 🚀 Features Breakdown

## 1️⃣ User Authentication

- Role-based login & registration
- Actor selection (Customer / Seller / Admin)
- Dashboard redirection per role
- Access restriction for protected pages

---

## 2️⃣ Home Page

- Featured products showcase
- Promotions & highlights
- Category previews
- Responsive Bootstrap layout

---

## 3️⃣ Product Catalog

- Grid/list product display
- Product image, name, price
- Add to Cart functionality
- Search & filtering capability

---

## 4️⃣ Product Details Page

- Detailed descriptions
- Product image gallery
- Pricing & options
- Navigation back to catalog

---

## 5️⃣ Shopping Cart

- Add / Remove products
- Quantity adjustments
- Auto price calculation
- Order summary preview

---

## 6️⃣ Checkout Process

- Shipping information form
- Payment details input
- Final order review
- Purchase confirmation flow

---

## 7️⃣ Seller Dashboard

- Add new products
- Edit product listings
- Delete inventory items
- Manage incoming orders
- Sales performance insights

---

## 8️⃣ Admin Panel

- Full platform control
- User management
- Product moderation
- Account removal
- Customer service handling

---

## 9️⃣ Responsive Design

- Mobile-first layout
- Tablet compatibility
- Desktop optimization
- Bootstrap grid & utilities

---

# 👥 System Actors & Roles

| Actor         | Permissions | Key Capabilities        |
| ------------- | ----------- | ----------------------- |
| **Customers** | Limited     | Shop & manage orders    |
| **Sellers**   | Moderate    | Manage products & sales |
| **Admins**    | Full        | Control entire system   |

---

## 🧑‍💻 Customer Functionalities

- Browse products
- Search catalog
- Add to cart
- Complete purchases
- View order history
- Manage profile data

---

## 🏪 Seller Functionalities

- Add products
- Delete products
- Process orders
- Track sales analytics

---

## 🛠️ Admin Functionalities

- Manage all users
- Remove accounts
- Handle support issues

---

# 🧱 Technical Stack

| Technology            | Purpose                 |
| --------------------- | ----------------------- |
| **HTML5**             | Page structure          |
| **CSS3**              | Styling                 |
| **Bootstrap**         | Responsive UI framework |
| **JavaScript (ES6+)** | Logic & interactivity   |
| **JQuery**            | Logic & interactivity   |
| **Local Storage**     | Data persistence        |
|
---
# Project Structure

MULTI-ACTOR-E-COMMERCE-SYSTEM/
│
├── index.html                # Landing page
├── admin/                    # Admin dashboard & management
├── seller/                   # Seller dashboard & product control
├── user/                     # Customer interface
├── components/               # Shared UI components
├── assets/                   # Images, styles, static files
├── DataBase/                 # Database schema & connection files
├── LICENSE
└── readme.md
---
## 📊 Optional Visualization Libraries

Used for analytics dashboards:

- Chart.js
 

 

---
# 🏗️ System Architecture
Application Flow

The system follows a Client-Side Layered Structure:

UI Layer (HTML / Bootstrap)
        ↓
Interaction Layer (JavaScript Event Handling)
        ↓
State Layer (Local Storage)
        ↓
Dynamic Rendering
 
  ---

# ⚙️ Installation & Setup

Follow these steps to run the project locally:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/your-username/multi-actor-ecommerce.git

# 2️⃣ Navigate to project folder
cd multi-actor-ecommerce

# 3️⃣ Open in VS Code (optional)
code .

# 4️⃣ Run using Live Server
Right click → Open with Live Server
```

No backend or package installation required.

---

# 🧠 Engineering Decisions
-Used Local Storage to simulate backend persistence

-Implemented modular JS structure for scalability

-Separated dashboards by role for maintainability

-Used Bootstrap for rapid responsive design

 ---

# 🧭 Usage Guide

### 1️⃣ Register / Login

- Select role أثناء التسجيل
- Login redirects to role dashboard

### 2️⃣ Customers

- Browse catalog
- Add items to cart
- Checkout & confirm orders

### 3️⃣ Sellers

- Access seller dashboard
- Manage inventory
- Track orders

### 4️⃣ Admins

- Access admin panel
- Manage users & listings
- Oversee system activity

---

# 🖥️ Dashboards Overview

## Customer Dashboard

- Profile management
- Order history
- Saved cart items

## Seller Dashboard

- Product CRUD operations
- Order processing
- Revenue insights

## Admin Dashboard

- User management table
- Product moderation tools
- System analytics

---

# 💾 Data Storage Approach

Since this is a front-end project:

- Data stored in **Browser Local Storage**
- Includes:
  - Users
  - Products
  - Orders
  - Cart items

 📘 **Data Model: User**

The User model represents a system account within the e-commerce application.  
It defines the structure, validation rules, and default values for user data stored in Local Storage.

---

## 🧱 Schema Definition

| Field   | Type          | Required           | Description                       |
|---------|---------------|------------------|-----------------------------------|
| id      | string (UUID) | Yes (auto-generated) | Unique identifier                 |
| name    | string        | Yes               | Full name of the user             |
| email   | string        | Yes               | User email address                |
| password| string (Base64)| Yes              | Encoded password                  |
| role    | string (enum) | Yes               | User role (admin, customer, vendor) |
| phone   | string        | No                | Contact number                    |
| address | string        | No                | Street address                    |
| image   | string        | No                | Profile image URL                 |
| city    | string        | No                | City name                         |
| state   | string        | No                | State or region                   |
| zipcode | string        | No                | Postal code                        |
| country | string        | No                | Country name                       |

---

## 🔒 Role Enumeration

Allowed values for `role`:

- admin
- customer
- vendor

---

## 🧾 Data Model Example (JSON Representation)

 {
  "id": "string (UUID)",
  "name": "string",
  "email": "string",
  "password": "string (base64 encoded)",
  "role": "string (admin | customer | seller)",
  "phone": "string",
  "address": "string",
  "image": "string (file path or URL)",
  "city": "string",
  "state": "string",
  "zipcode": "string",
  "country": "string"
}
## ⚙️ Data Rules

id is automatically generated using crypto.randomUUID().

password is encoded using Base64 before storage.

Missing optional fields default to empty strings.

Required fields are validated before object creation.

## 🏗️ Storage Format

Users are stored in Local Storage as an array:

[
  { "userObject1" },
  { "userObject2" },
  { "userObject3" }
]
  ---

 # project  live-Demo

 https://eng-ayman-mohamed.github.io/Multi-Actor-E-commerce-System/
  ---
### Advantages

- No backend required
- Fast prototyping
- Easy testing

### Limitations

- Not production-secure
- Browser-dependent persistence

---

# 🤝 Team Collaboration

- Developed by **5 contributors**
- Managed via GitHub remote repository
- Workflow included:
  - Feature branching
  - Pull requests
  - Code reviews
  - Merge conflict resolution

---

# 🗓️ Project Timeline

| Phase                 | Duration        |
| --------------------- | --------------- |
| Planning & Design     | 13 Feb 2026     |
| Development Sprint    | Feb 14 → Feb 26 |
| Integration & Testing | Feb 27 → Feb 29 |
| Final Delivery        | 1 Mar 2026      |

**Total Duration:**
📅 13 / 2 / 2026 → 1 / 3 / 2026

---

# 🔮 Future Improvements

- Backend integration (Node.js / Django / Laravel)
- Database support (MongoDB / MySQL)
- Payment gateway integration
- JWT authentication
- Email notifications
- Product reviews & ratings
- Wishlist system
- Advanced filtering & AI recommendations
- Deployment to cloud hosting

---

# 👨‍👩‍👧‍👦 Contributors

| Name                        | Role                |
| --------------------------- | ------------------- |
| Ahmed Yhya Younes Ramadan   | Project Coordinator |
| omar wael kamal eldeen ali  | UI/UX Designer      |
| Mostafa Abd Elqawy Ahmed    | Project Coordinator |
| Mohamed Tarek Abdelmonsef   | Dashboard Architect |
| Ayman Mohamed Abotaha Kasim | Project Coordinator |

> Replace placeholders with actual GitHub profiles.

---

# 📜 License

This project is licensed under the **MIT License**.

```text
MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

---

# ⭐ Portfolio Note

This project demonstrates:

- Multi-actor system design
- Role-based authorization
- Dashboard architecture
- State management via Local Storage
- Collaborative Git workflow
- Responsive UI engineering

Suitable for:

- Frontend Developer portfolios
- Training program submissions
- Freelance client showcases
