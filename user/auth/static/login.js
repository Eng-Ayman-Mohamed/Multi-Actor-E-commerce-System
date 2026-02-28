import { userService } from "../../../DataBase/services/userService.js";
import { initLayout, initRoleButtons } from "./shared.js";
import {
    validateEmail,
    setError,
    setSuccess,
    clearErrors
} from "./validation.js";

// ===== Initialize Layout =====
initLayout();

document.addEventListener("DOMContentLoaded", () => {

    initRoleButtons(".login-btn");

    const form = document.getElementById("loginForm");

    if (!form) {
        return;
    }

    form.addEventListener("submit", handleLoginSubmit);

});

// ===== Handle Login =====
function handleLoginSubmit(event) {

    event.preventDefault();

    const form = event.target;

    const emailField = form.email;
    const passwordField = form.password;
    const rememberCheckbox = form.remember;

    let remember = false;
    if (rememberCheckbox && rememberCheckbox.checked) {
        remember = true;
    }

    // ===== Determine Role =====
    let role = "customer";
    const activeRoleButton = form.querySelector(".login-btn.active");
    if (activeRoleButton) {
        role = activeRoleButton.dataset.role.toLowerCase();
    }

    clearErrors(form);

    // ===== Validation =====
    let isValid = true;

    if (!validateEmail(emailField.value)) {
        setError(emailField, "Enter a valid email address");
        isValid = false;
    } else {
        setSuccess(emailField);
    }

    if (!passwordField.value) {
        setError(passwordField, "Password is required");
        isValid = false;
    } else {
        setSuccess(passwordField);
    }

    if (!isValid) {
        return;
    }

    // ===== Check User Credentials =====
    const users = userService.getAll();

    let matchedUser = null;
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (
            user.email.toLowerCase() === emailField.value.trim().toLowerCase() &&
            atob(user.password).trim() === passwordField.value.trim()
        ) {
            matchedUser = user;
            break;
        }
    }

    if (!matchedUser) {
        setError(emailField, "Invalid Email or Password");
        setError(passwordField, "Invalid Email or Password");
        return;
    }

    if (matchedUser.role.toLowerCase() !== role) {
        setError(emailField, `Role does not match. You registered as "${matchedUser.role}"`);
        setError(passwordField, `Role does not match. You registered as "${matchedUser.role}"`);
        return;
    }

    // ===== Set Current User =====
    userService.setCurrentUser(matchedUser, remember);

    // ===== Redirect Based on Role =====
    if (role === "admin") {
        window.location.href = "../../admin/dashboard.html";
    } else if (role === "vendor") {
        window.location.href = "../../seller/index.html";
    } else {
        window.location.href = "../../index.html";
    }

}