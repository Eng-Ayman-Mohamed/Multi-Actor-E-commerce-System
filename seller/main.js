import { overview } from "./overview.js";

$(document).ready(function () {
  $("ul li")
    .eq(0)
    .click(function () {
      $("#content").empty();
      $("#content").append(overview);
    });

  $("ul li")
    .eq(1)
    .click(function () {
      $("#content").empty();
      $("#content").append(
        '<div class="alert alert-danger  vh-100"> high there</div>',
      );
    });

  $("ul li")
    .eq(2)
    .click(function () {
      $("#content").empty();
      $("#content").append(
        '<div class="alert alert-primary vh-100"> high there</div>',
      );
    });

  $("ul li")
    .eq(3)
    .click(function () {
      $("#content").empty();
      $("#content").append(
        '<div class="alert alert-warning vh-100"> high there</div>',
      );
    });

  $("ul li")
    .eq(4)
    .click(function () {
      $("#content").empty();
      $("#content").append(
        '<div class="alert alert-info vh-100"> high there</div>',
      );
    });
  $("ul li")
    .eq(5)
    .click(function () {
      $("#content").empty();
      $("#content").append(
        '<div class="alert alert-secondary vh-100"> high there</div>',
      );
    });

  var items = document.querySelectorAll("li");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      // رجّع كل العناصر لشفاف
      items.forEach((el) => {
        el.style.backgroundColor = "transparent";
      });

      // خلّي العنصر اللي اتضغط عليه أزرق
      item.style.backgroundColor = "rgb(21, 155, 199)";
    });
  });
});
