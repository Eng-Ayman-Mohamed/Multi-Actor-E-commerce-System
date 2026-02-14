import heroSection from "/components/user/heroSection.js";
import { navbar, initNavBar } from "./components/user/navbar.js";

$(function () {
  console.log(navbar);
  $("#mainWrapper").append(navbar).append(heroSection);
  initNavBar();
});
