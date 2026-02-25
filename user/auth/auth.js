import { navbar, initNavBar } from "../../components/user/navbar.js";
import { footer, initFooter } from "../../components/user/footer.js";
import { getBasePath } from "../../assets/utils/basePath.js";
import { cartService } from "../../DataBase/services/cartService.js";
import { userService } from "../../DataBase/services/userService.js";
import { orderService } from "../../DataBase/services/orderService.js"; 

import User from "../../DataBase/models/User.js";
// ==================== LOAD NAVBAR & FOOTER ====================
function updateCartCount() {
  const currentUser = userService.getCurrentUser();
  if (!currentUser) return;
  $("#cartCount").text(cartService.getCartCount(currentUser.id));
  $("#cartCountMobile").text(cartService.getCartCount(currentUser.id));
}

$(function () {
  if ($("#container").length) {
    $("#container")
      .prepend(navbar(getBasePath()))
      .append(footer(getBasePath()));
    initNavBar(getBasePath());
    initFooter(getBasePath());
    updateCartCount();
  }
  const currentUser = userService.getCurrentUser();

  if (currentUser && currentUser.role !== "customer") {
    userService.deleteCurrentUser();
    location.reload();
  }
});

// ==================== TOGGLE PASSWORD ====================
window.togglePassword = function (id, btn) {
  const input = document.getElementById(id);
  if (!input) return;
  const icon = btn ? btn.querySelector("i") : null;

  if (input.type === "password") {
    input.type = "text";
    if (icon) icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    input.type = "password";
    if (icon) icon.classList.replace("fa-eye-slash", "fa-eye");
  }
};

// ==================== DOM READY ====================
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector("form[novalidate]");
  if (registerForm)
    registerForm.addEventListener("submit", handleRegisterSubmit);

  const loginForm = document.getElementById("loginForm");
  if (loginForm) loginForm.addEventListener("submit", handleLoginSubmit);

  const resetForm = document.getElementById("resetForm");
  if (resetForm) resetForm.addEventListener("submit", handleResetSubmit);

  // Register role buttons
  document.querySelectorAll(".role-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const group = this.parentElement.querySelectorAll(".btn");
      group.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Login role buttons
  document.querySelectorAll(".login-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const group = this.parentElement.querySelectorAll(".btn");
      group.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });
});

// ==================== REGISTER ====================
async function handleRegisterSubmit(e) {
  e.preventDefault();
  const form = e.target;

  const username = form.querySelector('input[name="username"]');
  const email = form.querySelector('input[name="email"]');
  const phone = form.querySelector('input[name="phone"]');
  const password = form.querySelector('input[name="password"]');
  const confirmPassword = form.querySelector('input[name="confirm_password"]');
  const terms = form.querySelector('input[type="checkbox"]');
  const roleBtn = form.querySelector(".role-btn.active");
  const role = roleBtn ? roleBtn.dataset.role.toLowerCase() : "customer";

  clearErrors(form);

  let isValid = true;

  if (!validateUsername(username.value)) {
    setError(
      username,
      "Username must be at least 3 characters and not numbers only",
    );
    isValid = false;
  } else setSuccess(username);

  if (!validateEmail(email.value)) {
    setError(email, "Enter a valid email address");
    isValid = false;
  } else setSuccess(email);

  if (!validatePhone(phone.value)) {
    setError(phone, "Enter a valid Egyptian phone number");
    isValid = false;
  } else setSuccess(phone);

  if (!validatePassword(password.value)) {
    setError(
      password,
      "Password must be at least 8 characters with letters and numbers",
    );
    isValid = false;
  } else setSuccess(password);

  if (!confirmPassword.value || confirmPassword.value !== password.value) {
    setError(confirmPassword, "Passwords do not match");
    isValid = false;
  } else setSuccess(confirmPassword);

  if (!terms.checked) {
    setError(terms, "You must accept the terms");
    isValid = false;
  } else setSuccess(terms);

  if (!isValid) return;

  if (userService.emailExists(email.value)) {
    setError(email, "Email already registered");
    return;
  }

  let newUser = new User({
    name: username.value.trim(),
    email: email.value.trim(),
    phone: phone.value.trim(),
    password: password.value,
    role,
  });

  userService.create(newUser);
  window.location.href = "./login.html";
}

// ==================== LOGIN ====================
function handleLoginSubmit(e) {
  e.preventDefault();
  const form = e.target;

  const email = form.querySelector('input[name="email"]');
  const password = form.querySelector('input[name="password"]');
  const remember = form.querySelector('input[name="remember"]').checked;
  const roleBtn = form.querySelector(".login-btn.active");
  const role = roleBtn ? roleBtn.dataset.role.toLowerCase() : "customer";

  clearErrors(form);

  let isValid = true;

  if (!validateEmail(email.value)) {
    setError(email, "Enter a valid email address");
    isValid = false;
  } else setSuccess(email);

  if (!password.value) {
    setError(password, "Password is required");
    isValid = false;
  } else setSuccess(password);

  if (!isValid) return;

  const users = userService.getAll();
  // Find user by email and password, ignoring role first
  const userByEmailPass = users.find(
    (u) =>
      u.email.toLowerCase() === email.value.trim().toLowerCase() &&
      atob(u.password).trim() === password.value.trim(),
  );

  if (!userByEmailPass) {
    // No user with this email/password at all
    setError(email, "Invalid Email or Password");
    setError(password, "Invalid Email or Password");
    return;
  }

  // Check if role matches
  if (userByEmailPass.role.toLowerCase() !== role.toLowerCase()) {
    setError(
      email,
      `Role does not match. You registered as "${userByEmailPass.role}"`,
    );
    setError(
      password,
      `Role does not match. You registered as "${userByEmailPass.role}"`,
    );
    return;
  }

  // Role matches, login success
  userService.setCurrentUser(userByEmailPass, remember);

  if (role === "admin") window.location.href = "../../admin/dashboard.html";
  else if (role === "vendor") window.location.href = "../../seller/index.html";
  else window.location.href = "../../index.html";
}

// ==================== RESET PASSWORD ====================
function handleResetSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const email = form.querySelector('input[name="email"]');

  clearErrors(form);

  if (!validateEmail(email.value)) {
    setError(email, "Enter a valid email address");
    return;
  }

  const users = userService.getAll();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.value.trim().toLowerCase(),
  );

  if (!user) {
    setError(email, "Email not found");
    return;
  }

  const tempPassword = generateTempPassword();
  userService.update(user.id, { password: btoa(tempPassword) });
  alert(`Your temporary password: ${tempPassword}`);
  window.location.href = "./login.html";
}

function generateTempPassword() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 8; i++)
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  return password;
}

// ==================== LOGOUT ====================
window.logout = function () {
  userService.deleteCurrentUser();
  window.location.href = `${getBasePath()}auth/login.html`;
};

// ==================== VALIDATION HELPERS ====================
function validateUsername(username) {
  if (!username || username.trim().length < 3) return false;
  if (/^\d+$/.test(username.trim())) return false;
  return true;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^(010|011|012|015)[0-9]{8}$/.test(phone);
}

function validatePassword(password) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}

// ==================== UI HELPERS ====================
function setError(input, message) {
  const parent =
    input.closest(".input-group, .form-check") || input.parentElement;
  let feedback = parent.querySelector(".invalid-feedback");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "invalid-feedback";
    parent.appendChild(feedback);
  }
  feedback.textContent = message;
  feedback.style.display = "block";
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
}

function setSuccess(input) {
  const parent =
    input.closest(".input-group, .form-check") || input.parentElement;
  let feedback = parent.querySelector(".valid-feedback");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "valid-feedback";
    parent.appendChild(feedback);
  }
  feedback.textContent = "";
  feedback.style.display = "block";
  input.classList.add("is-valid");
  input.classList.remove("is-invalid");
}

function clearErrors(form) {
  form
    .querySelectorAll(".is-invalid")
    .forEach((el) => el.classList.remove("is-invalid"));
  form
    .querySelectorAll(".is-valid")
    .forEach((el) => el.classList.remove("is-valid"));
  form.querySelectorAll(".invalid-feedback").forEach((el) => {
    el.textContent = "";
    el.style.display = "none";
  });
  form.querySelectorAll(".valid-feedback").forEach((el) => {
    el.textContent = "";
    el.style.display = "none";
  });
}

// ==================== PROFILE PAGE ====================
document.addEventListener("DOMContentLoaded", () => {
  const profileForm = document.getElementById("profileForm");
  if (!profileForm) return;

  const currentUser = userService.getCurrentUser();

  if (!currentUser) {
    window.location.href = `${getBasePath()}login.html`;
    return;
  }

  // ===== Fill Profile Info =====
  document.getElementById("profileName").textContent = currentUser.name;
  document.getElementById("profileEmail").textContent = currentUser.email;
  document.getElementById("profilePhone").textContent =
    currentUser.phone || "Not Provided";
  document.getElementById("profileRole").textContent = currentUser.role;
  document.getElementById("profileJoinDate").textContent =
    currentUser.createdAt
      ? new Date(currentUser.createdAt).toLocaleDateString()
      : "N/A";

  if (currentUser.image) {
    document.getElementById("profileAvatar").src = currentUser.image;
  }

  // ===== Shopping Summary =====
  const userOrders = orderService.getByUser(currentUser.id) || [];
  const userCart = cartService.getCart(currentUser.id) || [];

  document.getElementById("ordersCount").textContent = userOrders.length;
  document.getElementById("cartCount").textContent = userCart.length;

  if (typeof wishlistService !== "undefined") {
    const wishlist = wishlistService.getByUser(currentUser.id) || [];
    document.getElementById("wishlistCount").textContent = wishlist.length;
  }

  // ===== Fill Modal =====
  profileForm.name.value = currentUser.name;
  profileForm.email.value = currentUser.email;
  profileForm.phone.value = currentUser.phone || "";

  const imageInput = profileForm.image;
  const imagePreview = document.getElementById("imagePreview");

  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  });

  // ===== Update Profile =====
  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedData = {
      name: profileForm.name.value.trim(),
      email: profileForm.email.value.trim(),
      phone: profileForm.phone.value.trim(),
    };

    if (imageInput.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updatedData.image = e.target.result;
        userService.update(currentUser.id, updatedData);
        location.reload();
      };
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      userService.update(currentUser.id, updatedData);

      const updatedUser = userService.getById(currentUser.id);
      userService.setCurrentUser(updatedUser, true);

      location.reload();
    }
  });

  // ===== Logout =====
  document.getElementById("logoutBtn").addEventListener("click", () => {
    userService.deleteCurrentUser();
    window.location.href = `${getBasePath()}login.html`;
  });
});