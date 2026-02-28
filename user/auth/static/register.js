import { userService } from "../../../DataBase/services/userService.js";
import User from "../../../DataBase/models/User.js";

import {
    initLayout,
    initRoleButtons
} from "./shared.js";

import {
    validateUsername,
    validateEmail,
    validatePhone,
    validatePassword,
    setError,
    setSuccess,
    clearErrors
} from "./validation.js";


// ===== Layout Initialization =====
initLayout();

document.addEventListener("DOMContentLoaded", () => {

    initRoleButtons(".role-btn");

    const form = document.getElementById("registerForm");

    if (!form) {
        return;
    }

    form.addEventListener("submit", handleRegisterSubmit);

});


// ===== Form Submission =====
function handleRegisterSubmit(event) {

    event.preventDefault();

    const form = event.target;

    // ===== Extract Fields =====
    const usernameField = form.username;
    const emailField = form.email;
    const phoneField = form.phone;
    const passwordField = form.password;
    const confirmPasswordField = form.confirm_password;

    const termsCheckbox = form.querySelector('input[type="checkbox"]');

    // ===== Determine Role =====
    let role;
    const activeRoleButton = form.querySelector(".role-btn.active");
    if (activeRoleButton) {
        role = activeRoleButton.dataset.role;
    } else {
        role = "customer";
    }

    clearErrors(form);

    // ===== Validation =====
    let isValid = true;

    // Username
    if (!validateUsername(usernameField.value)) {
        setError(usernameField, "Invalid username");
        isValid = false;
    } else {
        setSuccess(usernameField);
    }

    // Email
    if (!validateEmail(emailField.value)) {
        setError(emailField, "Invalid email");
        isValid = false;
    } else {
        setSuccess(emailField);
    }

    // Phone
    if (!validatePhone(phoneField.value)) {
        setError(phoneField, "Invalid phone number");
        isValid = false;
    } else {
        setSuccess(phoneField);
    }

    // Password
    if (!validatePassword(passwordField.value)) {
        setError(passwordField, "Weak password");
        isValid = false;
    } else {
        setSuccess(passwordField);
    }

    // Confirm Password
    if (confirmPasswordField.value !== passwordField.value) {
        setError(confirmPasswordField, "Passwords do not match");
        isValid = false;
    } else {
        setSuccess(confirmPasswordField);
    }

    // Terms
    if (!termsCheckbox.checked) {
        setError(termsCheckbox, "You must accept the terms");
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // ===== Email Uniqueness Check =====
    if (userService.emailExists(emailField.value)) {
        setError(emailField, "Email already exists");
        return;
    }

    // ===== Create User =====
    const newUser = new User({
        name: usernameField.value,
        email: emailField.value,
        phone: phoneField.value,
        password: passwordField.value,
        role: role,
        address: ""
    });

    userService.create(newUser);

    // ===== Redirect to Login =====
    window.location.href = "./login.html";

}