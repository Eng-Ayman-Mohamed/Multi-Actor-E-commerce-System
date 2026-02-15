import { navbar, initNavBar } from "./components/user/navbar.js";
import heroSection from "./components/user/heroSection.js";
import shopFeatures from "./components/user/shopFeatures.js";
import { footer, initFooter } from "./components/user/footer.js";

$(function () {
  $("#mainWrapper")
    .append(navbar)
    .append(heroSection)
    .append(shopFeatures)
    .append(footer);
  initNavBar();
  initFooter();
});
