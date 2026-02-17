import { navbar, initNavBar } from "../../components/user/navbar.js";

$(function () {
    if ($("#container").length) {
        $("#container").prepend(navbar);
        initNavBar();
    }
});

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

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.querySelector("form[novalidate]");
    if (registerForm) {
        registerForm.addEventListener("submit", handleRegisterSubmit);
    }

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLoginSubmit);
    }

    document.querySelectorAll(".role-btn, .login-btn").forEach(button => {
        button.addEventListener("click", function () {
            const group = this.parentElement.querySelectorAll(".btn");
            group.forEach(btn => btn.classList.remove("active"));
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
    const role = form.querySelector(".role-btn.active").textContent.trim();

    clearErrors(form);

    let isValid = true;

    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();

    const usernameError = validateUsername(usernameValue);
    if (usernameError) {
        setError(username, usernameError);
        isValid = false;
    }

    if (!validateEmail(emailValue)) {
        setError(email, "Enter a valid email address");
        isValid = false;
    }

    if (!validatePhone(phoneValue)) {
        setError(phone, "Enter a valid phone number");
        isValid = false;
    }

    if (!validatePassword(password.value)) {
        setError(password, "Password must be at least 8 characters and contain letters and numbers");
        isValid = false;
    }

    if (!confirmPassword.value || confirmPassword.value !== password.value) {
        setError(confirmPassword, "Passwords do not match");
        isValid = false;
    }

    if (!terms.checked) {
        setError(terms, "You must accept the terms");
        isValid = false;
    }

    if (!isValid) return;

    const users = getUsers();

    const emailExists = users.some(user => user.email === emailValue);
    const usernameExists = users.some(user => user.username === usernameValue);

    if (emailExists) {
        setError(email, "Email already registered");
        return;
    }

    if (usernameExists) {
        setError(username, "Username already taken");
        return;
    }

    const newUser = {
        id: Date.now(),
        role,
        username: usernameValue,
        email: emailValue,
        phone: phoneValue,
        password: password.value
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
    const role = form.querySelector(".login-btn.active").dataset.role;

    clearErrors(form);

    let isValid = true;

    if (!validateEmail(email.value.trim())) {
        setError(email, "Enter a valid email address");
        isValid = false;
    }

    if (!password.value) {
        setError(password, "Password is required");
        isValid = false;
    }

    if (!isValid) return;

    const users = getUsers();

    const user = users.find(u =>
        u.email === email.value.trim() &&
        u.password === password.value &&
        u.role === role
    );

    if (!user) {
        setError(email, "Invalid email, password, or role");
        setError(password, "Invalid email, password, or role");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "/";
}

// ==================== UTILITIES ====================

function validateUsername(username) {
    if (username.length < 5) {
        return "Username must be at least 5 characters";
    }

    if (/^\d+$/.test(username)) {
        return "Username cannot be numbers only";
    }

    return null;
}

function setError(input, message) {
    input.classList.add("is-invalid");

    const wrapper = input.closest(".input-group, .form-check") || input.parentElement;

    let feedback = wrapper.querySelector(".invalid-feedback");

    if (!feedback) {
        feedback = document.createElement("div");
        feedback.className = "invalid-feedback";
        wrapper.appendChild(feedback);
    }

    feedback.textContent = message;
}

function clearErrors(form) {
    form.querySelectorAll(".is-invalid").forEach(input => {
        input.classList.remove("is-invalid");
    });

    form.querySelectorAll(".invalid-feedback").forEach(el => el.remove());
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

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

// ==================== RESET PASSWORD ====================

const resetForm = document.querySelector("form[method='post']");
if (resetForm && window.location.pathname.includes("reset.html")) {
    resetForm.addEventListener("submit", handleResetSubmit);
}

function handleResetSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const email = form.querySelector('input[name="email"]');

    clearErrors(form);

    if (!validateEmail(email.value.trim())) {
        setError(email, "Enter a valid email address");
        return;
    }

    const users = getUsers();
    const userExists = users.some(u => u.email === email.value.trim());

    if (!userExists) {
        setError(email, "Email not found in our records");
        return;
    }

    alert(`Password reset instructions sent to ${email.value.trim()}`);
    form.reset();
}
