import { getBasePath } from "../assets/utils/basePath.js";
import { navbar, initNavBar } from "../components/user/navbar.js";
import heroSection from "../components/user/heroSection.js";
import shopFeatures from "../components/user/shopFeatures.js";
import { categories, initCategories } from "../components/user/categories.js";
import {
  featuredProducts,
  initFeaturedProducts,
} from "../components/user/featuredProducts.js";
import { CTASection, footer, initFooter } from "../components/user/footer.js";
import { seedReady } from "../DataBase/utils/seed.js";
import { initCard } from "../components/user/card.js";

//test

import { userService } from "../DataBase/services/userService.js";

$(function () {
  const basePath = getBasePath();
  userService.setCurrentUser(userService.getAll()[2]);
  $("#mainWrapper")
    .append(navbar(basePath))
    .append(heroSection(basePath))
    .append(shopFeatures)
    .append(categories)
    .append(featuredProducts)
    .append(CTASection(basePath))
    .append(footer(basePath));
  seedReady.then(() => {
    initCategories();
    initNavBar();
    initFeaturedProducts();
    initFooter(basePath);
    initCard();
  });
});
