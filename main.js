import { navbar, initNavBar } from "./components/user/navbar.js";
import heroSection from "/components/user/heroSection.js";
import shopFeatures from "./components/user/shopFeatures.js";

$(function () {
  console.log(navbar);
  $("#mainWrapper").append(navbar).append(heroSection).append(shopFeatures);
  initNavBar();
});
