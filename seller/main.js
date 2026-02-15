 
 var items = document.querySelectorAll("li");

items.forEach(item => {
  item.addEventListener("click", () => {

    // رجّع كل العناصر لشفاف
    items.forEach(el => {
      el.style.backgroundColor = "transparent";
    });

    // خلّي العنصر اللي اتضغط عليه أزرق
    item.style.backgroundColor = "rgb(21, 155, 199)";
  });
});
