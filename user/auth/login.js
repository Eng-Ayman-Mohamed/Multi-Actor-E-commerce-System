import { getBasePath } from "../../assets/utils/basePath.js";
import { navbar, initNavBar } from "../../components/user/navbar.js";

$(function () {
  $("#container").prepend(navbar(getBasePath()));
  initNavBar();
});

function togglePassword() {
  const password = document.getElementById("password");
  password.type = password.type === "password" ? "text" : "password";
}

const loginButtons = document.querySelectorAll(".login-btn");
loginButtons.forEach((button) => {
  button.addEventListener("click", function () {
    loginButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
  });
});
