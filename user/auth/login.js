
import { navbar, initNavBar } from "../../components/user/navbar.js";

$(function () {
console.log(navbar);
    $("#container").prepend(navbar);
    initNavBar();
});

function togglePassword() {
    const password = document.getElementById("password");
    password.type = password.type === "password" ? "text" : "password";
}

const loginButtons = document.querySelectorAll(".login-btn");
loginButtons.forEach(button => {
    button.addEventListener("click", function () {
        loginButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
    });
});
        