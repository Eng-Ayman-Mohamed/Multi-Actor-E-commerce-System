import { navbar, initNavBar } from "../../components/user/navbar.js";
import { footer, initFooter } from "../../components/user/footer.js";
import { getBasePath } from "../../assets/utils/basePath.js";

// ==================== LOAD NAVBAR & FOOTER ====================

$(function () {
  if ($("#container").length) {
    $("#container")
      .prepend(navbar(getBasePath()))
      .append(footer(getBasePath()));
    initNavBar();
    initFooter(getBasePath());
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
  // Register form
  const registerForm = document.querySelector("form[novalidate]");
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegisterSubmit);
  }

  // Login form
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit);
  }

  // Reset form (only on reset page)
  if (window.location.pathname.includes("reset")) {
    const resetForm = document.querySelector("form");
    if (resetForm) {
      resetForm.addEventListener("submit", handleResetSubmit);
    }
  }

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

function handleRegisterSubmit(e) {
  e.preventDefault();

  const form = e.target;

  const username = form.querySelector('input[name="username"]');
  const email = form.querySelector('input[name="email"]');
  const phone = form.querySelector('input[name="phone"]');
  const password = form.querySelector('input[name="password"]');
  const confirmPassword = form.querySelector('input[name="confirm_password"]');
  const terms = form.querySelector('input[type="checkbox"]');
  const roleBtn = form.querySelector(".role-btn.active");
  const role = roleBtn ? roleBtn.textContent.trim() : "Customer";

  clearErrors(form);

  let isValid = true;

  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phone.value.trim();

  const usernameError = validateUsername(usernameValue);
  if (usernameError) {
    setError(username, usernameError);
    isValid = false;
  } else {
    setSuccess(username);
  }

  if (!validateEmail(emailValue)) {
    setError(email, "Enter a valid email address");
    isValid = false;
  } else {
    setSuccess(email);
  }

  if (!validatePhone(phoneValue)) {
    setError(phone, "Enter a valid Egyptian phone number");
    isValid = false;
  } else {
    setSuccess(phone);
  }

  if (!validatePassword(password.value)) {
    setError(
      password,
      "Password must be at least 8 characters and contain letters and numbers",
    );
    isValid = false;
  } else {
    setSuccess(password);
  }

  if (!confirmPassword.value || confirmPassword.value !== password.value) {
    setError(confirmPassword, "Passwords do not match");
    isValid = false;
  } else {
    setSuccess(confirmPassword);
  }

  if (!terms.checked) {
    setError(terms, "You must accept the terms");
    isValid = false;
  } else {
    setSuccess(terms);
  }

  if (!isValid) return;

  const users = getUsers();

  if (users.some((user) => user.email === emailValue)) {
    setError(email, "Email already registered");
    return;
  }

  if (users.some((user) => user.username === usernameValue)) {
    setError(username, "Username already taken");
    return;
  }

  const newUser = {
    id: Date.now(),
    role,
    username: usernameValue,
    email: emailValue,
    phone: phoneValue,
    password: password.value,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

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
  const role = roleBtn ? roleBtn.dataset.role : "Customer";

  clearErrors(form);

  let isValid = true;

  if (!validateEmail(email.value.trim())) {
    setError(email, "Enter a valid email address");
    isValid = false;
  } else {
    setSuccess(email);
  }

  if (!password.value) {
    setError(password, "Password is required");
    isValid = false;
  } else {
    setSuccess(password);
  }

  if (!isValid) return;

  const users = getUsers();

  const user = users.find(
    (u) =>
      u.email === email.value.trim() &&
      u.password === password.value &&
      u.role === role,
  );

  if (!user) {
    setError(email, "");
    setError(password, "Invalid Password");
    return;
  }

  if (remember) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  }

  if (role === "Admin") {
    window.location.href = "../../admin/dashboard.html";
  } else {
    window.location.href = "../../index.html";
  }
}

// ==================== RESET PASSWORD ====================

function handleResetSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const emailInput = form.querySelector('input[name="email"]');
  const emailValue = emailInput.value.trim();

  clearErrors(form);

  if (!validateEmail(emailValue)) {
    setError(emailInput, "Enter a valid email address");
    return;
  }

  const users = getUsers();
  const userIndex = users.findIndex((u) => u.email === emailValue);

  if (userIndex === -1) {
    setError(emailInput, "Email not found");
    return;
  }

  const newPassword = generateTempPassword();
  users[userIndex].password = newPassword;

  localStorage.setItem("users", JSON.stringify(users));

  alert("Your temporary password is: " + newPassword);

  window.location.href = "./login.html";
}

function generateTempPassword() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// ==================== LOGOUT ====================

window.logout = function () {
  localStorage.removeItem("currentUser");
  sessionStorage.removeItem("currentUser");
  window.location.href = "../auth/login.html";
};

// ==================== VALIDATION ====================

function validateUsername(username) {
  if (username.length < 5) {
    return "Username must be at least 5 characters";
  }
  if (/^\d+$/.test(username)) {
    return "Username cannot be numbers only";
  }
  return null;
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
  input.classList.remove("is-valid");
  input.classList.add("is-invalid");

  const wrapper =
    input.closest(".input-group, .form-check") || input.parentElement;

  let feedback = wrapper.querySelector(".invalid-feedback");

  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "invalid-feedback";
    wrapper.appendChild(feedback);
  }

  feedback.textContent = message;
}

function setSuccess(input, message = "Looks good!") {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");

  const wrapper =
    input.closest(".input-group, .form-check") || input.parentElement;

  let feedback = wrapper.querySelector(".valid-feedback");

  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "valid-feedback";
    wrapper.appendChild(feedback);
  }

  feedback.textContent = message;
}

function clearErrors(form) {
  form.querySelectorAll(".is-invalid, .is-valid").forEach((input) => {
    input.classList.remove("is-invalid", "is-valid");
  });

  form
    .querySelectorAll(".invalid-feedback, .valid-feedback")
    .forEach((el) => el.remove());
}

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}
